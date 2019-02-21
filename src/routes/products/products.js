const productJsonList = require("../../db/products/all-products.json");

const productsList = (request, response) => {
  response.writeHead(200, { "Content-Type": "application/json" });
  response.write(JSON.stringify(productJsonList));
  response.end();
};

module.exports = productsList;
