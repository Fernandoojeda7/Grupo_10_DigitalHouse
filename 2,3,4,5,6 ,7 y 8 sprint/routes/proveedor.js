const express = require('express');
const router = express.Router();

const { check } = require('express-validator');

const proveedorController = require('../controllers/proveedorController');

const authMiddleware = require('../middlewares/authMiddleware');
const guestMiddleware = require('../middlewares/guestMiddleware');

const validatorRegistered = [
    check('nombre').notEmpty().withMessage('Obligatorio Nombre'),
    check('apellido').notEmpty().withMessage('Obligatorio Apellido'),
    check('documento').notEmpty().withMessage('Obligatorio Numero DNI'),
    check('direccion').notEmpty().withMessage('Obligatorio Dirección'),
    check('email').isEmail().withMessage('Email debe ser valido'),
    check('contraseña').isLength({min: 4}).withMessage('Debe contener 4 caracteres')
];



const validatorLogin = [
    check('email').isEmail().withMessage('Email invalido'),
    check('contraseña').isLength({min: 4}).withMessage('')
];

router.get('/loginProv', proveedorController.loginProv);
router.post('/create', validatorLogin, proveedorController.processLoginProv);

router.get('/registerProveedor', guestMiddleware, proveedorController.registerProv);
router.post('/registerProveedor', validatorRegistered, proveedorController.registeredProv);

module.exports = router;
