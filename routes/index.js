let problemRoutes = require("./problems.js");
let finProdRoutes = require("./finProds.js");
let customerRoutes = require("./customers.js");
let authRoutes = require("./authentication.js");

const constructorMethod = (app, passport) => {
    app.use("/problems", problemRoutes);
    app.use("/financialProducts", finProdRoutes);
    app.use("/customers", customerRoutes);
    //app.use("/auth", authRoutes);

    app.get("/", function (request, response) {
        response.render("pages/login", {error: request.flash("error")[0]});
    });
    
    app.post("/login", passport.authenticate('local', {  successRedirect: '/customers/home',
                                                        failureRedirect: '/',
                                                        failureFlash: true })
    );

    //route to log out
    app.get('/logout',
        function(req, res){
        req.logout();
        res.redirect('/');
    });

    app.use("*", (req, res) => {
        res.sendStatus(404);
    })
};

module.exports = constructorMethod;
