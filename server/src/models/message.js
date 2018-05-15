const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;
ObjectId = Schema.ObjectId

const messageSchema = new Schema({
  
  convoId:{
    type: Schema.Types.ObjectId,
    ref: "convo"
  },

  sender:{
    type: Schema.Types.ObjectId,
    ref: "user"
  }

});

module.exports = mongoose.model("message", MessageSchema);