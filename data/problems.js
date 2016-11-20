const collections = require("../config/MongoCollections.js");
const problemCollection = collections.problems;
const uuid = require('node-uuid');


exportedMethods = {

  getAllProblems: () => {
    return problemCollection().then((problems) => {
      return problems.find({}).toArray();
    }, (error) => {
      return error;
    })
  },


  getProblemByNodeUUID: (id) => {
    return problemCollection().then((problems) => {
      return problems.findOne({_id: id}).then((problem) => {
        if(!problem) throw "problem not found";
        return problem;
      })
    })
  },

  getProblemByProblemID: (id) => {
    return problemCollection().then((problems) => {
      return problems.findOne({problemId: id}).then((problem) => {
        if(!problem) throw "problem not found";
        return problem;
      })
    })
  },

  deleteProblemByNodeUUID: (id) => {
    return problemCollection().then((problems) => {
      return problems.deleteOne({_id: id}).then((deletionInfo) => {
        if(deletionInfo.deletedCount === 0 ) {
          throw ("Could not delete problem with id " + id);
        } else {
          return id;
        }
      });
    });
  },


  addProblem: (problem) => {
    return problemCollection().then((problems) => {
      let newProblem = {
         _id: uuid.v4(),
         problemId: problem.problemId,
         problemDescription: problem.problemDescription
       };
       return problems.insertOne(newProblem).then((insertedProblem) => {
         if(!insertedProblem) throw "problem not found";
         return insertedProblem.insertedId;
       });
    });
  }



}

  module.exports = exportedMethods;
