const _ = require("underscore");
const mongoose = require("mongoose");
const MessageModel = require("../models/message");
let MessageController = {};

//Create Message
MessageController.storeMessage = (req, res) => {
  let message = new MessageModel(req.body);
  let createMessagePromise = message.save();

  createMessagePromise
    .then(message => {
      return res.status(201).json({
          convoID: message.convoID,
          text: message.text,
          sender: message.sender,
          date: new Date(),
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

// Retrieve All Messages.
MessageController.getAllMessages = (req, res) => {
  let getAllMessagesPromise = MessageModel.find({}).exec();
  getAllMessagesPromise
    .then(messages => {
      return res.status(200).json(messages);
    })
    .catch(err => {
      return res.status(500).json({ error: err });
    });
};

//Retrieve converstaion history LIMIT 50 messages
MessageController.getMessagesForConvoId = (req, res) => {
  let messConvoId = req.params.convoid;
  console.log(messConvoId);
  let getMessagesForConvoIdPromise = MessageModel.find({convoId: messConvoId}).sort({'date':-1}).limit(50).exec();

  getMessagesForConvoIdPromise
  .then(messages => {
    console.log(messages)
    return messages
      ? res.status(200).json(messages)
      : res
          .status(404)
          .json({ error: `Cannot find message from convoID: ${messConvoId}` });
  })
  .catch(err => {
    console.log(err);
    return res.status(500).json({ error: err });
  });
};

module.exports = MessageController;