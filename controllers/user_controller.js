const User = require("../models/user");
const Middleware = require("../middleware/middleware");

class UserController
{

    static async index(req, res)
    {
        const userId = Middleware.getUserId(req);
        const user = await User.findById(userId);
        res.send(user);
    }
}

module.exports = UserController;