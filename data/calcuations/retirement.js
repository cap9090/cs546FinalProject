//do calculation in here and return an collection of finaical products
const calculations = require('./financialCalculations');
const customerData = require('../customers');
const finProdData = require('../finProds');
const problemData = require('../problems')

/**** all rates adjusted for inflation ****/
const salaryGrowthRate = 3
const percentNeedPerYear = 85;  /*percentOfSalaryNeededAnuallyAfterRetirement*/
const liabilityInterestRate = 3;
const averageAnnualCapitalGrowthRatePreRetire = 5;
const averageAnnualCapitalGrowthRatePostRetire = 2;
const needGrowthRate = 2.3;

///*test case
let customer = {
	profile: {
		desiredRetirementAge: 67,
		monthlyIncome: 4166,
		age: 40,
		savingsRateOfIncome: 15,
		assets: {
			total: 200000
		},
		liabilities: {
			total: 100000
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
		let annualSalaryAtRetirement = calculations.annuallyCompoundedTotal(annualSalary, salaryGrowthRate, yearsUntilRetirement)

		let totalMoneySavedFromPresentToRetirement = (() => {
			let lumpSum = (customer.profile.savingsRateOfIncome/100)*annualSalary;
			let adjustedSalary = annualSalary;
			for (let i = 1; i <= yearsUntilRetirement; i++) {
				 adjustedSalary = calculations.annuallyCompoundedTotal(adjustedSalary, salaryGrowthRate, 1)
				let addition = calculations.annuallyCompoundedTotal((customer.profile.savingsRateOfIncome/100)*adjustedSalary, (averageAnnualCapitalGrowthRatePreRetire), i);
				lumpSum += addition;
			}
			return lumpSum;
		})();

		let fundsNeededForRetirementFirstYear = percentNeedPerYear/100 * annualSalaryAtRetirement; 
		let totalNeedAfterRetirement = (() => {
			let lumpSum = fundsNeededForRetirementFirstYear;
			for (let i = 1; i <= yearsOfRetirement; i++) {
				let addition = calculations.annuallyCompoundedTotal(fundsNeededForRetirementFirstYear, needGrowthRate, i);
				lumpSum += addition;
			}
			return lumpSum;
		})();

		let totalSocialSecurity = (() => {
			let lumpSum = annualSalary;
			for (let i = 1; i <= yearsOfRetirement; i++) {
				let addition = calculations.annuallyCompoundedTotal(1300, averageAnnualCapitalGrowthRatePreRetire, i);
				lumpSum += addition;
			}
			return lumpSum;
		})();
		
		
		let savingsUpToRetirement = calculations.annuallyCompoundedTotal(customer.profile.assets.total, averageAnnualCapitalGrowthRatePreRetire, yearsUntilRetirement)
		let savingsThroughRetirement = calculations.annuallyCompoundedTotal(savingsUpToRetirement, averageAnnualCapitalGrowthRatePostRetire, yearsOfRetirement)
		let totalSavingsAtRetirement = totalMoneySavedFromPresentToRetirement + savingsUpToRetirement + savingsThroughRetirement;
		let totalLiabilitiesAtRetirement = calculations.annuallyCompoundedTotal(customer.profile.liabilities.total, liabilityInterestRate, yearsUntilRetirement);
			console.log(totalSavingsAtRetirement)
			console.log(totalNeedAfterRetirement)
			console.log(totalSavingsAtRetirement + totalSocialSecurity - totalLiabilitiesAtRetirement - totalNeedAfterRetirement);
		//});
	},


	
};

module.exports = exportedMethods;

exportedMethods.calculateRetirement(1);


