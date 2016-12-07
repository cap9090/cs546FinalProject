const customerData = require('../customers');
const problemData = require('../problems');

exportedMethods = {
    calculateProblem: (id, data) => {
        let problemsArray = [];

        return customerData.getCustomerByNodeUUID(id).then((customer) => {
            if (customer.profile.monthlyIncome <= 0)
                problemsArray.push(100); // You have no income
            else {
                let savingsRateOfIncome = (customer.profile.monthlyIncome - customer.profile.monthlyCosts) / monthlyIncome;
                if (savingsRateOfIncome < 0)
                    problemsArray.push(101); // Your monthly expense is too high
                else if (savingsRateOfIncome < customer.profile.savingsRateOfIncome)
                    problemsArray.push(102); // You're not saving enough money
            }

            if (customer.profile.netWorth < 0) {
                problemsArray.push(432);
                problemsArray.push(123);
            }

            return problemsArray;
        });
    }
}

module.exports = exportedMethods;