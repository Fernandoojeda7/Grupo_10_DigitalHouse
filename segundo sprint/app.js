const path = require('path');
const express = require('express');
const app = express();

const publicPath = path.resolve(__dirname, './public');

app.use(express.static(publicPath));


app.listen(3030, ()=> {
    console.log('El servidor esta funcionando en el puerto 3030')
});

app.get('/', (req, res)=> {
    res.sendFile(path.resolve(__dirname, './view/index.html'));
});
app.get('/login', (req, res)=> {
    res.sendFile(path.resolve(__dirname, './view/login.html'));
});
app.get('/productCart', (req, res)=> {
    res.sendFile(path.resolve(__dirname, './view/productCart.html'));
});
app.get('/productDetail', (req, res)=> {
    res.sendFile(path.resolve(__dirname, './view/productDetail.html'));
});
app.get('/register', (req, res)=> {
    res.sendFile(path.resolve(__dirname, './view/register.html'));
});