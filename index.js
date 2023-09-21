const express = require('express');
const app = express();
const cors = require('cors');
const JWT = require('jsonwebtoken');
const bodyParser = require('body-parser');

const dotenv = require('dotenv');
dotenv.config();
const PORT = process.env.PORT || 3100;

require('./db/config');

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

const { Loan, Repayment } = require('./models/LoanRequest');
const UserModel = require('./models/UserModel');
const hashPassword = require('./helper/authHelper');
const { compare } = require('bcrypt');

app.post('/api/register', async (req, res) => {
  let { name, email, password, cpassword } = req.body;
  if (!name || !email || !password || !cpassword) {
    return res.status(500).send({
      success: false,
      message: 'Please enter all details',
    });
  }

  try {
    let existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(200).send({
        success: false,
        message: 'Email already registered',
      });
    }
    let hashedPassword = await hashPassword(password);

    let user = await new UserModel({
      name,
      email,
      password: hashedPassword,
      cpassword: hashedPassword,
    });

    await user.save();
    res.status(200).send({
      success: true,
      message: 'User Registered Successfully',
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Error while registration',
    });
  }
});

app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: 'User not registered or Invalid',
      });
    }
    if (!password || !email) {
      return res.status(404).send({
        success: false,
        message: 'Please Enter email and password',
      });
    }

    const matchPassword = await compare(password, user.password);
    if (!matchPassword) {
      return res.status(404).send({
        success: false,
        message: 'Invalid email or password',
      });
    }

    const token = JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    res.status(200).send({
      success: true,
      message: 'Login successful',
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        mobile: user.mobile,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: 'Invalid Credentials',
      error,
    });
  }
});

// LOAN REQUEST
app.post('/api/loan', async (req, res) => {
  try {
    let { amount, term, user } = req.body;
    // console.log(user, term, amount);
    if (amount < 5000 || amount > 100000) {
      return res.status(400).send({
        message: 'Amount must be between 5000 and 1 Lakh',
        success: false,
      });
    }
    if (!term) {
      return res.status(400).send({
        message: 'No. of Installments',
        success: false,
      });
    }

    const loanDetails = await new Loan({
      amount,
      user,
      term,
    });
    await loanDetails.save();
    res.status(200).send({
      success: true,
      message: `Your request for ${amount} & for ${term} terms`,
      loanDetails,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: 'Something went wrong',
      error,
    });
  }
});

app.post('/api/loan/payments', async (req, res) => {
  try {
    let userId = req.body.id;
    // console.log(userId);
    const loan = await Loan.find({ user: userId });
    if (loan) {
      return res.status(200).send({
        success: true,
        message: 'Details fetched successfully',
        loan,
      });
    } else {
      return res.status(404).send({
        success: false,
        message: 'No Loans found',
        loan,
      });
    }
  } catch (error) {
    res.status(400).send({
      success: false,
      message: 'Something went wrong',
      error,
    });
  }
});

// REPAY UPDATE

app.post('/api/loan/repayments', async (req, res) => {
  try {
    const installmentId = req.body.id;
    // console.log('InstaID', installmentId);

    // Find the specific loan by its ID where scheduledRepayments contain the installment
    const loan = await Loan.findOne({
      'scheduledRepayments._id': installmentId,
    });

    if (!loan) {
      return res.status(404).send({
        success: false,
        message: 'Loan not found',
      });
    }

    // Find the specific repayment within the scheduledRepayments array
    const repayment = loan.scheduledRepayments.find(
      (repayment) => repayment._id.toString() === installmentId
    );

    if (!repayment) {
      return res.status(404).send({
        success: false,
        message: 'Repayment not found',
      });
    }

    // Check if the repayment is already paid
    if (repayment.state === 'PAID') {
      return res.status(400).send({
        success: false,
        message: 'Repayment is already marked as PAID',
      });
    }
    repayment.state = 'PAID';
    await loan.save();

    return res.status(200).send({
      success: true,
      message: 'Repayment state updated successfully',
      repayment,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: 'Something went wrong',
      error,
    });
  }
});

// ADMIN APPROVE
app.post('/api/loan/admin', async (req, res) => {
  try {
    const loanId = req.body.id;
    // console.log('loanId', loanId);

    const loan = await Loan.findOne({ _id: loanId});
    // console.log(loan)

    if (!loan) {
      return res.status(404).send({
        success: false,
        message: 'Loan not found',
      });
    }

    // Check if the admin is already approved
    if (loan.adminState === 'APPROVED') {
      return res.status(400).send({
        success: false,
        message: 'Admin is already marked as Approved',
      });
    }
    loan.adminState = 'APPROVED';
    await loan.save();

    return res.status(200).send({
      success: true,
      message: 'Loan status updated successfully',
      loan,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: 'Something went wrong',
      error,
    });
  }
});

// ALL LOAN FOR ADMIN PANEL

app.get('/api/loan/admin', async (req, res) => {
  try {
    const loan = await Loan.find();
    if (!loan) {
      return res.status(404).send({
        success: false,
        message: 'No loan found',
      })
    }
    return res.status(200).send({
      success: true,
      message: 'Successfully Feteched',
      loan
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: 'Something went wrong',
      error,
    });
  }
})


app.listen(PORT, () => {
  console.log(`listening at port:${PORT}`);
});
