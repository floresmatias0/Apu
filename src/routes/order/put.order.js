const server = require("express").Router();
const { editOrder } = require("../../controllers/order/order.controller");

server.put("/:orderId", (req, res) => {
  const { orderId } = req.params;
  const order = req.body;
  return editOrder(orderId, order)
    .then((order) => {
      res.status(200).json(order);
    })
    .catch((error) => {
      res.status(400).json(error);
    });
});

module.exports = server;
