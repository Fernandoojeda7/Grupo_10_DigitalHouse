const express = require('express');
const router = express.Router();
const apiController = require('../../controllers/api/producto');


router.get('/products', apiController.lista);

router.get('/products/:id', apiController.detalle)

module.exports = router;