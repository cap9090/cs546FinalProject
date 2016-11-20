const express = require('express');
const router = express.Router();
const data = require("../data");
const problemData = data.problems;

router.get("/", (req,res) => {
  return problemData.getAllProblems().then((problems) => {
    res.status(200).json(problems);
  }).catch((error)=> {
    res.status(500).json(error);
  });
});

router.get("/:id", (req, res) => {
  return problemData.getProblemByNodeUUID(req.params.id).then((problem) => {
    res.status(200).json(problem);
  }).catch((error) => {
    res.status(404).json(error);
  })
});

router.get("/problemId/:id" , (req, res) => {
  return problemData.getProblemByProblemID(parseInt(req.params.id)).then((problem) => {
    res.status(200).json(problem);
  }).catch((error) => {
    res.status(404).json(error);
  })
});

module.exports = router;
