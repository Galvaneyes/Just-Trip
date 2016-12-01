/* globals require module */

const mongoose = require("mongoose");

const Schema = mongoose.Schema;
let userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: false
    },
    sex: {
        type: String,
        required: false
    },
    location: {
        type: String,
        required: false
    } //social network account
});
mongoose.model("User", userSchema);

module.exports = mongoose.model("User");