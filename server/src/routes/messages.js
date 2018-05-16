const express = require("express");
const controller = require("../controllers/messages");
let router = express.Router();

module.exports = function(io) {
  // Create a new message.
  router.post("/", controller.storeMessage);
  
  // Get all messages.
  router.get("/", controller.getAllMessages);
  
  // Get messsages
  router.get("/id/:convoid", controller.getMessagesForConvoId);

  //delete

  //update
  return router;

};