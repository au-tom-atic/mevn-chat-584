const express = require("express");
const controller = require("../controllers/messages");
let router = express.Router();

module.exports = function() {
  // Create a new message.
  router.post("/", controller.storeMessage);
  
  // Get all messages.
  router.get("/", controller.getAllMessages);

  //get one message by messageid
  router.get("/id/:id", controller.getMessageById);

  //update
  router.put("/id/:id", controller.updateMessageById);

  //delete message by id
  router.delete("/id/:id", controller.deleteMessageById);
  
  // Get messages by ConvoID
  router.get("/convoid/:convoid", controller.getMessagesByConvoId);
  //delete message by ConvoId
  router.delete("/convoid/:convoid", controller.deleteMessageByConvoId);
  
  return router;

};