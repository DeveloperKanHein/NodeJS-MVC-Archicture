const express = require("express");
const route = express.Router();

const UserController = require("../controllers/user_controller");
const BlogController = require("../controllers/blog_controller");

route.get('/test', (req, res) => { res.send("<h1>Authorized API Route Success</h1>") });

route.get('/user', UserController.index);

route.get('/blogs', BlogController.all);
route.post('/blog', BlogController.store);
route.put('/blog/:id', BlogController.update);
route.delete('/blog/:id', BlogController.delete);

module.exports = route;