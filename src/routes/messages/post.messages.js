const server = require("express").Router();
//const {protectorUser} = require("../../middlewares/protector.middleware");
const {createMessages } = require("../../controllers/messages/messages.controller");

server.post("/", (req, res, next) => {
  console.log(req.body)
  const {idTo, idFrom, message} = req.body;
  return createMessages(idTo,idFrom, message).then((messageAdded) => {
      return res.status(201).json(messageAdded);
    }).catch((error) => {
      return res.status(400).json(error.message);
    });
});

module.exports = server;
