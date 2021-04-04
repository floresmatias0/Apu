const server = require("express").Router();
const {findAllUsers, findUserById } = require("../../controllers/users/get.users");
const {protectorUser} = require("../../middlewares/protector.middleware");


module.exports = server;

  server.get("/", (req, res, next) => {
    return findAllUsers().then((users) => {
        res.status(200).json(users);
      }).catch((error) => {
        res.status(400).json(error);
      });
  });

  server.get("/:id", (req, res, next) => {
    const { id } = req.params;
    
    return findUserById(id).then((user) => {
        res.status(200).json(user);
      }).catch((error) => {
        res.status(400).json(error);
      });
  });

  









