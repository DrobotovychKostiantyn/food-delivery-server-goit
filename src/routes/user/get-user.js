const path = require("path");
const fs = require("fs");

const usersFolder = path.resolve(__dirname, "../../../", "data/users");

const getUserFromDb = (usersList, id) => {
  const getUserById = usersList.find(user => user.id === id);
  return getUserById;
};

const sendResponse = (user, res) => {
  res.writeHead(200, { "Content-Type": "application/json" });
  res.write(JSON.stringify(user));
  res.end();
};

const sendError = res => {
  res.set("Content-Type", "application/json");
  res.status(400);
  res.json({
    error: "user was not find"
  });
};

// https://localhost:3001/users/RijlqD_Jq

const getUser = (request, response) => {
  const id = request.params.userId;
  const src = path.resolve(usersFolder + "/all-users.json");
  const allUsersJson = fs.readFileSync(src);

  const user = getUserFromDb(JSON.parse(allUsersJson), id);

  user ? sendResponse(user, response) : sendError(response);
};

module.exports = getUser;
