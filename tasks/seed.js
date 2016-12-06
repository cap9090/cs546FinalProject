const dbConnection = require("../config/mongoConnection");
const data = require("../data/");
const bcrypt = require("bcrypt-nodejs");
const problems = data.problems;
const finProds = data.finProds;
const customers = data.customers;

dbConnection().then((db) => {
  return db.dropDatabase();
}).then(() => {
  return dbConnection;
}).then(() => {
  return problems.addProblem({
    problemId: 999,
    problemDescription: "You are in serious debt"
  })
}).then(() => {
  return problems.addProblem({
    problemId: 888,
    problemDescription: "You've already retired"
  })
}).then(() => {
  return problems.addProblem({
    problemId: 100,
    problemDescription: "You have no income"
  })
}).then(() => {
  return problems.addProblem({
    problemId: 101,
    problemDescription: "Your monthly expense is too high"
  })
}).then(() => {
  return problems.addProblem({
    problemId: 102,
    problemDescription: "You're not saving enough money"
  })
}).then(() => {
  return problems.addProblem({
    problemId: 181,
    problemDescription: "You're too young to retire"
  })
}).then(() => {
  return problems.addProblem({
    problemId: 219,
    problemDescription: "your monthly expenses are too high based off your monthly income and asset value "
  })
}).then(() => {
  return problems.addProblem({
    problemId: 829,
    problemDescription: "You are holding too many static assests (e.g. cash), consider allocating into market stocks and bonds"
  })
}).then(() => {
  return problems.addProblem({
    problemId: 212,
    problemDescription: "Your monthly saving rate is too low"
  });
}).then(() => {
  return problems.addProblem({
    problemId: 432,
    problemDescription: "too low net worth"
  })
}).then(() => {
  return problems.addProblem({
    problemId: 123,
    problemDescription: "you need more assets"
  })
}).then(() => {
  return finProds.addFinProd({
    name: "ETF",
    URL: "www.stevensfinancial.com/ETF",
    problemIds: [
      432,
      123
    ]
  });
}).then(() => {
  return finProds.addFinProd({
    name: "Asset Allocation Tool",
    URL: "www.stevensfinancial.com/assetallocator",
    problemIds: [
      123,
      829,
    ]
  })
}).then(() => {
  return finProds.addFinProd({
    name: "Bankruptcy",
    URL: "www.stevensfinancial.com/Bankruptcy",
    problemIds: [
      999
    ]
  })
}).then(() => {
  return finProds.addFinProd({
    name: "Monthly Budgeting Tool",
    URL: "www.stevensfinancial.com/BudgetTool",
    problemIds: [
      101,
      102,
      219
    ]
  });
}).then(() => {
  return customers.addCustomer({
    username: "admin@stevens.edu",
    password: "abc123",
    //hashedUserNameAndPassword: "129f28evNkfdNIL8Fq7l8xs281eSbNOFgK0M0i882ndkfVn7.298j9hU.O",
    profile: {
      firstName: "John",
      middleInit: "A",
      lastName: "Doe",
      DOB: "1955-11-20",
      //DOB: new Date(55, 11, 20), //November 20th, 1955
      noDependents: 4,
      zipCode: 19121,
      monthlyIncome: 0, //lets assume this guy is retired
      desiredRetirementAge: 67,
      assets: {
        stocks: 25000,
        bonds: 15000,
        cash: 40000,
        retirementAccounts: 30000,
        annuities: 1000,
        property: 250000,
        other: 2000
      },
      savingsRateOfIncome: 15,
      monthlyCosts: {
        car: 0,
        rentOrMortgage: 2000,
        groceries: 500,
        bills: 500,
        otherExpenses: 100
      },
      liability: {
        mortgage: 10000,
        homeEquityLoans: 12000,
        studentLoans: 0,
        creditCardDebt: 1000,
        otherDebt: 1000,
      }
    }
  });
}).then(() => {
  return customers.addCustomer({
    username: "janedoe@stevens.edu",
    password: "123",
    //hashedUserNameAndPassword: "$2a$08$XdvNkfdNIL8Fq7l8xsuIUeSbNOFgK0M0iV5HOskfVn7.PWncShU.O",
    profile: {
      firstName: "Jane",
      middleInit: "P",
      lastName: "Smith",
      DOB: "1990-01-02",
      //DOB: new Date(90, 1, 2), //Jan 2nd, 1990
      noDependents: 0,
      zipCode: 90005,
      monthlyIncome: 4000,
      desiredRetirementAge: 67,
      assets: {
        stocks: 100,
        bonds: 150,
        cash: 5000,
        retirementAccounts: 0,
        annuites: 0,
        property: 0, //she's renting
        other: 2000 //her car
      },
      savingsRateOfIncome: 2,
      monthlyCosts: {
        car: 0, //she owns it
        rentOrMortgage: 1500,
        groceries: 500,
        bills: 500,
        otherExpenses: 1000
      },
      liability: {
        mortgage: 0, //doesn't own house
        homeEquityLoans: 0,
        studentLoans: 50000,
        creditCardDebt: 2000,
        otherDebt: 200
      }
    }
  });
}).catch((error) => {
  console.error(error);
}).then(() => {
  return dbConnection();
}).then((db) => {
  console.log("done seeding");
  db.close();
});
