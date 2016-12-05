//do calculation in here and return an collection of finaical products
const customerData = require('../customers');

///*test case
let data = {
	expectedYearsAfterRetirement: 25,
	expectedAnnualIncomeIncrease: 2, // percentage
	interestRate: 5, // percentage
	inflationRate: 3, // percentage
	incomeRequiredAfterRetirement: 75 // percentage
};
//*/

exportedMethods = {
	calculateRetirement: (id, data) => {
		if (data.expectedYearsAfterRetirement == null || data.expectedAnnualIncomeIncrease == null
			|| data.interestRate == null || data.inflationRate == null || data.incomeRequiredAfterRetirement == null)
			throw "data not enough";
		if (data.expectedYearsAfterRetirement <= 0 || data.incomeRequiredAfterRetirement <= 0)
			throw "meaningless data";

		customerData.getCustomerByNodeUUID(id).then((customer) => {
			let realInterestRate = (1 + data.interestRate) / (1 + data.inflationRate) - 1;
			let yearsBeforRetirement = customer.profile.desiredRetirementAge - customer.profile.age;

			let totalSavingsAtRetirement = customer.profile.monthlyIncome * customer.profile.savingsRateOfIncome / (realInterestRate - data.expectedAnnualIncomeIncrease) *
				(Math.pow(1 + realInterestRate, yearsBeforRetirement) - Math.pow(1 + data.expectedAnnualIncomeIncrease, yearsBeforRetirement));

			let annualExpenseAfterRetirement = incomeRequiredAfterRetirement * customer.profile.monthlyIncome * 12;

			let yearsAfterRetirement = Math.log(1 + realInterestRate / (1 + realInterestRate - realInterestRate *
				(totalSavingsAtRetirement / annualExpenseAfterRetirement))) / Math.log(1 + realInterestRate);

			if (yearsAfterRetirement < data.expectedYearsAfterRetirement)
				return true;
			else
				return false;
		});
	}
}


module.exports = exportedMethods;