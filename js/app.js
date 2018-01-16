// Listens for the submit button getting hit and runs all of the above.
document.getElementById('credit-payoff-calculator').addEventListener('submit', function(e) {
  e.preventDefault();

  // Gets the values of the three fields needed for this equation, performs
  // pertinent division on the interest rate.
  var amountOwed = document.getElementById('amount-owed').value;
  var interestRate = document.getElementById('interest-rate').value / 100 / 12;
  var monthlyPayment = document.getElementById('monthly-payment').value;

  // Grabs the elements used for displaying the payoff information on the page.
  var payoffContainer = document.getElementById('payoff-container');
  var payoffHeading = document.getElementById('payoff-heading');
  var payoffLead = document.getElementById('payoff-lead');

  // Simple function for rendering out currency values. Change 'en-AU' and 'AUD'
  // to your region’s currency values.
  function currency(number) {
    return number.toLocaleString('en-AU', { style: 'currency', currency: 'AUD' });
  }

  result = calculateTotal(amountOwed, interestRate, monthlyPayment);
  if (result) {
    payoffContainer.classList.remove('d-none');
    payoffHeading.innerHTML = 'You’ll pay ' + currency(result.amountPayed);
    payoffLead.innerHTML = 'and it will take you ' + result.monthCount + ' months to do so!';
  } else {
    payoffContainer.classList.remove('d-none');
    payoffHeading.innerHTML = 'You’ll never pay off your card like this.';
    payoffLead.innerHTML = 'Your Monthly Payment is too low! You can’t pay less than your interest charges!';
  }
}, false);
