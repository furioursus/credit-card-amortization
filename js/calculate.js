// This is where the calculations happen, obvy.
// ========================================================================
// amount = the total loan amount to be paid off
// interestRate = the APR on your card debt, expressed as a % up to 2 decimals
// payment = the monthly payment amount you plan to pay.
function calculateTotal(amount, interestRate, payment) {

  // Sets up our variables that are used exclusively in this function
  // ======================================================================
  var monthsInterest = 0;
  var amountPayed = 0;
  var principal = 0;
  var monthCount = 0;

  while (amount > 0) {

    // Tallies the month’s interest up on every month *except* the first month
    // the debt was acquired.
    if (monthCount != 0) {
      monthsInterest = parseFloat(interestRate * amount);
    }

    // This is the amount of money that is paid on the credit card, less
    // the month’s interest.
    principal = parseFloat(payment - monthsInterest);

    // Sets up the running total for how much the user will have payed per their
    // credit card loan terms.
    amountPayed = parseFloat(amountPayed) + parseFloat(payment);

    // Updates the amount to be paid off, minus the user’s principal.
    amount = (amount - principal);

    // Evaluates if last step of the while statement which will end up with a
    // negative amount of owed money, as the last payment will be something
    // smaller than the set monthly payment and adds that to the amount paid
    // which gives us the actual final number.
    if (amount < 0) {
      amountPayed = amountPayed + parseFloat(amount);
      amount = 0;
    }

    // Returns false if the monthly payments can’t keep up with the interest.
    if (payment < monthsInterest && amount > 0) {
      return false;
    }

    monthCount++;
  }

  // Creates and returns a payload object that we can use to display the total
  // cost the information supplied would end up being, as well as the number of
  // months required to pay it off at that rate.
  var payload = {
    amountPayed: amountPayed,
    monthCount: monthCount
  }

  return payload;

}
