const express = require('express');
const app = express();
const session = require('express-session');
const cookieParser = require('cookie-parser');
const path = require('path');
const methodOverride = require('method-override');

const mainRouter = require('./routes/main');
const productsRouter = require('./routes/products');
const userRouter = require('./routes/user');
const logMiddleware = require('./middlewares/logMiddleware');
const recordMiddleware = require('./middlewares/recordMiddleware');


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

app.use(logMiddleware);

app.use(express.static('public'));
app.use(methodOverride('_method'));
app.use(express.json());
app.use(express.urlencoded({ extended: false}));
app.use(cookieParser());
app.use(session({secret: 'SECRETO'}));
app.use(recordMiddleware);




app.use('/', mainRouter);
app.use('/products', productsRouter);
app.use('/user', userRouter);




app.listen(3030, ()=> {
    console.log('El servidor esta funcionando en el puerto 3030')
});