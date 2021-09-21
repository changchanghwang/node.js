const jwt = require('jsonwebtoken');

//access token을 secret key 기반으로생성
const generateAccessToken =(id) =>{
    return jwt.sign({id}, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "10m"
    });
};

//refresh token을 secret key 기반으로생성
const generateRefreshToken = (id) =>{
    return jwt.sign({id}, process.env.REFRESH_TOKEN_SECRET,{
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


module.exports = jwt;