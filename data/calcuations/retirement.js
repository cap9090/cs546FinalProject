//do calculation in here and return an collection of finaical products
const calculations = require('./financialCalculations');
const customerData = require('../customers');
const finProdData = require('../finProds');
const problemData = require('../problems')

/**** all rates adjusted for inflation ****/
const salaryGrowthRate = 3.8
const percentNeedPerYear = 85;  /*percentOfSalaryNeededAnuallyAfterRetirement*/
const liabilityInterestRate = 3;
const averageAnnualCapitalGrowthRate = 6;
const needGrowthRate = 2.3;

///*test case
let customer = {
	profile: {
		desiredRetirementAge: 67,
		monthlyIncome: 4200,
		age: 40,
		savingsRateOfIncome: 15,
		assets: {
			total: 100000
		},
		liabilities: {
			total: 0
		}
	}
};
//*/





let exportedMethods = {
	calculateRetirement: (customerNodeUUID) => {
		//customerData.getCustomerByNodeUUID(customerNodeUUID).then( (customer) => {
		let yearsOfRetirement = 92 - customer.profile.desiredRetirementAge;
		let annualSalary = 12 * customer.profile.monthlyIncome;

		let yearsUntilRetirement = customer.profile.desiredRetirementAge - customer.profile.age;
		let annualSalaryAtRetirement = calculations.annuallyCompoundedTotal(annualSalary, salaryGrowthRate/100, yearsUntilRetirement)

		let totalMoneySavedFromPresentToRetirement = (() => {
			let lumpSum = annualSalary;
			for (let i = 1; i <= yearsUntilRetirement; i++) {
				let addition = calculations.annuallyCompoundedTotal((customer.profile.savingsRateOfIncome/100)*annualSalary, (salaryGrowthRate+averageAnnualCapitalGrowthRate)/100, i);
				lumpSum += addition;
			}
			return lumpSum;
		})();

		let fundsNeededForRetirementFirstYear = percentNeedPerYear/100 * annualSalaryAtRetirement; 
		let totalNeedAfterRetirement = (() => {
			let lumpSum = annualSalary;
			for (let i = 1; i <= yearsOfRetirement; i++) {
				let addition = calculations.annuallyCompoundedTotal(fundsNeededForRetirementFirstYear, needGrowthRate/100, i);
				lumpSum += addition;
			}
			return lumpSum;
		})();

		let total = (() => {
			let lumpSum = annualSalary;
			for (let i = 1; i <= yearsOfRetirement; i++) {
				let addition = calculations.annuallyCompoundedTotal(1300, averageAnnualCapitalGrowthRate/100, i);
				lumpSum += addition;
			}
			return lumpSum;
		})();
		//console.log(total)
		
		
		let totalSavingsAtRetirement = totalMoneySavedFromPresentToRetirement + calculations.annuallyCompoundedTotal(customer.profile.assets.total, averageAnnualCapitalGrowthRate/100, yearsUntilRetirement);
		let totalLiabilitiesAtRetirement = calculations.annuallyCompoundedTotal(customer.profile.liabilities.total, liabilityInterestRate/100, yearsUntilRetirement);
			//console.log(totalMoneySavedFromPresentToRetirement)
			//console.log(totalLiabilitiesAtRetirement)
			//console.log(totalNeedAfterRetirement)
			//console.log(totalSavingsAtRetirement)
			console.log(totalSavingsAtRetirement - totalLiabilitiesAtRetirement - totalNeedAfterRetirement);
		//});
	},


	
};

module.exports = exportedMethods;

exportedMethods.calculateRetirement(1);


