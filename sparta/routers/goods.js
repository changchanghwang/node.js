const express = require("express");
const Goods = require("../schemas/goods");
const Cart = require("../schemas/cart");

const router = express.Router();

const cheerio = require("cheerio");
const axios = require("axios");
const iconv = require("iconv-lite");
const url =
  "http://www.yes24.com/24/Category/BestSeller";

  router.get("/goods/add/crawling", async (req, res) => {
    try {
      //크롤링 대상 웹사이트 HTML 가져오기
      await axios({ //셀레니움 느낌
        url: url,
        method: "GET",
        responseType: "arraybuffer",
      }).then(async (html) => {
          //크롤링 코드
        const content = iconv.decode(html.data, "EUC-KR").toString();
        const $ = cheerio.load(content); //bs4느낌
        const list = $("ol li");
  
        await list.each( async (i, tag) => { 
          let desc = $(tag).find("p.copy a").text() 
          let image = $(tag).find("p.image a img").attr("src")
          let title = $(tag).find("p.image a img").attr("alt")
          let price = $(tag).find("p.price strong").text()
        
          if(desc && image && title && price){
            price = price.slice(0,-1).replace(/(,)/g, "")
            let date = new Date()
            let goodsId = date.getTime()
            await Goods.create({
              goodsId:goodsId,
              name:title,
              thumbnailUrl:image,
              category:"도서",
              price:price
            })
          }
    
        });
      })
      res.send({ result: "success", message: "크롤링이 완료 되었습니다." });
  
    } catch (error) {
      //실패 할 경우 코드
      res.send({ result: "fail", message: "크롤링에 문제가 발생했습니다", error:error });
    }
  });

router.get("/goods", async (req, res, next) => {
  try {
    const { category } = req.query;
    console.log(req.query);
    console.log(typeof(req.query));
    const goods = await Goods.find(category ? {category}:undefined).sort("-goodsId");
    res.json({ goods: goods });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.get("/goods/:goodsId", async (req, res) => {
  const { goodsId } = req.params;
  goods = await Goods.findOne({ goodsId: goodsId });
  res.json({ detail: goods });
});

router.post('/goods', async (req, res) => {
  const { goodsId, name, thumbnailUrl, category, price } = req.body;
  console.log(req.body)

  isExist = await Goods.find({ goodsId });
  if (isExist.length == 0) {
    await Goods.create({ goodsId, name, thumbnailUrl, category, price });
  }
  res.send({ result: "success" });
});

router.post("/goods/:goodsId/cart", async (req, res) => {
  const { goodsId } = req.params;
  const { quantity } = req.body;
  console.log(req.body)

  isCart = await Cart.find({ goodsId });
  if (isCart.length) {
    let item = await Cart.findOne({ goodsId })
    let newItemQuantity = Number(item.quantity) + Number(quantity) 
    await Cart.updateOne({ goodsId }, { $set: {quantity: newItemQuantity} });
  } else {
    await Cart.create({ goodsId: goodsId, quantity: quantity });
  }
  res.send({ result: "success" });
});

router.delete('/goods/:goodsId/cart', async (req, res)=>{
  const { goodsId } = req.params;

  const isGoodsInCart = await Cart.find({goodsId});
  if (isGoodsInCart.length>0){
    await Cart.deleteOne({goodsId});
  }

  res.send({ result: "success"});
})

router.patch("/goods/:goodsId/cart", async(req, res)=>{
  const { goodsId } = req.params;
  const { quantity } = req.body;
  console.log(goodsId);
  console.log(quantity);

  const isGoodsInCart = await Cart.find({ goodsId });
  if (isGoodsInCart.length > 0){
    await Cart.updateOne({ goodsId }, {$set: { quantity }})
  }

  res.send({ result: "success" });
})

router.get("/cart", async (req, res) => {
  const cart = await Cart.find({}); //카트에 담긴 데이터 불러옴
  const goodsId = cart.map(cart => cart.goodsId);  //id를 빼옴
  goodsInCart = await Goods.find() 
    .where("goodsId")
    .in(goodsId); //같은 id인 값을 가진 것을 전체목록에서 찾음
  concatCart = cart.map(c => {
    for (let i = 0; i < goodsInCart.length; i++) {
      if (goodsInCart[i].goodsId == c.goodsId) {
        return { quantity: c.quantity, goods: goodsInCart[i] }; //concatCart = 수량과 굿즈 정보
      }
    }
  });
  console.log(concatCart);
  res.json({
    cart: concatCart
  });
});

module.exports = router;