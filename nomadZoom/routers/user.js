const express = require('express');
const users = require('../schemas/users');
const router = express.Router();
const jwt = require('jsonwebtoken');

//access token을 secret key 기반으로생성
const generateAccessToken =(id) =>{
    return jwt.sign({id}, process.env.ACCESS_TOKEN_SECRET,{
        algorithm: 'HS256',
        expiresIn: "1m"
    });
};

//refresh token을 secret key 기반으로생성
const generateRefreshToken = (id) =>{
    return jwt.sign({id}, process.env.REFRESH_TOKEN_SECRET,{
        algorithm: 'HS256',
        expiresIn:"180 days"
    });
};

//access token의 유효성 검사
const authenticateAccessToken =(req, res, next) =>{
    let authHeader = req.headers['authoriztation'];
    let token = authHeader && authHeader.splt(" ")[1];

    if(!token){
        console.log("wrong token format or token is not sended");
        return res.sendStatus(400);
    }

    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET, (error,user)=>{
        if(error){
            console.log(error);
            return res.sendStatus(403);
        }

        req.user = user;
        next();
    })
}


router.post('/checkDup', async(req,res)=>{
    const { id } = req.body;
    console.log(req.body);
    let isExist = await users.find({id});
    if (isExist.length == 0){
        res.send({result: "pass"})
    }else{
        res.send({result: "warn"})
    }
})



router.post('/signup', async(req,res)=>{
    const {id, pw} = req.body;
    let isExist = await users.find({id, pw});
    console.log(isExist);
    if (isExist.length == 0){
        users.create({id,pw});
        res.send({result:"success"});
    }else{
        res.send({result:"dup"})
    }
})

router.post('/login', async(req,res)=>{
    const {id} = req.body;
    console.log(id)
    let isExist = await users.find({id});
    if(isExist.length >0){
        let accessToken = generateAccessToken(id);
        let refreshToken = generateRefreshToken(id)

        res.json({result:"success",accessToken,refreshToken});
    }
})

router.post('/refresh',async(req,res)=>{
    let refreshToken = req.body.refreshToken;
    if(!refreshToken) return res.sendStatus(401);

    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (error, id)=>{
            if(error) return res.sendStatus(403);

            const accessToken = generateAccessToken(id);

            res.json({accessToken})
        }
    )
})

module.exports = router;