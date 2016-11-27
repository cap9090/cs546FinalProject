const customers = require("./customers");
const bcrypt = require("bcrypt-nodejs");
const LocalStrategy = require('passport-local').Strategy;

module.exports = function(passport){
    passport.serializeUser(function(user, done) {
        done(null, user.username);
    });

    passport.deserializeUser(function(username, done) {
        customers.getCustomerByUsername(username).then((foundUser) => {
            done(null, foundUser);
        });
    });
    passport.use(new LocalStrategy(
        function(username, password, done) {
            return customers.getCustomerByUsername(username).then((foundUser) => {
                //console.log("pass: " + foundUser.password);
                bcrypt.compare(password, foundUser.hashPass, function (err, res) {
                    if (res === true) {
                        return done(null, foundUser);
                    }
                    else {
                        return done(null, false, {message: "Incorrect password"});
                    }
                });
            }).catch((error) => {
                return done(null, false, {message: "Incorrect username"});
            });
        }
    ));
    /*
    authenticateLogin: (username, password) => {
        let hash = bcrypt.hashSync(username+password);
        let hashedUsernameAndPassword = new Promise((resolve, reject) => {
            bcrypt.hash(hash, null, null, function (error, hash) {
                if (error) {
                    reject(error);
                }
                else {
                    resolve(hash);
                }
            });
        });

        /*
        THIS IS NOT COMPLETE YET
        I believe customer.js in /data may need a method to retrieve
        the password hash so that bcrypt.compare can be called
        against it using the hashed input username and password to
        this function. Currently the only way to verify the input
        username and password is to hash it and call the
        getCustomerByHashedUserNameAndPassword function and I'm not
        sure if bcrypt.compare is needed, or if the hashed
        input username+password can just be used as the parameter to
        the existing function in data/customers
        

        //return customers.getCustomerByHashedUserNameAndPassword()
        let retrievedCustomer = {};
        return hashedUsernameAndPassword.then((hash) => {
            return customers.getCustomerByHashedUserNameAndPassword(hash).then((foundCustomer) => {
                return foundCustomer;
            })
        }).catch((error)=> {
            throw error;
        });
    }
    */
}

//module.exports = exportedMethods;