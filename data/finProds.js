const collections = require("../config/MongoCollections.js");
const finProdCollection = collections.finProds;
const uuid = require('node-uuid');

exportedMethods = {

  addFinProd: (finProd) => {
    return finProdCollection().then((finProds) => {
      let newFinProd = {
        _id: uuid.v4(),
        name: finProd.name,
        URL: finProd.URL,
        problemIds: finProd.problemIds
      };
      return finProds.insertOne(newFinProd).then((insertedFinProd) => {
        if (!insertedFinProd) throw "product not found";
        return insertedFinProd.insertedId;
      });
    });
  },

  deleteFinProdByNodeUUID: (id) => {
    return finProdCollection().then((finProds) => {
      return finProds.deleteOne({ _id: id }).then((deletionInfo) => {
        if (deletionInfo.deletedCount === 0) {
          throw ("Could not delete financial product with id " + id);
        } else {
          return id;
        }
      });
    });
  },

  getFinProdByNodeUUID: (id) => {
    return finProdCollection().then((finProds) => {
      return finProds.findOne({ _id: id }).then((finProd) => {
        if (!finProd) throw "product not found";
        return finProd;
      })
    })
  },

  getAllFinProds: () => {
    return finProdCollection().then((finProds) => {
      return finProds.find({}).toArray();
    }, (error) => {
      return error;
    })
  },

  getProductsByProblemId: (problemId) => {
    if(isNaN(problemId)){
      throw "must provide a number";
    }
    return finProdCollection().then((finProds) => {
      return finProds.find({ problemIds: problemId}).toArray();
    }).then((finProdArray) => {
      return Promise.all(finProdArray);
    }).catch((error) => {
      return error;
    })

  },

  //called by finanical modules to get a full list of all products that will solve the problems with the problem ids in the array
  getProductsFromArrayOfProblemIds: (problemIdArray) => {

    let products = new Set();
    let ready = Promise.resolve(null);

    problemIdArray.forEach((problemId) => {
      ready = ready.then(() => {
        return problemId;
      }).then((problemId) => {
        return module.exports.getFinProductsFromProblemID(problemId).then((finProds) => {
          return finProds.forEach((finProd) => {
            products.add(finProd);
          });
        });
      });
    });

    return products;

  }


}

module.exports = exportedMethods;
