const express = require("express");
const controller = require("../controllers/convos");
let router = express.Router();

module.exports = function(io) {
  // Create a new convo.
  router.post("/", controller.storeConvo);
  
  // Get all convos.
  router.get("/", controller.getAllConvos);
  // Get convo by ID
  router.get("/id/:id", controller.getConvoById);

  //delete

  //update
  return router;

};