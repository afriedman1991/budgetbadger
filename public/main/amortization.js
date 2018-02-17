
const getAmortization = function(principal, payment, interest, term){
    var monthlyInt = interest/12;
    var singleMonthInt = principal * monthlyInt;
    var singleMonthPrinciplePayment = payment - singleMonthInt;

}

module.exports = getAmortization;