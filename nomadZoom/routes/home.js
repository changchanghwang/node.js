const express = require('express');
const router =  express.Router();
const jwt = require('jsonwebtoken')
const users = require('../schemas/users');

router.get('/', (req,res)=>{
    const cookie = req.cookies;
    try{
        const Atoken = jwt.verify(cookie.accessToken, process.env.ACCESS_TOKEN_SECRET);
        const Rtoken = jwt.verify(cookie.refreshToken, process.env.REFRESH_TOKEN_SECRET);
        console.log(Atoken)
        let isExist = users.find(Atoken.id);        
        res.render('index', {
            token : Atoken.id
        });
    }catch (TokenExpiredError){
        console.error(TokenExpiredError)
        res.render('index')
    }
    // const Atoken = jwt.verify(cookie.accessToken, process.env.ACCESS_TOKEN_SECRET);
    // const Rtoken = jwt.verify(cookie.refreshToken, process.env.REFRESH_TOKEN_SECRET);
    // console.log(Atoken)
    // let isExist = users.find(Atoken.id);        
    // res.render('index', {
    //     token : Atoken.id
    // });

    // finally{
    //     res.render('index')
    // }
});
module.exports = router;