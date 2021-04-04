const { User, Messages } = require("../../db");

module.exports = {
//   createMessages: async (idTo, idFrom, message) => { 
//     let newMessageDos = {
//         from:idFrom,
//         to:idTo,
//         data:message
//     }
//     return await Messages.create(newMessageDos).then((message) => {
//       return User.findByPk(idTo).then((user) => {
//         Messages.findByPk(message.id).then((newMessage) => {
//           var messageAdded = newMessage;
//             return user.addMessages(messageAdded).then(()=>{
//               return messageAdded.dataValues;
//             });            
//           }).catch((error) => {
//             return error
//           });
//        })
//     });
//   },
createMessages: async (idTo, idFrom, message) => { 
    let newMessageDos = {
        from:idFrom,
        to:idTo,
        data:message
    }
    return await Messages.create(newMessageDos).then(async(message) => {
      return await User.findByPk(idTo).then(async(oneMessage) => {
        return await Messages.findByPk(message.id).then((newMessageId) => {
            oneMessage.addMessage(newMessageId);
          return newMessageId;
        });
      });
    });  
 },
  getMessages: async () => {
    return await Messages.findAll().then((messages) => messages);
  },
  getMessageById: async (idComment) => {
    return await Messages.findByPk(idMessage).then((message) => message);
  },
  editMessage: async (messageId, message) => {
    return await Messages.update(message, {
      where: {
        id: messageId,
      },
    }).then((message) => message);
  },
  deleteMessage: async (messageId) => {
    return await Messages.destroy({
      where: {
        id: messageId,
      },
    }).then((message) => {
      return message === 1 ? "Message delete succefull" : "Message dont´s exist"
    });
  },
};
