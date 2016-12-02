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

app.post('/', function(req, res, next) {
    passport.authenticate('local', function(error, user, info) {
        if(error) {
            return res.status(500).json(error);
        }
        if(!user) {
            return res.status(401).json(info.message);
        }
        res.json(user);
    })(req, res, next);
});

router.post("/", (req, res) => {
  return authData.authenticateLogin(req.params.username , req.params.pass).then((customer) => {
      res.status(200).json({success: true, message: customer._id});
  }).catch((error) => {
    res.status(500).json({success: false});
  });
});
*/
module.exports = router;