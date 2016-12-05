const customerData = require('../customers');
const finProdData = require('../finProds');
const problemData = require('../problems')
const retirementCalculations = require('./retirement')
const newCarCalculations = require('./newCar');
const newHouseCalculations = require('./newHouse');


let exportedMethods = {
	getServicesForUser: (id, goal, data) => {
		//data is for extra info that a user must input beyond there profile, take a look at newCar.js for an example
		let problemsArray = [];
		switch(goal) {
		case retirement:
			if (retirementCalculations.calculateRetirement(id, data)) {
				problemsArray.push(181);
				problemsArray.push(123);
			}
			break;
		case newCar:
			if (newCarCalculations.calculateNewCar(id, data)) {
				problemsArray.push(100);
			}
			break;
		case newHouse:
			if (newHouseCalculations.calculateNewHouse(id, data)) {
				problemsArray.push(100);
			}
			break;
		}
		return finProd.getProductsFromArrayOfProductIds(problemsArray);
	}
}

module.exports = exportedMethods;