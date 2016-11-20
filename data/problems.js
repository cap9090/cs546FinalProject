const collections = require("../config/MongoCollections.js");
const problemCollection = collections.problems;
const uuid = require('node-uuid');


exportedMethods = {



  getAllProblems: () => {
    return problemCollection().then((problems) => {
      return problems.find({});
    }, (error) => {
      console.error(error);
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
  // updateRecipe: (id, requestBody) => {
  //   let updatedDocument = {
  //     _id: id
  //   };
  //
  //   if(requestBody.title !== undefined && typeof requestBody.title === 'string'){
  //     updatedDocument.title = requestBody.title;
  //   }
  //   if(requestBody.ingredients !== undefined && typeof requestBody.ingredients === 'object'){
  //     updatedDocument.ingredients = requestBody.ingredients;
  //   }
  //   if(requestBody.steps !== undefined && typeof requestBody.steps === 'object'){
  //     updatedDocument.steps = requestBody.steps;
  //   }
  //
  //   //this loop solely for updating comments from requst body
  //   for (let i = 0; i < requestBody.comments.length; i++) {
  //     /*
  //     1. comment already exists - and we simply update it
  //
  //     2. comment doesn't already exists (adding new comment to recipe) - and we make an new comment
  //     */
  //     exportedMethods.getCommentById(requestBody.comments[i]._id)
  //     //.then for comment already exist and we simply update it
  //     .then((comment) =>{
  //       let curPoster = comment.poster;
  //       let curComment = comment.comment;
  //
  //       if(requestBody.comments[i].poster !== undefined){
  //         curPoster = requestBody.comments[i].poster;
  //       }
  //       if(requestBody.comments[i].comment !== undefined){
  //         curComment = requestBody.comments[i].comment;
  //       }
  //       exportedMethods.updateComment(id, requestBody.comments[i]._id, { poster: curPoster , comment: curComment});
  //     })
  //     //.catch for comment doesn't exist and we add it to the recipe
  //     .catch(() => {
  //       exportedMethods.insertCommentForRecipe(id,
  //         {poster: requestBody.comments[i].poster , comment: requestBody.comments[i].comment });
  //     })
  //   }
  //
  //   return recipeCollection().then((recipes) => {
  //       return recipes.updateOne({_id: id}, {$set : updatedDocument}).then(() => {
  //         return updatedDocument._id;
  //       });
  //   });
  // },
  //
  // deleteRecipe: (id) => {
  //   return recipeCollection().then((recipes) => {
  //     return recipes.deleteOne({_id: id}).then((deletionInfo) => {
  //       if(deletionInfo.deletedCount === 0 ) {
  //         throw ("Could not delete recipe with id " + id);
  //       } else {
  //         return id;
  //       }
  //     });
  //   });
  // },
  //
  //
  // getCommentsByRecipe: (recipeId) => {
  //   return recipeCollection().then((recipes) => {
  //     return recipes.find({_id: recipeId},
  //       {title:1, "comments._id":1, "comments.title":1, "comments.poster":1, "comments.comment": 1}).toArray()
  //     .then ((recipe) => {
  //       console.log(recipe);
  //       if(!recipe[0]) {
  //         throw ("No comments for recipe with id " + recipeId);
  //           }
  //           //below is just formatting the output per the assignment instructions
  //           let ret = [];
  //           for (let i = 0; i < recipe[0].comments.length; i++){
  //             ret.push({commentId: recipe[0].comments[i]._id, recipeId: recipe[0]._id,
  //               recipeTitle: recipe[0].title, poster: recipe[0].comments[i].poster ,
  //               comment: recipe[0].comments[i].comment});
  //           }
  //           return ret;
  //         });
  //       });
  // },
  //
  //
  // getCommentById: (commentId) => {
  //   return recipeCollection().then((recipes) => {
  //     return recipes.find({'comments._id': commentId}).toArray()
  //     .then((recipe) => {
  //       if(!recipe[0]){
  //         throw ("Comment with id " + commentId + " not found");
  //       }
  //       //below is just formatting the output per the assignment instructions
  //       for (let i = 0; i < recipe[0].comments.length; i++){
  //         if(recipe[0].comments[i]._id == commentId)
  //            return {commentId: recipe[0].comments[i]._id, recipeId: recipe[0]._id,
  //              recipeTitle: recipe[0].title, poster: recipe[0].comments[i].poster ,
  //              comment: recipe[0].comments[i].comment};
  //       }
  //     });
  //   });
  // },
  //
  // insertCommentForRecipe: (recipeId, requestBody) => {
  //   return recipeCollection().then((recipes) => {
  //     return recipes.updateOne({_id: recipeId},
  //       {$push : { comments: {_id: uuid.v4(), poster: requestBody.poster, comment: requestBody.comment}}})
  //     .then((status) => {
  //       if(status.modifiedCount === 0) {
  //         throw ("Unable to insert comment");
  //       }else {
  //         return requestBody;
  //       }
  //     })
  //   })
  // },
  //
  // updateComment: (recipeId, commentId, requestBody) => {
  //
  //       return recipeCollection().then((recipes) => {
  //
  //         return exportedMethods.getCommentById(commentId).then((comment) => {
  //           if(requestBody.poster !== undefined && typeof requestBody.poster === 'string'){
  //             comment.poster = requestBody.poster;
  //           }
  //           if(requestBody.comment !== undefined && typeof requestBody.comment === 'string'){
  //             comment.comment = requestBody.comment;
  //           }
  //           return recipes.updateOne({_id: recipeId, 'comments._id': commentId},
  //               {$set : {"comments.$.poster" : comment.poster, "comments.$.comment": comment.comment}}
  //                 ).then((status) => {
  //                 if(status.modifiedCount !== 0) {
  //                   return exportedMethods.getCommentById(commentId);
  //                 } else {
  //                   throw "unable to update comment with id " + commentId +
  //                           " you will get this error if your updates match existing data";
  //                 }
  //               });
  //             });
  //           });
  // },
  //
  // deleteComment: (commentId) => {
  //   return recipeCollection().then((recipes) => {
  //     return recipes.updateMany({}, {$pull : {comments : {_id: commentId}}})
  //     .then((writeResult) => {
  //       if(writeResult.modifiedCount !== 0) {
  //         return commentId;
  //       } else {
  //         throw "Unable to remove comment with id " + commentId;
  //       }
  //     });
  //   });
  //
  // }



}

  module.exports = exportedMethods;
