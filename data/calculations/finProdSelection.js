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
		return currentCalculations.calculateProblem(id, data).then((currentResult) => {
			if (currentResult.problems.length === 0) {
				switch (goal) {
					case 'Retirement':
						return retirementCalculations.calculateProblem(id, data);
					case 'New Car':
						return newCarCalculations.calculateProblem(id, data);
					case 'New House':
						return newHouseCalculations.calculateProblem(id, data);
				}
			}
			else
				return currentResult;
		}).then((result) => {
			return getProductsFromArrayOfProblemIds(result.problems).then((products) => {
				let service = {
					products: products,
					message: result.message
				};
				return service;
			})
		});
	}
}

//called by finanical modules to get a full list of all products that will solve the problems with the problem ids in the array
function getProductsFromArrayOfProblemIds(problemIdArray) {
	let productsUUID = new Set();
	let products = [];
	return Promise.all(problemIdArray.map((problemId) => {
		return finProdData.getProductsByProblemId(problemId).then((finProdsArray) => {
			return Promise.all(finProdsArray.map(finProd => {
				if (!productsUUID.has(finProd._id)) {
					productsUUID.add(finProd._id);
					products.push(finProd);
				}
				// return Promise.resolve();
			}));
		});
	})).then(() => {
		return products;
	});
}

module.exports = exportedMethods;