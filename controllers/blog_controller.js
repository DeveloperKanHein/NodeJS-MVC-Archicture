const ReturnMessage = require("../constants/return_message");
const Blog = require("../models/blog");
const Middleware = require("../middleware/middleware");

class BlogController
{
    static async all(req, res)
    {
        const blogs = await Blog.find();
        res.send(blogs);
    }

    static async store(req, res)
    {
        const userId = Middleware.getUserId(req);
        const blog = new Blog({
            user: userId,
            title: req.body.title,
            description: req.body.description,
        });

        const isSave = await blog.save();
        if(isSave)
        {
            res.status(200).json(ReturnMessage.success());
        }else
        {
            res.status(200).json(ReturnMessage.fail());
        }
    }

    static async update(req, res)
    {
        const blog = await Blog.findById(req.params.id);
        blog.title = req.body.title;
        blog.description = req.body.description;
        const isSave = await blog.save();
        if(isSave)
        {
            res.status(200).json(ReturnMessage.success());
        }else
        {
            res.status(200).json(ReturnMessage.fail());
        }
    }

    static async delete(req, res)
    {
        const isDelete = await Blog.deleteOne({ id: req.param.id });
        if(isDelete)
        {
            res.status(200).json(ReturnMessage.success());
        }else
        {
            res.status(200).json(ReturnMessage.fail());
        }
    }
}

module.exports = BlogController;