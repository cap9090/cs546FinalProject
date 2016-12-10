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
        problemIds: finProd.problemIds,
        description: finProd.description,
        contactInfo: finProd.contactInfo
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
    if (isNaN(problemId)) {
      throw "must provide a number";
    }
    return finProdCollection().then((finProds) => {
      return finProds.find({ problemIds: problemId }).toArray();
    }).catch((error) => {
      return error;
    })

  },

  //called by finanical modules to get a full list of all products that will solve the problems with the problem ids in the array
  getProductsFromArrayOfProblemIds: (problemIdArray) => {
    let products = []
    return Promise.all(problemIdArray.map((problemId) => {
      return module.exports.getProductsByProblemId(problemId).then((finProdsArray) => {
        return Promise.all(finProdsArray.map(finProd => {
          products.push(finProd);
          return Promise.resolve();
       }));
      });
    })).then(() => {
      return products;
    });
  }

}





module.exports = exportedMethods;