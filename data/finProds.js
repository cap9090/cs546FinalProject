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
        if(!insertedFinProd) throw "problem not found";
        return insertedFinProd.insertedId;
      });
    });
  },


  getFinProdByNodeUUID: (id) => {
    return finProdCollection().then((finProds) => {
      return finProds.findOne({_id: id}).then((finProd) => {
        if(!finProd) throw "problem not found";
        return finProd;
      })
    })
  },

  getAllFinProds: () => {
    return finProdCollection().then((finProds) => {
      return finProds.find({});
    }, (error) => {
      console.error(error);
    })
  }

}

  module.exports = exportedMethods;
