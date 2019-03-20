const User = require("../../modules/db/schemas/user");

const getAllUser = (request, response) => {
  const sendResponse = user => {
    response.status(200);
    response.json(user);
  };

  const sendError = error => {
    response.status(400);
    response.json({
      error
    });
  };

  User.find()
    .then(sendResponse)
    .catch(err => sendError(err));
};

module.exports = getAllUser;
