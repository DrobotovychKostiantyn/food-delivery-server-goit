const url = require("url");
const getProductById = require("./getProductById");
const getProductsByQuery = require("./getProductsByQuery");
const products = require("./products");

const handleProductRoute = (req, res) => {
  const query = url.parse(req.url).query;

  const urlLine = url.parse(req.url).path;
  const lastIndex = urlLine.lastIndexOf("/");
  const isId = Number(urlLine.slice(lastIndex + 1));

  if (query) {
    getProductsByQuery(req, res);
    return;
  }

  if (isId) {
    getProductById(req, res);
    return;
  }

  products(req, res);
};

module.exports = handleProductRoute;
