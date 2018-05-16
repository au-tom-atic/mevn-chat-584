const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
var bcrypt = require('bcrypt-nodejs');
const Schema = mongoose.Schema, ObjectId = Schema.ObjectId;

const UserSchema = new Schema({
  
  username: {
    type: String,
    required: true,
    index: {
      unique: true
    }
  },

  password: {
    type: String,
    required: true
  },

  convos: [{
        type: Schema.Types.ObjectId,
        ref: "convo"
    }]
});

UserSchema.pre('save', function (next) {
  var user = this;
  if (this.isModified('password') || this.isNew) {
      bcrypt.genSalt(10, function (err, salt) {
          if (err) {
              return next(err);
          }
          bcrypt.hash(user.password, salt, null, function (err, hash) {
              if (err) {
                  return next(err);
              }
              user.password = hash;
              next();
          });
      });
  } else {
      return next();
  }
});

UserSchema.methods.comparePassword = function (passw, cb) {
  bcrypt.compare(passw, this.password, function (err, isMatch) {
      if (err) {
          return cb(err);
      }
      cb(null, isMatch);
  });
};

module.exports = mongoose.model("user", UserSchema);