const mongoose = require('mongoose');

const repaymentSchema = new mongoose.Schema(
  {
    date: { type: Date, required: true },
    amount: { type: Number, required: true },
    state: { type: String, enum: ['PENDING', 'PAID'], default: 'PENDING' },
  },
  { timestamps: true }
);

const loanSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
    amount: { type: Number, required: true },
    term: { type: Number, required: true },
    scheduledRepayments: [repaymentSchema],
    state: { type: String, enum: ['PENDING', 'PAID'], default: 'PENDING' },
    adminState: { type: String, enum: ['PENDING', 'APPROVED', "REJECTED"], default: 'PENDING' },
  },
  { timestamps: true }
);

loanSchema.pre('save', function (next) {
  if (!this.isNew) {
    return next();
  }

  const currentDate = new Date();
  const loanCreationDate = this.createdAt || currentDate;
  const installmentAmount = this.amount / this.term;

  for (let i = 1; i <= this.term; i++) {
    const nextInstallmentDate = new Date(loanCreationDate);
    nextInstallmentDate.setDate(loanCreationDate.getDate() + 7 * i);

    this.scheduledRepayments.push({
      date: nextInstallmentDate,
      amount: installmentAmount.toFixed(2),
    });
  }

  next();
});

const Loan = mongoose.model('Loan', loanSchema);
const Repayment = mongoose.model('Repayment', repaymentSchema);

module.exports = { Loan, Repayment };
