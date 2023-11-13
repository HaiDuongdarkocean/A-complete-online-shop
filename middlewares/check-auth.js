function checkAuthStatus(req, res, next) {
    const uid = req.session.uid;

    if(!uid) {
        return next();
    }

    // The res.locals object in Express belongs to the template rendering engine.
    // the res.locals object allows you to set variables that will be available globally in all templates rendered by the app.
    res.locals.uid = uid;
    res.locals.isAuth = true;
    res.locals.isAdmin = req.session.isAdmin;
    next();
}

module.exports = checkAuthStatus;