const express = require('express');
const app = express();

app.use(express.static('public'));

app.set('view engine', 'ejs');

app.get('/', (req, res)=> {
    res.render('index');
});
app.get('/login', (req, res)=> {
    res.render('login');
});
app.get('/productCart', (req, res)=> {
    res.render('productCart');
});
app.get('/productDetail', (req, res)=> {
    res.render('productDetail');
});
app.get('/register', (req, res)=> {
    res.render('register');
});

app.listen(3030, ()=> {
    console.log('El servidor esta funcionando en el puerto 3030')
});