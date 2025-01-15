const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
     firstname: {
        type: String,
        required:true,
        minlength: 6,
        maxlength: 12
     },
     lastname: {
        type: String,
        required:true,
        minlength: 6,
        maxlength: 12
     },
     username: {
        type: String,
        required:true,
        minlength: 6,
        maxlength: 12
     },
     password: {
        type: String,
        required:true,
        minlength: 6,
        maxlength: 12
     },
})

const User = mongoose.model("User", UserSchema)

module.exports = User