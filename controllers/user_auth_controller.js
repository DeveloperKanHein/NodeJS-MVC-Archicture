const bcrypt = require('bcrypt');
const Middleware = require("../middleware/middleware");
const User = require("../models/user");

class UserAuthController
{
    static async register(req, res)
    {
        const checkUser = await User.findOne({ email: req.body.email });
        if(checkUser){
            res.status(200).json({ status: "fail", message: "This email is already registered.",user: null, token: null});
        }else{
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(req.body.password, salt);
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: hash
            });
            const isSave = await newUser.save();
            if(isSave){
                const user = await User.findOne({ email: req.body.email });
                if(user){
                    const token = Middleware.generateUserToken(user);
                    res.status(200).json({ status: "success", message: "Register Successful", user: user, token: token});
                }else{
                    res.status(200).json({ status: "fail", message: "Register Error!", user: null, token: null});
                }
            }
        }
    }

    static async login(req, res)
    {
        const existedUser = await User.findOne({ email: req.body.email });
        if(existedUser){
            const checkPassword = bcrypt.compareSync(req.body.password, existedUser.password);
            if(checkPassword){
                const token = Middleware.generateUserToken(existedUser);
                res.status(200).json({ status: "success", message: "Login Successful",user: existedUser, token: token});
            }else{
                res.status(200).json({ status: "fail", message: "Password is invalid!", user: null, token: null});
            }
        }else{
            res.status(200).json({ status: "fail", message: "User does not exist!", user: null, token: null});
        }
    }
}

module.exports = UserAuthController;