const path = require('path');
const express = require('express');
const app = express();

const publicPath = path.resolve(__dirname, './public');

app.use(express.static(publicPath));
app.set('view engine', 'ejs');

app.listen(3030, ()=> {
    console.log('El servidor esta funcionando en el puerto 3030')
});

app.get('/', (req, res)=> {
    res.render('index')
});

app.get('/login', (req, res)=> {
    res.render('login')
});

app.get('/productCart', (req, res)=> {
    res.render('productCart')
});
app.get('/productDetail', (req, res)=> {
    res.render('productDetail')
});
app.get('/register', (req, res)=> {
    res.render('register')
});