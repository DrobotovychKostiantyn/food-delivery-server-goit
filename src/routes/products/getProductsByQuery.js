const url = require("url");
const fs = require("fs");
const path = require("path");
const qs = require("querystring");

const productsFolder = path.join(__dirname, "../../", "db", "/products");
const allProducts = fs.readFileSync(productsFolder + "/all-products.json");

const badAnswer = (products, res) => {
  res.writeHead(200, { "Content-Type": "application/json" });
  res.write(JSON.stringify({ status: "no products", products }));
  res.end();
};

const goodAnswer = (products, res) => {
  res.writeHead(200, { "Content-Type": "application/json" });
  res.write(JSON.stringify({ status: "success", products }));
  res.end();
};

const getProductsByIds = (req, res) => {
  const parsedQuery = qs.parse(url.parse(req.url).query);

  // https://localhost:3001/products/?category="pizza"

  if (parsedQuery.category) {
    const categoryFromParsedQuery = parsedQuery.category.slice(
      1,
      parsedQuery.category.length - 1
    );

    const products = JSON.parse(allProducts).filter(
      product => product.categories[0] === categoryFromParsedQuery
    );

    if (products.length > 0) {
      goodAnswer(products, res);
      return;
    }

    badAnswer(products, res);
    return;
  }

  //  https://localhost:3001/products/?ids="19112831,19112832"
  if (parsedQuery.ids) {
    const idsFromParsedQuery = parsedQuery.ids
      .slice(1, parsedQuery.ids.length - 1)
      .split(",");

    const products = idsFromParsedQuery.reduce((acc, id) => {
      JSON.parse(allProducts).map(product =>
        product.id === Number(id) ? acc.push(product) : product
      );
      return acc;
    }, []);

    if (products.length > 0) {
      goodAnswer(products, res);
      return;
    }

    badAnswer(products, res);
  }
};

module.exports = getProductsByIds;
