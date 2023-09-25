const express = require('express');
const db = require('./src/database/init.js')();
const session = require('express-session');
const app = express();
const authRouter = require('./src/routes/auth.router');
const shoppingCartRouter = require('./src/routes/shoppingCart.router');
const productRouter = require('./src/routes/product.router');
const authMiddleware = require('./src/middleware/auth.middleware');
const port = process.env.PORT || 3000;
require('dotenv').config();

app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.set('view engine', 'ejs');
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 60000
    }
}));

app.get('/',(req,res) => {
    res.render('index')
})

// Routers
app.use('/auth', authRouter);
app.use('/product', productRouter);
app.use('/shoppingCart', authMiddleware, shoppingCartRouter);

app.use((req,res) => {
    res.status(404).render('404')
})

app.listen(port, () => {console.log('Server is running on ' + port + ' port.')});