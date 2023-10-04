function createUserSession(req, user, action) {
    req.session.uid = user._id.toString();
    /** The save method is coming from the express session package, and that package will execute save when we call*/
    req.session.save(action);
}

module.exports = {
    createUserSession,
}