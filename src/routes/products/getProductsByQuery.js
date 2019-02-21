const url = require("url");
const usersList = require("../../db/products/all-products.json");
const qs = require("querystring");

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

  // http://localhost:3001/products/?category="pizza"

  if (parsedQuery.category) {
    const categoryFromParsedQuery = parsedQuery.category.slice(
      1,
      parsedQuery.category.length - 1
    );

    const products = usersList.filter(
      user => user.categories[0] === categoryFromParsedQuery
    );

    if (products.length > 0) {
      goodAnswer(products, res);
      return;
    }

    badAnswer(products, res);
    return;
  }

  //  http://localhost:3001/products/?ids='19112836,19112835,19112835'
  if (parsedQuery.ids) {
    const idsFromParsedQuery = parsedQuery.ids
      .slice(1, parsedQuery.ids.length - 1)
      .split(",");

    const products = idsFromParsedQuery.reduce((acc, id) => {
      usersList.map(user => (user.id === Number(id) ? acc.push(user) : user));
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
