//do calculation in here and return an collection of finaical products
const customerData = require('../customers');
const finProdData = require('../finProds');
const problemData = require('../problems')

const inflationRate = 2.3;
const salaryGrowthRate = 1.5


let exportedMethods = {
	calculateRetirement: (customerNodeUUID) => {
		customerData.getCustomerByNodeUUID(customerNodeUUID).then( (customer) => {
		let yearsOfRetirement = 92 - customer.profile.desiredRetirementAge;
		let yearsUntilRetirement = customer.profile.desiredRetirementAge - customer.profile.age;
		let fundsNeededForRetirement = .75 * yearsOfRetirement*annuallyCompoundedTotal(12*customer.profile.monthlyIncome, inflationRate + salaryGrowthRate, yearsUntilRetirement);    
		let totalMoneySaveUpToRetirement = (customer.profile.savingsRateOfIncome/100) * totalMoneyEarnedUpToRetirement;
		let totalLiabilities = customer.profile.liability.total;
		let totalSavingAtRetirement = customer.profile.assets.total + totalMoneySaveUpToRetirement;
			return totalSavingAtRetirement - totalLiabilities - fundsNeededForRetirement;
		});
	},

	//total amount of money earned from now until retirement with an inflation rate of 2.3% and a salary rise of 1.5%
	annuallyCompoundedTotal: (amount, interestRate, yearsToRetirement) => {
		return amount*Math.pow((1 + interestRate),yearsToRetirement);
	}
};

module.exports = exportedMethods;
//console.log(exportedMethods.annuallyCompoundedTotal(50000, .0248, 40, 30));