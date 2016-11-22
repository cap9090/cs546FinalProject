let problemRoutes = require("./problems.js");
let finProdRoutes = require("./finProds.js");
let customerRoutes = require("./customers.js");

const constructorMethod = (app) => {
    app.use("/problems", problemRoutes);
    app.use("/financialProducts", finProdRoutes);
    app.use("/customers", customerRoutes);

    app.get("/", function (request, response) {
        response.render("pages/login", {});
    });
    
    app.use("*", (req, res) => {
        res.sendStatus(404);
    })
};

module.exports = constructorMethod;
