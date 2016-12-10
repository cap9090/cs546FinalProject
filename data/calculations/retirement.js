//do calculation in here and return an collection of finaical products
const customerData = require('../customers');
const problemData = require('../problems');

///*test case
let data = {
    expectedYearsAfterRetirement: 25,
    expectedAnnualIncomeIncrease: 2, // percentage
    interestRate: 5, // percentage
    incomeRequiredAfterRetirement: 75 // percentage
};
//*/

exportedMethods = {
    calculateProblem: (id, data) => {
        if (data.expectedYearsAfterRetirement == null || data.expectedAnnualIncomeIncrease == null
            || data.interestRate == null || data.incomeRequiredAfterRetirement == null)
            throw "data not enough";
        if (data.interestRate < 0 || data.expectedYearsAfterRetirement <= 0 || data.incomeRequiredAfterRetirement <= 0)
            throw "meaningless data";

        return customerData.getCustomerByNodeUUID(id).then((customer) => {
            let problemsArray = [];

            if (customer.profile.age >= customer.profile.desiredRetirementAge) {
                problemsArray.push(888); // You've already retired
                return problemsArray;
			}

            let interestRate = data.interestRate / 100;
            let inflationRate = 3 / 100;
            let incomeIncreaseRate = data.expectedAnnualIncomeIncrease / 100;

            let realInterestRate = (1 + interestRate) / (1 + inflationRate) - 1;
            let yearsBeforRetirement = customer.profile.desiredRetirementAge - customer.profile.age;

            let overallRate;
            if (realInterestRate === incomeIncreaseRate)
                overallRate = yearsBeforRetirement * Math.pow(1 + realInterestRate, yearsBeforRetirement - 1);
            else
                overallRate = (Math.pow(1 + realInterestRate, yearsBeforRetirement)
                    - Math.pow(1 + incomeIncreaseRate, yearsBeforRetirement)) / (realInterestRate - incomeIncreaseRate);

            let totalSavingsAtRetirement = customer.profile.assets.retirementAccounts
                + customer.profile.monthlyIncome * customer.profile.savingsRateOfIncome * overallRate;

            let annualExpenseAfterRetirement = data.incomeRequiredAfterRetirement
                * (customer.profile.monthlyIncome * Math.pow(1 + incomeIncreaseRate, yearsBeforRetirement)) * 12;

            let yearsAfterRetirement = Math.log(1 + realInterestRate / (1 + realInterestRate
                - realInterestRate * (totalSavingsAtRetirement / annualExpenseAfterRetirement))) / Math.log(1 + realInterestRate);

            if (yearsAfterRetirement < data.expectedYearsAfterRetirement) {
                problemsArray.push(181); // You're too young to 
                problemsArray.push(212); // Your monthly saving rate is too low
            }
            return Promise.resolve(problemsArray);
        });
    }
}


module.exports = exportedMethods;