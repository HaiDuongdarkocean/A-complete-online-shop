function createUserSession(req, user, action) {
    req.session.uid = user._id.toString();
    /** The save method is coming from the express session package, and that package will execute save when we call*/
    req.session.save(action);
}

function destroyUserAuthSession(req) {
    req.session.uid = null;
}

module.exports = {
    createUserSession,
    destroyUserAuthSession,
}