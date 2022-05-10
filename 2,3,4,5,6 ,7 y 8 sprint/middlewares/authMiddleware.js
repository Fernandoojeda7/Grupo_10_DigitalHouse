function authMiddleware(req, res, next) {
    if (req.session.provLogin != undefined) {
    next();
} else {
    res.render('registerProveedor');
}
};

module.exports = authMiddleware;