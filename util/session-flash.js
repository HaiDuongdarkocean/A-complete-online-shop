function getSessionData(req) {
    const sessionData = req.session.flashedData;

    req.session.flashedData = null;

    console.log(sessionData)
    return sessionData;
}

function flashDataSession(req, data, action) {
    req.session.flashedData = data;
    req.session.save(action);
}

module.exports = {
    getSessionData,
    flashDataSession
}