const express = require("express");
const controller = require("../controllers/convos");
let router = express.Router();

module.exports = function(io) {
  // Create a new user.
  router.post("/", controller.storeConvo);
  
  // Get all users.
  router.get("/", controller.getAllConvos);
  // Get user by ID
  router.get("/id/:id", controller.getConvoById);

  //delete

  //update
  return router;

};