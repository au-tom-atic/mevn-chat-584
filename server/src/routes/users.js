const express = require("express");
const controller = require("../controllers/users");
let router = express.Router();

module.exports = function() {
  // Create a new user.
  router.post("/", controller.storeUser);
  
  // Get all users.
  router.get("/", controller.getAllUsers);
  // Get user by ID
  router.get("/id/:id", controller.getUserById);

  //Get user by username
  router.get("/username/:username", controller.getUserByUsername);

  //login
  router.post("/login", controller.login);

  //update
  router.put("/id/:id", controller.updateUserById);
  //delete
  router.delete("/id/:id", controller.deleteUserById);
  
  return router;

  
};