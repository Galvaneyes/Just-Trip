/* globals require module */

const mongoose = require("mongoose");

const Schema = mongoose.Schema;
let hitSchema = new Schema({
    id: {
        type: String,
        unique: true,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    hitDate: {
        type: Date,
        required: true
    },
    characteristics: {
        type: [{
            //hit characteristics
        }],
        required: true
    },
    searchItemType: {
        type: String,
        required: true
    },
    price: {
        type: Number, //something more appropriate
        required: true
    },
    username: {
        type: String,
        required: true
    }
});
mongoose.model("Hit", hitSchema);

module.exports = mongoose.model("Hit");