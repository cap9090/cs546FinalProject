const customerData = require('../customers');
const problemData = require('../problems');
const finProdData = require('../finProds');
const currentCalculations = require('./current');
const retirementCalculations = require('./retirement');
const newCarCalculations = require('./newCar');
const newHouseCalculations = require('./newHouse');


let exportedMethods = {
	getServicesForUser: (id, goal, data) => {
		//data is for extra info that a user must input beyond there profile, take a look at newCar.js for an example
		let problemsArray = [];
		problemsArray = currentCalculations.calculateProblem(id, data);

		if (!problemsArray) {
			switch (goal) {
				case 'retirement':
					problemsArray = retirementCalculations.calculateRetirement(id, data);
					break;
				case 'newCar':
					problemsArray = newCarCalculations.calculateProblem(id, data);
					break;
				case 'newHouse':
					problemsArray = newHouseCalculations.calculateProblem(id, data);
					break;
			}
		}

		return finProdData.getProductsFromArrayOfProductIds(problemsArray);
	}
}

module.exports = exportedMethods;