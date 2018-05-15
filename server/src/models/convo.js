const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;
ObjectId = Schema.ObjectId

const convoSchema = new Schema({
  
  convoId:{
    type: ObjectId
  },

  users: [{
    type: Schema.Types.ObjectId,
    ref: "user"
  }]

});

module.exports = mongoose.model("convo", ConvoSchema);