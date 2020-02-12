const fs = require("fs");
const path = require("path");

const saveUser = user => {
  const pathUser = path.join(
    __dirname,
    "../../",
    "db",
    "users",
    `${user.username}.json`
  );

  fs.appendFile(pathUser, JSON.stringify(user), function(err) {
    if (err) throw err;
    console.log("Saved!");
  });
};

const signUpRoute = (request, response) => {
  if (request.method === "POST") {
    let body = "";

    request.on("data", function(data) {
      body += data;

      console.log("Incoming data!!!!");
    });

    request.on("end", function() {
      const post = JSON.parse(body);
      saveUser(post);

      response.writeHead(201, { "Content-Type": "application/json" });
      response.end(JSON.stringify({ status: "success", user: post }));
    });
  }
};

module.exports = signUpRoute;
