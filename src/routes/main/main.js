const mainRoute = (request, response) => {
  response.set("Content-Type", "text/html");
  response.send("<h1>Homework 5</h1>");
};

module.exports = mainRoute;
