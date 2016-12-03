//do calculation in here and return an collection of finaical products
const calculations = require('./financialCalculations');
const customerData = require('../customers');

///*test case
let data = {
	carPrice: 20000,
	downPayment: 10000,
	months: 36,
	interestRate: 5
};
//*/

// with fixed car price
function calculateMonthlyPayment(data) {
	if (data.carPrice == null || data.downPayment == null || data.months == null || data.interestRate == null)
		throw "data not enough";
	if (data.carPrice <= 0 || data.downPayment < 0 || data.months <= 0 || data.interestRate < 0)
		throw "meaningless data";
	if (data.downPayment >= data.carPrice) return 0;

	let carPrice = data.carPrice,
		downPayment = data.downPayment,
		months = data.months,
		interestRate = data.interestRate / 100, // due to percentage
		monthlyInterestRate = interestRate / 12; // annual to monthly

	let monthlyPayment = monthlyInterestRate * (carPrice - downPayment) / (1 - Math.pow(1 + monthlyInterestRate, -months));
	return monthlyPayment;
}

// with fixed monthly payment
function calculateCarPrice(data) {
	if (data.monthlyPayment == null || data.downPayment == null || data.months == null || data.interestRate == null)
		throw "data not enough";
	if (data.monthlyPayment <= 0 || data.downPayment < 0 || data.months <= 0 || data.interestRate < 0)
		throw "meaningless data";

	let monthlyPayment = data.monthlyPayment,
		downPayment = data.downPayment,
		months = data.months,
		interestRate = data.interestRate / 100, // due to percentage
		monthlyInterestRate = interestRate / 12; // annual to monthly

	let carPrice = monthlyPayment * (1 - Math.pow(1 + monthlyInterestRate, -months)) / monthlyInterestRate + downPayment;
	return carPrice;
}

exportedMethods = {
	calculateNewCar: (id, data) => {
		customerData.getCustomerByNodeUUID(id).then((customer) => {
			let newCarMonthlyPayment = calculateMonthlyPayment(data);
			customer.profile.monthlyCosts.car += newCarMonthlyPayment;
			customer.profile.monthlyCosts.total += newCarMonthlyPayment;
			if (tooMuchMonthlyCosts()) // not sure about the proper contition here yet
				return true;
			else
				return false;
		})
	}
}


module.exports = exportedMethods;





