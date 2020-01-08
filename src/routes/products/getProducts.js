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

const success = (products, res) => {
  res.writeHead(200, { "Content-Type": "application/json" });
  res.write(JSON.stringify({ status: "success", products }));
  res.end();
};

const error = (products, res) => {
  res.writeHead(200, { "Content-Type": "application/json" });
  res.write(JSON.stringify({ status: "no products", products }));
  res.end();
};

const products = (req, res) => {
  if (req.query) {
    // https://localhost:3001/products/?category="pizza"
    if (req.query.category) {
      const { category } = req.query;
      const sliceCategory = category.slice(1, category.length - 1);
      const products = getProductsFromData().filter(
        product => product.categories[0] === sliceCategory
      );
      if (products.length > 0) {
        success(products, res);
        return;
      }
      error(products, res);
      return;
    }

    // https://localhost:3001/products/?ids="19112836,19112835,19112835"
    if (req.query.ids) {
      const { ids } = req.query;
      const sliceIds = ids.slice(1, ids.length - 1);
      const idsArr = sliceIds.split(",");
      const products = idsArr.reduce((acc, id) => {
        getProductsFromData().map(product =>
          product.id === Number(id) ? acc.push(product) : product
        );
        return acc;
      }, []);
      if (products.length > 0) {
        success(products, res);
        return;
      }
      error(products, res);
      return;
    }
  }

  res.writeHead(200, { "Content-Type": "application/json" });
  res.write(JSON.stringify(getProductsFromData()));
  res.end();
};

module.exports = products;
