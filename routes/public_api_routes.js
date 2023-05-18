const express = require("express");
const route = express.Router();

const UserAuthController = require("../controllers/user_auth_controller");

route.get('/test', (req, res) => { res.send("<h1>GET Request: Public Api</h1>") });
route.post('/register', UserAuthController.register);
route.post('/login', UserAuthController.login);

module.exports = route;