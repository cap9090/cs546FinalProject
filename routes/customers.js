const express = require('express');
const router = express.Router();
const data = require("../data");
const xss = require('xss');
const customerData = data.customers;
const calculation = data.calculation;
const finProdData = data.finProds;


function userAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }

    res.redirect('/');
}

router.get("/", (req, res) => {
    res.render("/signup", {});
});

//redirect new customer from signup page to form for customer data entry
router.get("/new", (req, res) => {
    res.render('form', {});
});

router.get("/home", userAuthenticated, (req, res) => {

    let dateString = req.user.profile.DOB.toString();
    req.user.profile.DOB = {
        year: dateString.substring(0, 4),
        month: dateString.substring(5, 7),
        day: dateString.substring(8, 10)
    };
    return finProdData.getAllFinProds().then((finProds) => {
        res.render("pages/customerHome", {products:finProds, user: req.user });
    }).catch((error)=> {
        res.status(500).json(error);
    });
    
});

router.get('/profile', userAuthenticated, (req, res) => {
    let dateString = req.user.profile.DOB.toString();
    req.user.profile.DOB = {
        year: dateString.substring(0, 4),
        month: dateString.substring(5, 7),
        day: dateString.substring(8, 10)
    };
    res.render("pages/profile", { user: req.user });
})

router.get('/goals', userAuthenticated, (req, res) => {
    let dateString = req.user.profile.DOB.toString();
    req.user.profile.DOB = {
        year: dateString.substring(0, 4),
        month: dateString.substring(5, 7),
        day: dateString.substring(8, 10)
    };
    res.render("pages/goals", { user: req.user });
})


/*route for ajax post to send new customer data to database*/
router.post("/new", (req, res) => {
    return customerData.checkIfUsernameAlreadyTaken(xss(req.body.username)).then(() => {
        customerData.addCustomer(req.body).then(() => {
            res.send({ redirect: 'http://localhost:3000/customers/home' });
        })
    }).catch((error) => {
        //res.status(500).json(error);
        res.send({error: "Sorry, that username is taken"});
    })
});

router.put("/update", userAuthenticated, (req, res) => {
    let user = req.user;
    let dateString = req.user.profile.DOB.toString();
    req.user.profile.DOB = {
        year: dateString.substring(0, 4),
        month: dateString.substring(5, 7),
        day: dateString.substring(8, 10)
    };
    return customerData.updateCustomer(user._id, req.body).then((insertedId) => {
        return customerData.getCustomerByNodeUUID(insertedId).then((customer) => {
            res.status(200).json('success for' + customer._id);
        })
    }).catch((error) => {
        res.status(500).json(error);
    });
});

//   post extra data for calculations and call getServicesForUser(user, goal, data) as defined in finProdSelection Module
router.post('/calculations', userAuthenticated, (req, res) => {
    let user = req.user;
    return calculation.getServicesForUser(user._id, req.body.goal, req.body.data).then((finProds) => {
        //console.log(finProds)
        res.render("partials/products_card", { products: finProds, user: user, goal: req.body.goal }, (err, html) => {
          res.send(html);
        });
    }).catch((error) => {
        res.status(500).json(error);
    });
});

module.exports = router;
