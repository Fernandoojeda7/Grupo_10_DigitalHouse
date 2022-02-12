const express = require('express');
const app = express();

const path = require('path');
const methodOverride = require('method-override');



app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));
app.use(express.static('public'));
app.use(methodOverride('_method'));
app.use(express.json());
app.use(express.urlencoded({ extended: false}));

const mainRouter = require('./routes/main');
const productsRouter = require('./routes/products');
const userRouter = require('./routes/user');

app.use('/', mainRouter);
app.use('/products', productsRouter);
app.use('/user', userRouter);



app.listen(3030, ()=> {
    console.log('El servidor esta funcionando en el puerto 3030')
});