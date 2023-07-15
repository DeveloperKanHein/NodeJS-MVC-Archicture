class WebAuthMiddleware
{
    static check(req, res, next)
    {
        if(req.session.auth){
            res.locals.username = req.session.username;
            next();
        }else{
            // return res.sendStatus(401);
            return res.redirect('/private/admin/login');
        }
    }
}

module.exports = WebAuthMiddleware;