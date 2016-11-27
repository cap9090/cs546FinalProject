const express = require('express');
const router = express.Router();
const data = require("../data");
const authData = data.authentication;
//const passport = require('passport');

/*
router.post("/", passport.authenticate('local', { successRedirect: '/customers/home',
                                                  failureRedirect: '/',
                                                  failureFlash: true})
);

router.post("/", (req, res) => {
  return authData.authenticateLogin(req.params.username , req.params.pass).then((customer) => {
      res.status(200).json({success: true, message: customer._id});
  }).catch((error) => {
    res.status(500).json({success: false});
  });
});
*/
module.exports = router;