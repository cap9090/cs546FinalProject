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
		return currentCalculations.calculateProblem(id, data).then((currentProblemsArray) => {
			if (currentProblemsArray.length === 0) {
				switch (goal) {
					case 'retirement':
						retirementCalculations.calculateProblem(id, data).then( (retirementProblemsArray) => {
							return finProdData.getProductsFromArrayOfProblemIds(retirementProblemsArray);
						});
						break;
					case 'newCar':
						newCarCalculations.calculateProblem(id, data).then( (carProblemsArray) => {
							return finProdData.getProductsFromArrayOfProblemIds(carProblemsArray);
						});
						break;
					case 'newHouse':
						newHouseCalculations.calculateProblem(id, data).slice(0).then( (houseProblemsArray) => {
							return finProdData.getProductsFromArrayOfProblemIds(houseProblemsArray);
							});
						break;
				}
			}
			else {
				return finProdData.getProductsFromArrayOfProblemIds(currentProblemsArray);
			}
		})
	}
}

module.exports = exportedMethods;