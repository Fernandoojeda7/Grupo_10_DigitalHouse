const express = require('express');
const router = express.Router();
const multer = require('multer');
const { check } = require('express-validator');
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
    check('nombre').notEmpty().withMessage('Obligatorio Nombre y Apellido'),
    check('documento').notEmpty().withMessage('Obligatorio Numero DNI'),
    check('email').isEmail().withMessage('Email debe ser valido'),
    check('fecha').notEmpty().withMessage('Obligatorio Fecha Nacimiento'),
    check('contraseña').isLength({min: 4}).withMessage('Debe contener 4 caracteres')
];

const validatorLogin = [
    check('email').isEmail().withMessage('Email invalido'),
    check('contraseña').isLength({min: 4}).withMessage('')
];




router.get('/login', userController.login);
router.post('/users', validatorLogin, userController.processLogin);

router.get('/register', guestMiddleware, userController.register);
router.post('/register', upload.single('image'), validatorRegistered, userController.registered);

router.get('/users', authMiddleware, userController.users);
router.get('/usersDB', authMiddleware, userController.usersDB);


module.exports = router;
