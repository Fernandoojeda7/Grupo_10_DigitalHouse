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

// app.get('/', (req, res)=> {
//     res.render('index');
// });
// app.get('/login', (req, res)=> {
//     res.render('login');
// });
// app.get('/productCart', (req, res)=> {
//     res.render('productCart');
// });
// app.get('/productDetail', (req, res)=> {
//     res.render('productDetail');
// });
// app.get('/register', (req, res)=> {
//     res.render('register');
// });
// app.get('/agregarProd', (req, res)=> {
//     res.render('agregarProd');
// });
// app.get('/editarProd', (req, res)=> {
//     res.render('editarProd');
// });

app.listen(3030, ()=> {
    console.log('El servidor esta funcionando en el puerto 3030')
});