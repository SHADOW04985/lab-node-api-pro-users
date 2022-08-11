const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    age: Number,
    id: Number,
    squad: Number,
})

const User = mongoose.model("user", UserSchema) 
module.exports = {User}