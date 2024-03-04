const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    _id: String,
})

module.exports = mongoose.model('User', userSchema, 'Users');