<template>
  <div>
    <div class="container">
      <div>
        <h1 class="top_heading text-center my-3">
          Now you can apply for the loan in simple steps
        </h1>
        <div>
            <p class="green_text my-5">Steps to apply for Loan</p>
            <ol class="mx-0 mx-md-5 px-5">
            <li>Register Yourself </li>
            <li>Login to the app</li>
            <li>Enter Loan Amount</li>
            <li>You have to pay in installments</li>
            <li>3 Flexible Installments</li>
        </ol>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "~/assets/styles/bootstrapBreakpoint.scss";

ol li{
  font-size: 20px;
  margin: 8px;
}
.top_heading {
  font-size: 20px;
  font-weight: bold;
}

.green_text {
  font-size: 16px;
  font-weight: bold;
}

@include media-breakpoint-up(md) {
  .green_text {
    font-size: 20px;
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
