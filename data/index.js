const customerData = require("./customers.js");
const finProdData = require("./finProds.js");
const problemData = require("./problems.js");
const authenticationData = require("./authentication.js");
const calculationData = require("./calculations/finProdSelection.js");

module.exports = {
    customers: customerData,
    finProds: finProdData,
    problems: problemData,
    authentication: authenticationData,
    calculation: calculationData
}
