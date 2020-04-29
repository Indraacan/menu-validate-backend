const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Bcrypt = require("bcrypt");
const saltRounds = 6;
// const passwordValidator = require("password-validator");

const userSchema = new Schema({
    fullname : {
        type : String,
        required : true,
    },
    email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    
  },
});

userSchema.pre("save", function (next) {
  this.password = Bcrypt.hashSync(this.password, saltRounds);
  next();
});
module.exports = mongoose.model("User", userSchema);