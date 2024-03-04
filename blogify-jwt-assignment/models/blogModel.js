const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    "title": String,
    "author": String,
    "content": String,
    "_id": String,
})


module.exports = mongoose.model('Blog', blogSchema, 'blogs')