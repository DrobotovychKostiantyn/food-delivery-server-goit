const fs = require("fs");

const key = fs.readFileSync("./src/ssl/server.key");
const certificate = fs.readFileSync("./src/ssl/server.crt");

const options = {
  key: key,
  cert: certificate
};

module.exports = options;
