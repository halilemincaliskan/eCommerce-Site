const express = require('express')
const db = require('./src/database/init.js')();
const app = express()
const mainRouter = require('./src/routes/main.router')
const port = process.env.PORT || 3000;
require('dotenv').config();

app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.set('view engine', 'ejs')
app.locals.baseURL = "localhost:3000"

// app.get('/',(req,res) => {
//     res.render('index')
// })

app.get('/product-details',(req,res) => {
    res.render('product-details')
})

app.use('/user', mainRouter);

app.use((req,res) => {
    res.status(404).render('404')
})

app.listen(port, () => {console.log('Server is running on ' + port + ' port.')});