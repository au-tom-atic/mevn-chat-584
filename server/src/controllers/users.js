const _ = require("underscore");
const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');
const settings = require('../config/settings');
const UserModel = require("../models/user");
let UserController = {};

//Create User
UserController.storeUser = (req, res) => {
  let user = new UserModel(req.body);
  let createUserPromise = user.save();

  createUserPromise
    .then(user => {
      return res.status(201).json({
          _id: new mongoose.Types.ObjectId,
          username: user.username,
          password: user.password
      })
    })
    .catch(err => {
      console.log(err)
      const DUPLICATE_KEY = 11000;
      return err.code === DUPLICATE_KEY
        ? res.status(400).json(err.errmsg)
        : res.status(500).json(err.errmsg);
    });
};

// Retrieve All Users.
UserController.getAllUsers = (req, res) => {
  let getAllUsersPromise = UserModel.find({}).exec();
  getAllUsersPromise
    .then(users => {
      return res.status(200).json(users);
    })
    .catch(err => {
      return res.status(500).json({ error: err });
    });
};

// Retrieve User by ID
UserController.getUserById = (req, res) => {
  let userID = req.params.id;
  let getUserByIdPromise = UserModel.findById(userID).exec();

  getUserByIdPromise
  .then(user => {
    console.log(user)
    return user
      ? res.status(200).json({
        id: user.id,
        username: user.username,
      })
      : res
          .status(404)
          .json({ error: `Cannot find user with id: ${userID}` });
  })
  .catch(err => {
    console.log(err);
    return res.status(500).json({ error: err });
  });
};

//login
UserController.login = (req, res) =>  {
  UserModel.findOne({
    username: req.body.username
  }, function(err, user) {
    if (err) throw err;

    if (!user) {
      res.status(401).send({success: false, msg: 'Authentication failed. User not found.'});
    } else {
      // check if password matches
      user.comparePassword(req.body.password, function (err, isMatch) {
        if (isMatch && !err) {
          // if user is found and password is right create a token
          var token = jwt.sign(user.toJSON(), settings.secret);
          // return the information including token as JSON
          res.status(200).json({username: user.username, id: user.id, success: true, token: 'JWT ' + token});
        } else {
          res.status(401).send({success: false, msg: 'Authentication failed. Wrong password.'});
        }
      });
    }
  });
};

module.exports = UserController;