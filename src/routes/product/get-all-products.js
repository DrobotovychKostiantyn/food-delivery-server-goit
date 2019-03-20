const Products = require("../../modules/db/schemas/product");

const getAllProducts = (request, response) => {
  const sendResponse = products => {
    response.status(200);
    response.json(products);
  };

  const sendError = error => {
    response.status(400);
    response.json({
      error
    });
  };

  Products.find()
    .then(sendResponse)
    .catch(err => sendError(err));
};

module.exports = getAllProducts;
