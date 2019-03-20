const Order = require("../../modules/db/schemas/order");

const getAllOrders = (request, response) => {
  const sendResponse = orders => {
    if (orders.length === 0) {
      response.status(200);
      response.json({ orders: "orders are empty" });
      return;
    }
    response.status(200);
    response.json(orders);
  };

  const sendError = error => {
    response.status(400);
    response.json({
      error
    });
  };

  Order.find()
    .then(sendResponse)
    .catch(err => sendError(err));
};

module.exports = getAllOrders;
