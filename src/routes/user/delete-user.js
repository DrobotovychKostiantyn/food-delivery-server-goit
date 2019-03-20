const User = require("../../modules/db/schemas/user");

const getUser = (request, response) => {
  const id = request.params.id;

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

  User.findById(id)
    .remove()
    .then(sendResponse)
    .catch(err => sendError(err));
};

module.exports = getUser;
