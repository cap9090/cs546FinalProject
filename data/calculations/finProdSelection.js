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
							return finProdData.getProductsFromArrayOfProblemIds(retirementProblemsArray). then((products) => {
								return products;
							})
						});
						break;
					case 'newCar':
						return newCarCalculations.calculateProblem(id, data).then( (carProblemsArray) => {
							return finProdData.getProductsFromArrayOfProblemIds(carProblemsArray).then((products) => {
								return products;
							})
						});
						break;
					case 'newHouse':
						return newHouseCalculations.calculateProblem(id, data).then( (houseProblemsArray) => {
							return finProdData.getProductsFromArrayOfProblemIds(houseProblemsArray).then((products) => {
								return products;
							})
							});
						break;
				}
			}
			else {
				return finProdData.getProductsFromArrayOfProblemIds(currentProblemsArray).then((products) => {
					return products;
				})
			}
		})
	}
}

module.exports = exportedMethods;