const express = require("express");
const mainRoute = require("./main/main");
const getImageRoute = require("./image/get-image");

const getUser = require("./user/get-user");
const deleteUser = require("./user/delete-user");
const getAllUser = require("./user/get-all-users");
const createUser = require("./user/create-user");
const updateUser = require("./user/update-user");

const updateUserProperty = require("./user/update-user-property");

const getAllOrders = require("./order/get-all-orders");
const createOrder = require("./order/create-order");
const getOrder = require("./order/get-order");

const updateProduct = require("./product/update-product");
const getAllProducts = require("./product/get-all-products");

const apiRoutes = express.Router();

apiRoutes
  .get("/", mainRoute)
  .get("/image", getImageRoute)

  .get("/users", getAllUser)
  .get("/users/:id", getUser)

  .delete("/users/:id", deleteUser)
  .put("/users/:id", updateUser)
  .put("/user/:id", updateUserProperty)
  .post("/users", createUser)

  .get("/orders", getAllOrders)
  .get("/orders/:id", getOrder)
  .post("/orders", createOrder)

  .get("/products", getAllProducts)
  .put("/products/:id", updateProduct);

module.exports = apiRoutes;
