const blogService = require('../services/blogService');

const AddBlog = async (req, res) => {
    try {
        await blogService.AddBlog(req.body);
        res.send({status: 200, message: "New Blog added successfully"});
    } catch(err){
        res.send({status: 404, message: err.message});
    }
}

const UpdateBlog = async (req, res) => {
    try {
        await blogService.UpdateBlog(req.body.title, req.body);
        res.send({status: 200, message: "Blog updated successfully"});
    } catch(error){
        res.send({status: 404, message: error.message});
    }
}

const DeleteBlog = async (req, res) => {
    try {
        await blogService.DeleteBlog(req.body.title);
        res.send({status: 200, message: "New Blog deleted successfully"});
    } catch(err){
        res.send({status: 404, message: err.message});
    }
}


module.exports = {AddBlog, UpdateBlog, DeleteBlog};