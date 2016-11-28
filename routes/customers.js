const express = require('express');
const router = express.Router();
const data = require("../data");
const customerData = data.customers;


function userAuthenticated(req, res, next) {
    if (req.isAuthenticated()){
        return next();
    }

    res.redirect('/');
}

/*
//Do we want to allow for customers to see list of other customers? I would think no
router.get("/", (req,res) => {
  return customerData.getAllCustomers().then((customers) => {
     return res.status(200).json(customers);
  }).catch((error)=> {
     return res.status(500).json(error);
  });
});
*/
router.get("/", (req,res) => {
  res.render("/signup", {});
});




//redirect new customer from signup page to form for customer data entry
router.get("/new", (req,res) => {
    res.render('form', {});
});

router.get("/home", userAuthenticated, (req, res) => {
    res.render("pages/customerHome", {user: req.user});
});

/*route for ajax post to send new customer data to database*/
router.post("/new", (req, res) => {
  console.log(req.body);
  return customerData.checkIfUsernameAlreadyTaken(req.body.username).then(() => {
    customerData.addCustomer(req.body).then(() => {
       res.send({redirect: 'http://localhost:3000/customers/home'});
    })
  }).catch((error) => {
    res.status(500).json(error);
  })
});

router.get("/:id", (req, res) => {
  return customerData.getCustomerByNodeUUID(req.params.id).then((customer) => {
    res.status(200).json(customer)
  }).catch((error) => {
    res.status(500).json(error);
  })
});

router.put("/:id", (req, res) => {
  return customerData.updateCustomer(req.params.id , req.body).then((insertedId) => {
    return customerData.getCustomerByNodeUUID(insertedId).then((customer) => {
      res.status(200).json("Successfully updated customer with id " + customer._id);
    })
  }).catch((error) => {
    res.status(500).json(error);
  });
});

module.exports = router;
