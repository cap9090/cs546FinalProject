const collections = require("../config/MongoCollections.js");
const customerCollection = collections.customers;
const uuid = require('node-uuid');

exportedMethods = {

  addCustomer: (customer) => {
    return customerCollection().then((customers) => {
      let newCustomer = {
        //all commented fields in this object are calcuated based off other fields
         _id: uuid.v4(),
         //hashedUserNameAndPassword: customer.hashedUserNameAndPassword,
         profile: {
           firstName: customer.profile.firstName,
           middleInit: customer.profile.middleInit,
           lastName: customer.profile.lastName,
           DOB: customer.profile.DOB,
           //age
           noDependents: customer.profile.noDependents,
           zipCode: customer.profile.zipCode,
           monthlyIncome: customer.profile.monthlyIncome,
           desiredRetirementAge: customer.profile.desiredRetirementAge,
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
           var birthDate = new Date(dateString);
           var age = today.getFullYear() - birthDate.getFullYear();
           var m = today.getMonth() - birthDate.getMonth();
           if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
               age--;
           }
           return age;
       }
       newCustomer.profile.age = getAge(newCustomer.profile.DOB);
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
         if(!insertedCustomer) throw "customer not found";
         return insertedCustomer.insertedId;
       });
    });
  },

  deleteCustomerByNodeUUID: (id) => {
    return customerCollection().then((customers) => {
      return customers.deleteOne({_id: id}).then((deletionInfo) => {
        if(deletionInfo.deletedCount === 0 ) {
          throw ("Could not delete customer with id " + id);
        } else {
          return id;
        }
      });
    });
  },

  getCustomerByNodeUUID: (id) => {
    return customerCollection().then((customers) => {
      return customers.findOne({_id: id}).then((customer) => {
        if(!customer) throw "customer not found";
        return customer;
      })
    })
  },

  getAllCustomers: () => {
    return customerCollection().then((customers) => {
      return customers.find({}).toArray();
    }, (error) => {
      return error;
    })
  },

  updateCustomer: (id, newCustomerData) => {
    let updatedCustomer = {
      _id : id,

    };

    //In order for this to work..we need spearate documents for each subdocument
    //then populate them in the if statemnts and then put them togethero in a final document somehow

    if(newCustomerData.profile.firstName !== undefined && typeof newCustomerData.profile.firstName === 'string'){
      updatedCustomer.profile.firstName = newCustomerData.profile.firstName;
    }
    if(newCustomerData.profile.middleInit !== undefined && typeof newCustomerData.profile.middleInit === 'string'){
      updatedCustomer.profile.middleInit = newCustomerData.profile.middleInit;
    }
    if(newCustomerData.profile.lastName !== undefined && typeof newCustomerData.profile.lastName === 'string'){
      updatedCustomer.profile.lastName = newCustomerData.profile.lastName;
    }
    if(newCustomerData.profile.DOB !== undefined && typeof newCustomerData.profile.DOB === 'object'){
      updatedCustomer.profile.DOB = newCustomerData.profile.DOB;
    }
    if(newCustomerData.profile.noDependents !== undefined && typeof newCustomerData.profile.noDependents === 'number'){
      updatedCustomer.profile.noDependents = newCustomerData.profile.noDependents;
    }
    if(newCustomerData.profile.desiredRetirementAge !== undefined && typeof newCustomerData.profile.desiredRetirementAge ==='number')
      updatedCustomer.profile.desiredRetirementAge =  newCustomerData.profile.desiredRetirementAge;
    if(newCustomerData.profile.assets !== undefined && typeof newCustomerData.profile.assets === 'object'){
      //updatedCustomer.profile.assets = newCustomerData.profile.assets;
      /*
      if(newCustomerData.profile.assets.stocks !== undefined && typeof newCustomerData.profile.assets.stocks === 'number'){
        updatedCustomer.profile.assets.stocks = newCustomerData.profile.assets.stocks;
      }
      if(newCustomerData.profile.assets.bonds !== undefined && typeof newCustomerData.profile.assets.bonds === 'number'){
        updatedCustomer.profile.assets.bonds = newCustomerData.profile.assets.bonds;
      }
      if(newCustomerData.profile.assets.cash !== undefined && typeof newCustomerData.profile.assets.cash === 'number'){
        updatedCustomer.profile.assets.cash = newCustomerData.profile.assets.cash;
      }
      if(newCustomerData.profile.assets.retirementAccounts !== undefined && typeof newCustomerData.profile.assets.retirementAccounts === 'number'){
        updatedCustomer.profile.assets.retirementAccounts = newCustomerData.profile.assets.retirementAccounts;
      }
      if(newCustomerData.profile.assets.annuites !== undefined && typeof newCustomerData.profile.assets.annuites === 'number'){
        updatedCustomer.assets.annuites = newCustomerData.profile.assets.annuites;
      }
      if(newCustomerData.profile.assets.property !== undefined && typeof newCustomerData.profile.assets.property === 'number'){
        updatedCustomer.profile.assets.property = newCustomerData.profile.assets.property;
      }
      if(newCustomerData.profile.assets.other !== undefined && typeof newCustomerData.profile.assets.other === 'number'){
        updatedCustomer.profile.assets.other = newCustomerData.profile.assets.other;
      }
      */
    }


    if(newCustomerData.profile.savingsRateOfIncome !== undefined && typeof newCustomerData.profile.savingsRateOfIncome === 'number'){
      updatedCustomer.profile.savingsRateOfIncome = newCustomerData.profile.savingsRateOfIncome;
    }
    if(newCustomerData.profile.monthlyCosts !== undefined && typeof newCustomerData.profile.monthlyCosts === 'object'){
      //updatedCustomer.profile.monthlyCosts = newCustomerData.profile.monthlyCosts;
      /*
      if(newCustomerData.profile.monthlyCosts.car !== undefined && typeof newCustomerData.profile.monthlyCosts.car === 'number'){
        updatedCustomer.profile.monthlyCosts.car = newCustomerData.profile.monthlyCosts.car;
      }
      if(newCustomerData.profile.monthlyCosts.rentOrMortgage !== undefined && typeof newCustomerData.profile.monthlyCosts.rentOrMortgage === 'number'){
        updatedCustomer.profile.monthlyCosts.rentOrMortgage = newCustomerData.profile.monthlyCosts.rentOrMortgage;
      }
      if(newCustomerData.profile.monthlyCosts.groceries !== undefined && typeof newCustomerData.profile.monthlyCosts.groceries === 'number'){
        updatedCustomer.profile.monthlyCosts.groceries = newCustomerData.profile.monthlyCosts.groceries;
      }
      if(newCustomerData.profile.monthlyCosts.bills !== undefined && typeof newCustomerData.profile.monthlyCosts.bills === 'number'){
        updatedCustomer.profile.monthlyCosts.bills = newCustomerData.profile.monthlyCosts.bills;
      }
      if(newCustomerData.profile.monthlyCosts.otherExpenses !== undefined && typeof newCustomerData.profile.monthlyCosts.otherExpenses === 'number'){
        updatedCustomer.profile.monthlyCosts.otherExpenses = newCustomerData.profile.monthlyCosts.otherExpenses;
      }
      */
    }
    if(newCustomerData.profile.liability !== undefined && typeof newCustomerData.profile.liability === 'object'){
      // updatedCustomer.profile.liability = newCustomerData.profile.liability;
      /*
      if(newCustomerData.profile.liability.mortgage !== undefined && typeof newCustomerData.profile.liability.mortgage === 'number'){
        updatedCustomer.profile.liability.mortgage = newCustomerData.profile.liability.mortgage;
      }
      if(newCustomerData.profile.liability.homeEquityLoans !== undefined && typeof newCustomerData.profile.liability.homeEquityLoans === 'number'){
        updatedCustomer.profile.liability.homeEquityLoans = newCustomerData.profile.liability.homeEquityLoans;
      }
      if(newCustomerData.profile.liability.studentLoans !== undefined && typeof newCustomerData.profile.liability.studentLoans === 'number'){
        updatedCustomer.profile.liability.studentLoans = newCustomerData.profile.liability.studentLoans;
      }
      if(newCustomerData.profile.liability.creditCardDebt !== undefined && typeof newCustomerData.profile.liability.creditCardDebt === 'number'){
        updatedCustomer.profile.liability.creditCardDebt = newCustomerData.profile.liability.creditCardDebt;
      }
      if(newCustomerData.profile.liability.otherDebt !== undefined && typeof newCustomerData.profile.liability.otherDebt === 'number'){
        updatedCustomer.profile.liability.otherDebt = newCustomerData.profile.liability.otherDebt;
      }
      */
    }

    //
    // function getAge(dateString) {
    //     var today = new Date();
    //     var birthDate = new Date(dateString);
    //     var age = today.getFullYear() - birthDate.getFullYear();
    //     var m = today.getMonth() - birthDate.getMonth();
    //     if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    //         age--;
    //     }
    //     return age;
    // }
    // newCustomerData.profile.age = getAge(newCustomerData.profile.DOB);
    // newCustomerData.profile.assets.total =
    //      newCustomerData.profile.assets.stocks +
    //      newCustomerData.profile.assets.bonds +
    //      newCustomerData.profile.assets.cash +
    //      newCustomerData.profile.assets.retirementAccounts +
    //      newCustomerData.profile.assets.annuites +
    //      newCustomerData.profile.assets.property +
    //      newCustomerData.profile.assets.other  ;
    //  newCustomerData.profile.monthlyCosts.total =
    //      newCustomerData.profile.monthlyCosts.car +
    //      newCustomerData.profile.monthlyCosts.rentOrMortgage +
    //      newCustomerData.profile.monthlyCosts.groceries +
    //      newCustomerData.profile.monthlyCosts.bills +
    //      newCustomerData.profile.monthlyCosts.otherExpenses ;
    //    newCustomerData.profile.liability.total =
    //      newCustomerData.profile.liability.mortgage +
    //      newCustomerData.profile.liability.homeEquityLoans +
    //      newCustomerData.profile.liability.studentLoans +
    //      newCustomerData.profile.liability.creditCardDebt +
    //      newCustomerData.profile.liability.otherDebt ;
    //    newCustomerData.profile.netWorth = newCustomerData.profile.assets.total - newCustomerData.profile.liability.total;
    //



    return customerCollection().then((customers) => {
        return customers.updateOne({_id: id}, {$set : updatedCustomer}).then(() => {
          return updateCustomer._id;
        });
    });
  },

  getCustomerByHashedUserNameAndPassword: (hashedUserNameAndPassword_input) => {
    return customerCollection().then((customers) => {
      return customers.findOne({hashedUserNameAndPassword: hashedUserNameAndPassword_input}).then((customer) => {
        if(!customer) throw "customer not found";
        return customer;
      })
    })
  }
}



  module.exports = exportedMethods;
