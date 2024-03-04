const blogRepository = require('../repository/blogRepository');

const AddBlog = async (blog) => {
    let result = await blogRepository.FindBlog(blog.title);
    if(result == null){
        await blogRepository.AddBlog(blog);
    } else {
        throw Error(`Blog with title - ${blog.title} already exits`);
    }
}

const UpdateBlog = async (title, blog) => {
    let result = await blogRepository.FindBlog(title);
    if(result !== null){
        await blogRepository.UpdateBlog(title, blog);
    } else {
        throw Error(`Blog with title - ${blog.title} does not exits`);
    }
}

const DeleteBlog = async (title) => {
    let result = await blogRepository.FindBlog(title);
    if(result !== null) {
        await blogRepository.DeleteBlog(title);
    } else {
        throw Error(`Blog with title ${title} does not exits to delete`);
    }
}

module.exports = {AddBlog, UpdateBlog, DeleteBlog};