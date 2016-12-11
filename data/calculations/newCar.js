//do calculation in here and return an collection of finaical products
const customerData = require('../customers');
const problemData = require('../problems');

///*test case
let data = {
	price: 20000,
	downPayment: 10000,
	months: 36,
	interestRate: 5 // percentage
};
//*/

// with fixed car price
function calculateMonthlyPayment(data) {
	if (data.price == null || data.downPayment == null || data.months == null || data.interestRate == null)
		throw "data not enough";
	if (data.price <= 0 || data.downPayment < 0 || data.months <= 0 || data.interestRate < 0)
		throw "meaningless data";

	if (data.downPayment >= data.price)
		return 0;
	if (data.interestRate === 0)
		return (data.price - data.downPayment) / data.months;

	let price = data.price,
		downPayment = data.downPayment,
		months = data.months,
		interestRate = data.interestRate / 100, // due to percentage
		monthlyInterestRate = interestRate / 12; // annual to monthly

	let monthlyPayment = monthlyInterestRate * (price - downPayment)
		/ (1 - Math.pow(1 + monthlyInterestRate, -months));
	return monthlyPayment;
};

/* with fixed monthly payment
function calculateprice(data) {
	if (data.monthlyPayment == null || data.downPayment == null || data.months == null || data.interestRate == null)
		throw "data not enough";
	if (data.monthlyPayment <= 0 || data.downPayment < 0 || data.months <= 0 || data.interestRate < 0)
		throw "meaningless data";

	let monthlyPayment = data.monthlyPayment,
		downPayment = data.downPayment,
		months = data.months,
		interestRate = data.interestRate / 100, // due to percentage
		monthlyInterestRate = interestRate / 12; // annual to monthly

	let price = monthlyPayment * (1 - Math.pow(1 + monthlyInterestRate, -months)) / monthlyInterestRate + downPayment;
	return price;
}
//*/

exportedMethods = {
	calculateProblem: (id, data) => {
		let problemsArray = [];

		return customerData.getCustomerByNodeUUID(id).then((customer) => {
			let newCarMonthlyPayment = calculateMonthlyPayment(data);
			let monthlyIncome = customer.profile.monthlyIncome;
			let newMonthlyCosts = customer.profile.monthlyCosts.total + newCarMonthlyPayment;

			let newSavingsRateOfIncome = (monthlyIncome - newMonthlyCosts) / monthlyIncome;

			if (newSavingsRateOfIncome < 0)
				problemsArray.push(101); // Your monthly expense is too high
			else if (newSavingsRateOfIncome < customer.profile.savingsRateOfIncome)
				problemsArray.push(102); // You're not saving enough money
			return problemsArray;
		}).catch(error => console.log(error));
		
	}
}
module.exports = exportedMethods;





