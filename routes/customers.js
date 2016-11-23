const express = require('express');
const router = express.Router();
const data = require("../data");
const customerData = data.customers;

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


router.get("/:id", (req, res) => {
  return customerData.getCustomerByNodeUUID(req.params.id).then((customer) => {
    res.status(200).json(customer)
  }).catch((error) => {
    res.status(500).json(error);
  })
});

//redirect new customer from signup page to form for customer data entry
router.get("/new", (req,res) => {
    res.render('form', {});
});


/*route for ajax post to send new customer data to database*/
router.post("/new", (req, res) => {

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
