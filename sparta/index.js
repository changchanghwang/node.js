const express = require('express');
const app = express();
const port = 3000;

const mongoose = require('mongoose');
const connect = require('./schemas/index');
connect();

// const goodsRouter = require('./routes/goods');
const userRouter = require('./routes/user');
const homeRouter = require('./routes/home');
const detailRouter = require('./routes/detail');
const goodsRouter = require("./routers/goods");
const cartRouter = require('./routes/cart')

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(express.static('public'));

app.use("/api", [goodsRouter]);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// app.use('/goods', goodsRouter);
// app.use('/user', userRouter);
app.use('/', homeRouter);
app.use('/detail', detailRouter);
app.use('/cart', cartRouter);

app.use((req, res, next) => {
    next();
});

app.get('/test', (req, res) => {
  let name = req.query.name;
  res.render('test', {name});
})

app.get('/home', (req, res)=>{
    res.render('index');
})

app.get('/order', (req, res)=>{
    res.render('order')
})

app.listen(port, ()=>{
    console.log(`listening at http://localhost:${port}`)
})
