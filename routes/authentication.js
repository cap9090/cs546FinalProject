const express = require('express');
const router = express.Router();
const data = require("../data");
const authData = data.authentication;

router.post("/", (req, res) => {
  return authData.authenticateLogin(req.params.username , req.params.pass).then((insertedId) => {
      res.status(200).json({success: true});
  }).catch((error) => {
    res.status(500).json({success: false});
  });
});

module.exports = router;