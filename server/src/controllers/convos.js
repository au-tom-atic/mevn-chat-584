const _ = require("underscore");
const mongoose = require("mongoose");
const ConvoModel = require("../models/convo");
let ConvoController = {};

//Create Convo
ConvoController.storeConvo = (req, res) => {
  let convo = new ConvoModel(req.body);
  let createConvoPromise = convo.save();

  createConvoPromise
    .then(convo => {
      return res.status(201).json({
          _id: new mongoose.Types.ObjectId,
          users: convo.users
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

// Retrieve All Convos.
ConvoController.getAllConvos = (req, res) => {
  let getAllConvosPromise = ConvoModel.find({}).exec();
  getAllConvosPromise
    .then(convos => {
      return res.status(200).json(convos);
    })
    .catch(err => {
      return res.status(500).json({ error: err });
    });
};

// Retrieve User by ID
ConvoController.getConvoById = (req, res) => {
  let convoID = req.params.id;
  let getConvoByIdPromise = ConvoModel.findById(convoID).exec();

  getConvoByIdPromise
  .then(convo => {
    console.log(convo)
    return convo
      ? res.status(200).json({
        id: convo.id,
        users: convo.users,
      })
      : res
          .status(404)
          .json({ error: `Cannot find convo with id: ${convoID}` });
  })
  .catch(err => {
    console.log(err);
    return res.status(500).json({ error: err });
  });
};

module.exports = ConvoController;