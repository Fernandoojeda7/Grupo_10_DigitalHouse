const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path')

const userController = require('../controllers/userController');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../public/img/users'));
    },
    filename: function (req, file, cb) {
        const newFilename = 'image-' + Date.now() + path.extname(file.originalname);
        cb(null, newFilename)
    }
})

const upload = multer({ storage })


router.get('/login', userController.login);

router.get('/register', userController.register);

router.post('/register', upload.single('image'), userController.registered);

router.get('/users', userController.users)


module.exports = router;
