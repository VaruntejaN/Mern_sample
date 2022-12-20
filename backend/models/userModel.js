const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter your name"]
    },
    email: {
        type: String,
        required: [true, "Please enter your mailId"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Please enter a password"]
    }
})

module.exports = mongoose.model("User", userSchema);