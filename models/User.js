const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    //first_name, last_name, email, password
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
}, {timestamps: true})

const User = mongoose.model('User', UserSchema);
module.exports = User;