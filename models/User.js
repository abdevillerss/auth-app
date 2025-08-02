const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        uniqe: true,
        trim: true
    },email:{
        type: String,
        required: true,
        uniqe: true,
        lowercase: true,
    },password:{
        type: String,
        required: true
    },role:{
        type: String,
        enum:["user","admin"],
        default: "user"
    }
},{timestamp: true})

module.exports = mongoose.model("User",UserSchema);
