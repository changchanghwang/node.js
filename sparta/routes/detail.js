const express = require('express');
const router = express.Router();

router.get('/', (req, res)=>{
    let name = req.query.goodsId;
    res.render('detail')
})

module.exports = router;