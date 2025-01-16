const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
   firstname: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 12,
      required: true,
   },
   lastname: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 12,
      required: true,
   },
   username: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 12,
      required: true,
   },
   password: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 12,
      required: true,
   },
});

const AccountSchema = new mongoose.Schema({
   userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
   },
   balance: {
      type: Number,
      required: true,
   },
});

const Account = mongoose.model("Account", AccountSchema);
const User = mongoose.model("User", UserSchema);

module.exports = { User, Account };
