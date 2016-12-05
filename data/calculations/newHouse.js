//do calculation in here and return an collection of finaical products
const customerData = require('../customers');

///*test case
let data = {
	price: 200000,
	downPayment: 50000,
	months: 360,
	interestRate: 5 //percentage
};
//*/

// with fixed house price
function calculateMonthlyPayment(data) {
	if (data.price == null || data.downPayment == null || data.months == null || data.interestRate == null)
		throw "data not enough";
	if (data.price <= 0 || data.downPayment < 0 || data.months <= 0 || data.interestRate < 0)
		throw "meaningless data";
	if (data.downPayment >= data.price) return 0;

	let price = data.price,
		downPayment = data.downPayment,
		months = data.months,
		interestRate = data.interestRate / 100, // due to percentage
		monthlyInterestRate = interestRate / 12; // annual to monthly

	let monthlyPayment = monthlyInterestRate * (price - downPayment) / (1 - Math.pow(1 + monthlyInterestRate, -months));
	return monthlyPayment;
}

/*
// with fixed monthly payment
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
*/

exportedMethods = {
	calculateNewHouse: (id, data) => {
		customerData.getCustomerByNodeUUID(id).then((customer) => {
			let newHouseMonthlyPayment = calculateMonthlyPayment(data);
			customer.profile.monthlyCosts.rentOrMortgage += newHouseMonthlyPayment;
			customer.profile.monthlyCosts.total += newHouseMonthlyPayment;
			if (tooMuchMonthlyCosts())// not sure about the proper contition here yet
				return true;
			else
				return false;
		});
	}
}


module.exports = exportedMethods;





