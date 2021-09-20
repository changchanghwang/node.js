const express = require('express');
const router = express.Router();

router.get('/login', (req, res, next) => {
    res.send('로그인 페이지')
})
    
router.get('/register', (req, res, next) => {
    res.send('회원가입 페이지')
})
    
module.exports = router;