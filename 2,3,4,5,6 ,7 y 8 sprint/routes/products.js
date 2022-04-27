const express = require('express');
const router = express.Router();
const multer = require('multer');
const { check } = require('express-validator');


const productsController = require('../controllers/productsController');

const authMiddleware = require('../middlewares/authMiddleware');
const guestMiddleware = require('../middlewares/guestMiddleware');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/img/products')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
  })
  
const upload = multer({ storage });

const validatorProducts = [
    check('name').notEmpty().isLength({min: 5}) .withMessage('Obligatorio Nombre'),
    check('price').notEmpty().withMessage('Obligatorio Precio'),
    check('category').notEmpty().withMessage('Obligatorio categoria'),
    check('type').notEmpty().withMessage('Obligatorio un Tipo'),
    check('description').notEmpty().isLength({min: 20}).withMessage('Descripción minima 20 caracteres')
];

router.get('/', productsController.index);

router.get('/search', productsController.search) 


router.get('/create', productsController.add); 
router.post('/', upload.single('image'), validatorProducts, productsController.create); 



router.get('/productDetail/:id', productsController.productDetail); 

router.get('/carrito', productsController.productCarrito);


router.get('/edit/:id', productsController.edit); 
router.put('/edit/:id', validatorProducts, productsController.update); 



router.delete('/delete/:id', productsController.destroy); 


module.exports = router;
