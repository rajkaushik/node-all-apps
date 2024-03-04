const express = require('express');
const blogController = require('../controllers/blogController');
const {VerifyTokenMiddleware} = require('../auth/jwt')

const blogRouter = express.Router();

blogRouter.post('/blog', VerifyTokenMiddleware,  blogController.AddBlog);
blogRouter.put('/blog', VerifyTokenMiddleware, blogController.UpdateBlog);
blogRouter.delete('/blog', VerifyTokenMiddleware,  blogController.DeleteBlog);


module.exports = {blogRouter};