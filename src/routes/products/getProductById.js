const url = require("url");
const fs = require("fs");
const path = require("path");

const productsFolder = path.join(__dirname, "../../", "db", "/products");
const allProducts = fs.readFileSync(productsFolder + "/all-products.json");

const getId = url => {
  const lastIndex = url.lastIndexOf("/");

  if (lastIndex !== -1) {
    return url.slice(lastIndex + 1);
  }
};

// https://localhost:3001/products/19112832

const getProductById = (request, response) => {
  const parsedUrl = url.parse(request.url);
  const id = getId(parsedUrl.path);

  const products = JSON.parse(allProducts).filter(
    product => product.id === Number(id)
  );
  if (products.length > 0) {
    response.writeHead(200, { "Content-Type": "application/json" });
    response.write(JSON.stringify({ status: "success", products }));
    response.end();
    return;
  }

  response.writeHead(200, { "Content-Type": "application/json" });
  response.write(JSON.stringify({ status: "no products", products }));
  response.end();
};

module.exports = getProductById;
