var jwt = require('jsonwebtoken');

class Middleware {
    static adminSecret = "I am Admin.";
    static userSecret = "I am User.";

    static checkAdmin(req, res, next) {
        const secret = process.env.ADMIN_SECRET;
        const authHeader = req.headers["authorization"];
        if (!authHeader) return res.sendStatus(401);
        const [type, token] = authHeader.split(" ");
        if (type !== "Bearer") return res.sendStatus(401);
        jwt.verify(token, Middleware.adminSecret, function (err, data) {
            if (err) return res.sendStatus(401);
            else next();
        });
    }

    static checkUser(req, res, next) {
        const secret = process.env.USER_SECRET;
        const authHeader = req.headers["authorization"];
        if (!authHeader) return res.sendStatus(401);
        const [type, token] = authHeader.split(" ");
        if (type !== "Bearer") return res.sendStatus(401);
        jwt.verify(token, Middleware.userSecret, function (err, data) {
            if (err) return res.sendStatus(401);
            else next();
        });
    }
    
    static getUserId(req){
        const authHeader = req.headers["authorization"];
        const [type, token] = authHeader.split(" ");
        const user = jwt.verify(token, Middleware.userSecret);
        return user._id;
    }
    
    static generateAdminToken(admin){
        var token = jwt.sign(JSON.stringify(admin), Middleware.adminSecret);
        return token;
    }

    static generateUserToken(user){
        var token = jwt.sign(JSON.stringify(user), Middleware.userSecret);
        return token;
    }
}

module.exports = Middleware;
