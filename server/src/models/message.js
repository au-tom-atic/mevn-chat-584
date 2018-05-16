const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;
ObjectId = Schema.ObjectId

const MessageSchema = new Schema({
  
  convoId: {
    type: Schema.Types.ObjectId,
    ref: "convo"
  },

  text: {
    type: String,
    required: true
  },

  sender: {
    type: Schema.Types.ObjectId,
    ref: "user"
  },

  date: {
    type: Date,
    default: Date.now
  }

});

module.exports = mongoose.model("message", MessageSchema);