const express = require('express');
const router = express.Router();
const apiController = require('../../controllers/api/usuario');


router.get('/users', apiController.lista);
router.get('/users/:id', apiController.detalle)

module.exports = router;