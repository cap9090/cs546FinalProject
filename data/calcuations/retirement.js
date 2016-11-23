//do calculation in here and return an collection of finaical products
const customerData = require('./customers');
const finProdData = require('./finProds');
const problemData = require('./problems')

module.exports = {
calculateRetirement: (customerNodeUUID) => {
	customerData.getCustomerByNodeUUID(customerNodeUUID).then( (customer) => {
		customer.profile.age 
		customer.profile.desiredRetirementAge
		newCustomer.profile.assets.total
		customer.profile.savingsRateOfIncome
		customer.profile.monthlyIncome
		annuallyCompoundedIncome()






	}
}



annuallyCompoundedIncome: (monthlyIncome, inflationRate, SalaryGrowthRate, yearsCompounded) => {
	let interestRate = inflationRate + SalaryGrowthRate;
	return monthlyIncome * Math.pow((1 + interestRate/1), yearsCompounded);
}



}