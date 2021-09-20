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

app.use((req, res, next) => {
    next();
});

app.get('/mongodb', async (req, res) => {
    await mongoose.connect('mongodb://localhost/voyage', {
        useNewUrlParser: true,
        ignoreUndefined: true
    });

    const { Schema } = mongoose;
    const goodsSchema = new Schema({
        goodsId: {
            type: Number,
            require: true,
            unique: true,
        },
        name:{
            type: String,
            required: true,
            unique: true,
        },
        thumbnailUrl:{
            type: String,
        },
        category:{
            type: String,
        },
        price:{
            type: Number
        }
    })

    let Goods = mongoose.model('Goods', goodsSchema)

    await Goods.create({
        goodsId: 1,
        name: "맛있는 저녁",
        thumbnailUrl: "http://img.etoday.co.kr/pto_db/2019/10/600/20191008103447_1374236_1200_800.jpg",
        category: "food",
        price: 5000
    });

    res.send('ok');
})

app.get('/test', (req, res) => {
  let name = req.query.name;
  res.render('test', {name});
})

app.get('/home', (req, res)=>{
    res.render('index');
})

app.listen(port, ()=>{
    console.log(`listening at http://localhost:${port}`)
})