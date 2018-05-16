const _ = require("underscore");
const mongoose = require("mongoose");
const ConvoModel = require("../models/convo");
const MessageModel = require("../models/message");
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

// Retrieve Convo by ID
ConvoController.getConvoById = (req, res) => {
  let convoId = req.params.id;
  let getConvoByIdPromise = ConvoModel.findById(convoId).exec();

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

//update convo
ConvoController.updateConvoById = (req, res) => {
  let convoId = req.params.id;
  let updateConvoByIdPromise = ConvoModel.findById(convoId).exec();
  updateConvoByIdPromise
    .then(convo => {
      _.extend(convo, req.body);
      return convo.save();
    })
    .then(admin => {
      return res.status(201).json(convo);
    })
    .catch(err => {
      return res.status(500).json({error: err.message});
    });
};

//delete convo
ConvoController.deleteConvoById = (req, res) => {
  let convoId = req.params.id;
  let findByIdAndRemovePromise = ConvoModel.findByIdAndRemove(convoId).exec();
  findByIdAndRemovePromise
    .then(convo => {
      return convo
      ? res.status(200).json(convo)
      : res.status(404).json({error: `No convo found with id ${convoId}`});
    })
    .catch(err => {
      console.log("Error: " + err.message);
      return res.status(500).json({error: err.message});
    });
};

module.exports = ConvoController;