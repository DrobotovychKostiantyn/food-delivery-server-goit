const mainRoute = require("./main/main");
const signUpUserRoute = require("./users/signUpRoute");
const productsListRoute = require("./products");

const router = {
  "/products": productsListRoute,
  "/": mainRoute,
  "/signup": signUpUserRoute,

  default: mainRoute
};

module.exports = router;
