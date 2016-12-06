//do calculation in here and return an collection of finaical products
const customerData = require('../customers');

///*test case
let data = {
    expectedYearsAfterRetirement: 25,
    expectedAnnualIncomeIncrease: 2, // percentage
    interestRate: 5, // percentage
    incomeRequiredAfterRetirement: 75 // percentage
};
//*/

exportedMethods = {
    calculateRetirement: (id, data) => {
        if (data.expectedYearsAfterRetirement == null || data.expectedAnnualIncomeIncrease == null
            || data.interestRate == null || data.incomeRequiredAfterRetirement == null)
            throw "data not enough";
        if (data.expectedYearsAfterRetirement <= 0 || data.incomeRequiredAfterRetirement <= 0)
            throw "meaningless data";

        customerData.getCustomerByNodeUUID(id).then((customer) => {
            let interestRate = data.interestRate / 100;
            let inflationRate = 3 / 100;
            let incomeIncreaseRate = data.expectedAnnualIncomeIncrease / 100;

            let realInterestRate = (1 + interestRate) / (1 + inflationRate) - 1;
            let yearsBeforRetirement = customer.profile.desiredRetirementAge - customer.profile.age;
            let incomeIncreaseTotal = Math.pow(1 + incomeIncreaseRate, yearsBeforRetirement);

            let totalSavingsAtRetirement = customer.profile.assets.retirementAccounts +
                customer.profile.monthlyIncome * customer.profile.savingsRateOfIncome /
                (realInterestRate - data.expectedAnnualIncomeIncrease) *
                (Math.pow(1 + realInterestRate, yearsBeforRetirement) - incomeIncreaseTotal);

            let annualExpenseAfterRetirement = data.incomeRequiredAfterRetirement *
                (customer.profile.monthlyIncome * incomeIncreaseTotal) * 12;

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