const customerData = require('../customers');
const finProdData = require('../finProds');
const problemData = require('../problems')
const retirementCalculations = require('./retirement')


let exportedMethods = {
	getServicesForUser: (id, goal, data) => {
		//data is for extra info that a user must input beyond there profile, take a look at newCar.js for an example
		let problemsArray = [];
		switch(goal) {
		case retirement:
			if (retirementCalculations.calculateRetirement(id) > 0) {
				problemsArray.push(181);
			}
			break;
		case car:
			if (carCalculations.calculateCar(id, data) > 0) {
				problemsArray.push();
			}
			break;
		case house:
			if (houseCalculations.calculateHouse(id, data) > 0) {
				problemsArray.push();
			}
			break;
		}
		return finProd.getProductsFromArrayOfProductIds(problemsArray);
	}
}