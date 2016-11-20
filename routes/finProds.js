const express = require('express');
const router = express.Router();
const data = require("../data");
const finProdData = data.finProds;


router.get("/", (req,res) => {
  return finProdData.getAllFinProds().then((finProds) => {
     res.status(200).json(finProds);
  }).catch((error)=> {
    res.status(500).json(error);
  });
});

router.get("/:id", (req, res) => {
  return finProdData.getFinProdByNodeUUID(req.params.id).then((finProd) => {
    res.status(200).json(finProd)
  }).catch((error) => {
    res.status(500).json(error);
  })
});

router.get("/problemId/:id", (req, res) => {
  return finProdData.getProductsByProblemId(parseInt(req.params.id)).then((finProds) => {
    res.status(200).json(finProds)
  }).catch((error) => {
    res.status(500).json(error);
  })
})




module.exports = router;
