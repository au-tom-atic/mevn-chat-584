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
MessageController.getMessagesByConvoId = (req, res) => {
  let messConvoId = req.params.convoid;
  console.log(messConvoId);
  let getMessagesForConvoIdPromise = MessageModel.find({convoId: messConvoId}).sort({'date':-1}).limit(50).exec();

  getMessagesForConvoIdPromise
  .then(messages => {
    //console.log(messages)
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

//Retrieve one message by message id
MessageController.getMessageById = (req, res) => {
  let messageId = req.params.id;
  let getMessageByIdPromise = MessageModel.findById(messageId).exec();
  getMessageById
    .then(message => {
      return message
        ? res.status(200).json(message)
        : res.status(404).json({error: `Cannot find message with id: ${messageId}`});
    })
    .catch(err => {
      console.log(err);
      return res.status(500).json({error: err});
    });
};

//delete message by message id
MessageController.deleteMessageById = (req, res) => {
  let messageId = req.params.id;
  let findByIdAndRemovePromise = MessageModel.findByIdAndRemove(messageId).exec();
  findByIdAndRemovePromise
    .then(message => {
      return message
      ? res.status(201).json(message)
      : res.status(404).json({error: `No message found with id: ${messageId}`});
    })
    .catch(err => {
      console.log("Error: " + err.message);
      return res.status(500).json({error: err.message});
    });
};

//delete message(s) by convo id
MessageController.deleteMessageByConvoId = (req, res) => {
  let remConvoId = req.params.convoid;
  let deleteMessageByConvoIdPromise = MessageModel.deleteMany({convoId : remConvoId}).exec();
  deleteMessageByConvoIdPromise
    .then(messages => {
      return messages
      ? res.status(201).json(messages)
      : res.status(404).json({error: `No messages with convoId: ${remConvoId}`});
    })
    .catch(err => {
      console.log("Error: " + err.message);
      return res.status(500).json({error: err.message});
    });
};

//update message by id
MessageController.updateMessageById = (req, res) => {
  let messageId = req.params.id;
  let updateMessageByIdPromise = MessageModel.findById(messageId).exec();
  updateMessageByIdPromise
    .then(message =>{
      _.extend(message, req.body);
      return message.save();
    })
    .then(message => {
      return res.status(201).json(message);
    })
    .catch(err => {
      return res.status(500).json({error: err.message});
    });
};

module.exports = MessageController;