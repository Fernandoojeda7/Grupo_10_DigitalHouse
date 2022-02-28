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
    check('fecha_nacimiento').notEmpty().withMessage('Obligatorio Fecha Nacimiento'),
    check('contraseña').isLength({min: 4}).withMessage('Debe contener 4 caracteres')
];

router.get('/login', userController.login);
router.post('/addProduct', validatorLogin, userController.processLogin);

router.get('/register', guestMiddleware, userController.register);
router.post('/register', upload.single('image'), validatorRegistered, userController.registered);




module.exports = router;
