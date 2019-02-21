const url = require("url");

const mainRoute = (request, response) => {
  // console.log(url.parse(request.url));

  response.writeHead(200, { "Content-Type": "text/html" });
  response.write("<h1>Hello!</h1>");
  response.end();
};

module.exports = mainRoute;
