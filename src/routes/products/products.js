const fs = require("fs");
const path = require("path");

const productsFolder = path.join(__dirname, "../../", "db", "/products");
const allProducts = fs.readFileSync(productsFolder + "/all-products.json");

const productsList = (request, response) => {
  response.writeHead(200, { "Content-Type": "application/json" });
  response.write(allProducts);
  response.end();
};

module.exports = productsList;
