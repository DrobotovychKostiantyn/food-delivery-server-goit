const fs = require("fs");
const path = require("path");
const shortid = require("shortid");

const ordersFolder = path.resolve(__dirname, "../../../", "data/users/orders");
const productsFolder = path.join(__dirname, "../../../", "data", "/products");
const allProducts = fs.readFileSync(productsFolder + "/all-products.json");

const sendResponse = (res, data) => {
  res.json({
    status: "success",
    order: data
  });
};

const sendError = res => {
  res.status(400);
  res.json({
    status: "failed",
    order: null
  });
};

// https://localhost:3001/orders

const createOrder = (request, response) => {
  const order = request.body;

  const idOfOrder = shortid.generate();

  const orderData = { id: idOfOrder, ...order };
  const fileName = orderData.id;

  const src = path.resolve(ordersFolder, fileName + ".json");

  const haveProducts = orderData.products.map(id => {
    return JSON.parse(allProducts).some(product => product.id === id);
  });

  if (!haveProducts.includes(false)) {
    fs.writeFile(src, JSON.stringify(orderData));
    sendResponse(response, orderData);
    return;
  }

  sendError(response);
};

module.exports = createOrder;
