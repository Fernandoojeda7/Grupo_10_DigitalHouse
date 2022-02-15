const express = require('express');
const router = express.Router();
const multer = require('multer');
const { body, check } = require('express-validator');
const userController = require('../controllers/userController');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/img/users')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
  });

const upload = multer({ storage })

const authMiddleware = require('../middlewares/authMiddleware');
const guestMiddleware = require('../middlewares/guestMiddleware');

const validatorRegistered = [
    body('nombre').notEmpty().withMessage('Obligatorio Nombre y Apellido'),
    body('documento').notEmpty().withMessage('Obligatorio Numero DNI'),
    body('email').isEmail().withMessage('Email debe ser valido'),
    body('fecha').notEmpty().withMessage('Obligatorio Fecha Nacimiento'),
    body('contraseña').notEmpty().withMessage('Introdusca una contraseña valida')
];

const validatorLogin = [
    check('email').isEmail().withMessage('Email invalido'),
    check('contraseña').isLength({min: 4}).withMessage('Debe contener 4 caracteres')
];




router.get('/login', userController.login);
router.post('/login', validatorLogin, userController.processLogin);

router.get('/register', userController.register);
router.post('/register', upload.single('image'), userController.registered);

router.get('/users', userController.users);
router.get('/usersDB', userController.usersDB);


module.exports = router;
