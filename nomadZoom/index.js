const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;
require('dotenv').config();
const connect = require('./schemas/index');
connect();

const homeRouter = require('./routes/home');
const userRouter = require('./routes/user')
const signRouter = require('./routers/user')


app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.set('view engine', 'pug');
app.set('views', __dirname+'/views');
app.use(express.static('public'));

app.use("/", homeRouter);
app.use("/user", userRouter);
app.use("/user", [signRouter]);

app.listen(port, ()=>console.log(`app listening localhost:${port}`))