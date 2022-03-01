function authMiddleware(req, res, next) {
    if (req.session.userLogin != undefined) {
    next();
} else {
    res.send('Esta página es solo para registrados');
}
};

module.exports = authMiddleware;