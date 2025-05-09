
const { getUser } = require('../service/auth');

async function OnlyLoggedIn(req, res, next) {

    const userUid = req.cookies.uid;
    const user = getUser(userUid);
    
    if (user) {
        req.user = user;
        return next();
    }
    return res.redirect('/user/login');
}

module.exports = {
    OnlyLoggedIn
}