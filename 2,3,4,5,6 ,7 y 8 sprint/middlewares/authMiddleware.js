function authMiddleware(req, res, next) {
    if (req.session.provLogin != undefined) {
    next();
} else {
    res.send('Esta página es solo para proveedores');
}
};

module.exports = authMiddleware;