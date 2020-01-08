const path = require("path");
const fs = require("fs");

const getProductsFromData = () => {
  const filePath = path.join(
    __dirname,
    "../../../",
    "data",
    "products",
    "all-products.json"
  );

  return JSON.parse(fs.readFileSync(filePath));
};

//  https://localhost:3001/products/19112832

const getProductById = (request, response) => {
  const id = request.params.id;

  const products = getProductsFromData().filter(user => user.id === Number(id));
  const answer =
    products.length > 0
      ? { status: "success", products }
      : { status: "no products", products };

  response.writeHead(200, { "Content-Type": "application/json" });
  response.write(JSON.stringify(answer));
  response.end();
  return;
};

module.exports = getProductById;
