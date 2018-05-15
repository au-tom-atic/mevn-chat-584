const express = require("express");
const controller = require("../controllers/users");
let router = express.Router();

module.exports = function(io) {
  // Create a new user.
  router.post("/", controller.storeUser);
  
  // Get all users.
  router.get("/", controller.getAllUsers);
  // Get user by ID
  router.get("/id/:id", controller.getUserById);

  //login
  router.post("/login", controller.login);
  
  return router;

  
};