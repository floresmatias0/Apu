const server = require("express").Router();
const usersControler = require("../../controllers/users/put.users");
module.exports = server;

server.put('/:id', (req, res, next) => {
    const user = req.body;
    const { id } = req.params;
    usersControler
        .editUser(user, id)
        .then((user) => {
            res.status(200).json(user);
          })
          .catch((error) => {
            res.status(400).json(error);
          })
})

server.put('/',(req, res, next) => {
  const {code, pass} = req.body;
  console.log('entre')
  console.log(code)
  console.log(pass)
  usersControler
      .resetPass(code, pass)
      .then((success) => {
          return res.status(200).json(success);
        })
        .catch((error) => {
          return res.status(400).json(error);
        })
})