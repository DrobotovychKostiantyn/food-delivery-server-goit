const fs = require("fs");
const path = require("path");
const util = require("util");
const shortid = require("shortid");

const usersFolder = path.resolve(__dirname, "../../../", "data/users");
const data = fs.readFileSync(usersFolder + "/all-users.json");

const writeFile = util.promisify(fs.writeFile);

const saveNewUser = usersList => {
  const dataStr = JSON.stringify(usersList);

  return writeFile(usersFolder + "/all-users.json", dataStr);
};

// https://localhost:3001/users

const createUser = (request, response) => {
  const user = request.body;
  const userData = { ...user, id: shortid.generate() };

  const newUserList = [...JSON.parse(data), userData];

  const sendResponse = () => {
    response.status(200);
    response.json({
      status: "success",
      user: userData
    });
  };

  const sendError = () => {
    response.status(400);
    response.json({
      error: "user was not saved"
    });
  };

  saveNewUser(newUserList)
    .then(sendResponse)
    .catch(sendError);
};

module.exports = createUser;
