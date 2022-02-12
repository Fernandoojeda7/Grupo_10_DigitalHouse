const express = require('express');
const router = express.Router();
const multer = require('multer');


const productsController = require('../controllers/productsController');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/img/products')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
  })
  
const upload = multer({ storage })


router.get('/', productsController.index); 


router.get('/create', productsController.create); 
router.post('/', upload.single('image'), productsController.store); 



router.get('/productDetail/:id', productsController.productDetail); 


router.get('/edit/:id', productsController.edit); 
router.put('/edit', productsController.update); 



router.delete('/delete/:id', productsController.destroy); 


module.exports = router;
