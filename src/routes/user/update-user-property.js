const User = require("../../modules/db/schemas/user");

const updateUser = (request, response) => {
  const update = request.body;
  const id = request.params.id;

  const sendError = () => {
    response.status(400);
    response.json({
      status: "error",
      text: "there is no such user"
    });
  };

  const sendResponse = updatedUser => {
    if (!updatedUser) {
      return sendError();
    }

    response.json({
      status: "success",
      user: updatedUser
    });
  };

  User.findOneAndUpdate(
    { _id: id },
    update,
    { new: true } // вернуть обновленный документ
  )
    .then(sendResponse)
    .catch(sendError);
};

module.exports = updateUser;
