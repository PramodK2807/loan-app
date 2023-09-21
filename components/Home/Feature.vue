<template>
  <div class="background py-5 arial">
    <div class="container">
      <div class="feature my-2">
        <p class="text-center top_heading py-5">
          Top Features and Benefits of Personal Loan
        </p>
        <div class="row gx-5">
          <!-- CARDS -->
          <div class="col-md-6 my-2 my-md-5 px-5">
            <div class="row align-items-center justify-content-between">
              <div class="col-3">
                <img
                  class="w-100"
                  src="~/assets/images/money.png"
                  alt="money"
                />
              </div>
              <div class="col-9">
                <p class="green_text mb-4">Flexible Loan Amount</p>
                <p class="description grey_text">
                  Everyone’s requirements will vary therefore applicants can
                  borrow any amount between Rs, 5,000 to Rs. 5 lakhs based on
                  their eligibility.
                </p>
              </div>
            </div>
          </div>

          <!-- CARDS -->

          <div class="col-md-6 my-2 my-md-5 px-5">
            <div class="row align-items-center justify-content-between">
              <div class="col-3">
                <img class="w-100" src="~/assets/images/re.png" alt="money" />
              </div>
              <div class="col-9">
                <p class="green_text mb-4">Pay On multiple installments</p>
                <p class="description grey_text">
                  Pay loan on multiple installments in every week,
                  a fixed and simple installments you can pay. <br />
                  Customer Ease, Customer Satisfaction
                </p>
              </div>
            </div>
          </div>

          <!-- CARDS -->

          <div class="col-md-6 my-2 my-md-5 px-5">
            <div class="row align-items-center justify-content-between">
              <div class="col-3">
                <img class="w-100" src="~/assets/images/docs.png" alt="money" />
              </div>
              <div class="col-9">
                <p class="green_text mb-4">Need a Single Document</p>
                <p class="grey_text">
                  Our process are so simple & short, no need to be panic to
                  submit multiple documents
                </p>
              </div>
            </div>
          </div>

          <!-- CARDS -->

          <div class="col-md-6 my-2 my-md-5 pb-2 pb-md-0 px-5">
            <div class="row align-items-center justify-content-between">
              <div class="col-3">
                <img
                  class="w-100"
                  src="~/assets/images/intrest.png"
                  alt="money"
                />
              </div>
              <div class="col-9">
                <p class="green_text mb-4">Affordable Interest Rates</p>
                <p class="description grey_text">
                  We understand how important interest rates are as they
                  determine the EMI amount to be paid. At Money View, @ 0%
                  intrest rate.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "~/assets/styles/bootstrapBreakpoint.scss";
.background {
  background: #f2f6fc;
  position: relative;
}

.top_heading {
  font-size: 20px;
  font-weight: bold;
}
.feature {
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  background: white;
  position: relative;
  top: 20%;
}

.green_text {
  font-size: 16px;
  font-weight: bold;
}

.grey_text {
  font-size: 12px;
}

@include media-breakpoint-up(md) {
  .green_text {
    font-size: 20px;
  }
  .grey_text {
    font-size: 16px;
  }
  .top_heading {
    font-size: 25px;
  }
}
@include media-breakpoint-up(lg) {
  .top_heading {
    font-size: 31px;
  }
}
</style>
