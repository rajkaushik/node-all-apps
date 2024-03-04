const { v4: uuidv4 } = require('uuid');
const Blog = require('../models/blogModel');

const FindBlog = async (title) => {
    return await Blog.findOne({title: title});
}

const AddBlog = async (blog) => {
    let newBlog = new Blog({
        title: blog.title,
        author: blog.author,
        content: blog.content,
        _id: uuidv4(),
    })
    return await newBlog.save();    
}

const UpdateBlog = async (title, blog) => {
    await Blog.updateOne({
        title: title
    },
    {
        title: blog.title,
        author: blog.author,
        content: blog.content,
    })
}

const DeleteBlog = async (title) => {
    await Blog.deleteOne({title: title});
}

module.exports = {AddBlog, FindBlog, UpdateBlog, DeleteBlog};