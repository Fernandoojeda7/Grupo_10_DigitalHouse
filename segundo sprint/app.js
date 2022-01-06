const path = require('path');
const express = require('express');
const app = express();

const publicPath = path.resolve(__dirname, './public');

app.use(express.static(publicPath));
<<<<<<< HEAD

app.set('view engine', 'ejs')
=======
app.set('view engine', 'ejs');
>>>>>>> 6bf6b59286dc9fd3e176e6b7cda83c1299abcc44

app.listen(3030, ()=> {
    console.log('El servidor esta funcionando en el puerto 3030')
});

app.get('/', (req, res)=> {
<<<<<<< HEAD
    res.render('index');
=======
    res.render('index')
>>>>>>> 6bf6b59286dc9fd3e176e6b7cda83c1299abcc44
});

app.get('/login', (req, res)=> {
<<<<<<< HEAD
    res.render('login');
=======
    res.render('login')
>>>>>>> 6bf6b59286dc9fd3e176e6b7cda83c1299abcc44
});

app.get('/productCart', (req, res)=> {
<<<<<<< HEAD
    res.render('productCart');
});
app.get('/productDetail', (req, res)=> {
    res.render('productDetail');
});
app.get('/register', (req, res)=> {
    res.render('register');
=======
    res.render('productCart')
});
app.get('/productDetail', (req, res)=> {
    res.render('productDetail')
});
app.get('/register', (req, res)=> {
    res.render('register')
>>>>>>> 6bf6b59286dc9fd3e176e6b7cda83c1299abcc44
});