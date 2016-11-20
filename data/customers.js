const collections = require("../config/MongoCollections.js");
const customerCollection = collections.customers;
const uuid = require('node-uuid');

exportedMethods = {

  addCustomer: (customer) => {
    return customerCollection().then((customers) => {
      let newCustomer = {
         _id: uuid.v4(),
         profile: {
           firstName: customer.profile.firstName,
           middleInit: customer.profile.middleInit,
           lastName: customer.profile.lastName,
           DOB: customer.profile.DOB,
           //age
           noDependents: customer.profile.noDependents,
           zipCode: customer.profile.zipCode,
           monthlyIncome: customer.profile.monthlyIncome,
           assets: {
             stocks: customer.profile.assets.stocks,
             bonds: customer.profile.assets.bonds,
             cash: customer.profile.assets.cash,
             retirementAccounts: customer.profile.assets.retirementAccounts,
             annuites: customer.profile.assets.annuites,
             property: customer.profile.assets.property,
             other: customer.profile.assets.property
             //total
           },
           savingsRateOfIncome: customer.profile.savingsRateOfIncome,
           monthlyCosts: {
             car: customer.profile.monthlyCosts.car,
             rentOrMortgage: customer.profile.monthlyCosts.rentOrMortgage,
             groceries: customer.profile.monthlyCosts.groceries,
             bills: customer.profile.monthlyCosts.bills,
             otherExpenses: customer.profile.monthlyCosts.otherExpenses
             //total
           },
           liability: {
             mortgage: customer.profile.liability.mortgage,
             homeEquityLoans: customer.profile.liability.homeEquityLoans,
             studentLoans: customer.profile.liability.studentLoans,
             creditCardDebt: customer.profile.liability.creditCardDebt,
             otherDebt: customer.profile.liability.otherDebt
             //total
           }
           //netWorth
         }

       };

       function getAge(dateString) {
           var today = new Date();
           var birthDate = new Date(dataString);
           var age = today.getFullYear() - birthDate.getFullYear();
           var m = today.getMonth() - birthDate.getMonth();
           if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
               age--;
           }
           return age;
       }
       //newCustomer.profile.age = getAge(newCustomer.profile.DOB);
       newCustomer.profile.assets.total =
            newCustomer.profile.assets.stocks +
            newCustomer.profile.assets.bonds +
            newCustomer.profile.assets.cash +
            newCustomer.profile.assets.retirementAccounts +
            newCustomer.profile.assets.annuites +
            newCustomer.profile.assets.property +
            newCustomer.profile.assets.other  ;
        newCustomer.profile.monthlyCosts.total =
            newCustomer.profile.monthlyCosts.car +
            newCustomer.profile.monthlyCosts.rentOrMortgage +
            newCustomer.profile.monthlyCosts.groceries +
            newCustomer.profile.monthlyCosts.bills +
            newCustomer.profile.monthlyCosts.otherExpenses ;
          newCustomer.profile.liability.total =
            newCustomer.profile.liability.mortgage +
            newCustomer.profile.liability.homeEquityLoans +
            newCustomer.profile.liability.studentLoans +
            newCustomer.profile.liability.creditCardDebt +
            newCustomer.profile.liability.otherDebt ;
          newCustomer.profile.netWorth = newCustomer.profile.assets.total - newCustomer.profile.liability.total;



       return customers.insertOne(newCustomer).then((insertedCustomer) => {
         if(!insertedCustomer) throw "problem not found";
         return insertedCustomer.insertedId;
       });
    });
  },

  getCustomerByNodeUUID: (id) => {
    return customerCollection().then((customers) => {
      return customers.findOne({_id: id}).then((customer) => {
        if(!customer) throw "problem not found";
        return customer;
      })
    })
  },

  getAllCustomers: () => {
    return customerCollection().then((customers) => {
      return customers.find({});
    }, (error) => {
      console.error(error);
    })
  }
}

  module.exports = exportedMethods;
