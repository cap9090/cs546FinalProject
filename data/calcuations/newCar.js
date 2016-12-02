//do calculation in here and return an collection of finaical products
const calculations = require('./financialCalculations');
const customerData = require('../customers');

///*test case
let data = {
		monthlyPayment: 2000,
		loanTermLength: 36,
		financeRate: 3.3,
		currentCarValue: 0,
		ammountOwedOfCurrentCar: 0,
		downPayment: 500
};
//*/


exportedMethods = {

	calculateCar: (userId, data)=> {
		//customerData.getCustomerByNodeUUID(userID).then( (customer) => {
		let loanTermLengthYears = data.loanTermLength/12;

		let carCost = (() => {
			let lumpSum = data.monthlyPayment;
			for (let i = 1; i < data.loanTermLength; i++) {
				lumpSum += calculations.annuallyCompoundedTotal(data.monthlyPayment, -data.financeRate, i/12);
			}
			return lumpSum;
		})();
		//let adjustedCarCost = carCost - 10*data.monthlyPayment

		let costBeforeCurrentCarDedeuct = carCost + data.downPayment;
		console.log(costBeforeCurrentCarDedeuct);

		//});
	}
}


module.exports = exportedMethods;
exportedMethods.calculateCar(1, data);





