const url = require("url");
const usersList = require("../../db/products/all-products.json");

const getId = url => {
  const lastIndex = url.lastIndexOf("/");

  if (lastIndex !== -1) {
    return url.slice(lastIndex + 1);
  }
};

const getProductById = (request, response) => {
  const parsedUrl = url.parse(request.url);
  const id = getId(parsedUrl.path);

  const products = usersList.filter(user => user.id === Number(id));

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
