const express = require('express');
const router = express.Router();
const template = require('../lib/template.js')
const path = require('path');
const fs = require('fs');
const sanitizeHtml = require('sanitize-html');

router.get('/create', (req, res)=>{
    var title = 'WEB - create';
    var list = template.list(req.list);
    var html = template.HTML(title, list, `
      <form action="/topic/create" method="post">
        <p><input type="text" name="title" placeholder="title"></p>
        <p>
          <textarea name="description" placeholder="description"></textarea>
        </p>
        <p>
          <input type="submit">
        </p>
      </form>
    `, '');
    res.send(html);
  });
  
  router.post('/create', (req, res)=>{
    var post = req.body;
    var title = post.title;
    var description = post.description;
    fs.writeFile(`data/${title}`, description, 'utf8', function(err){
      res.redirect(`/topic/${title}`);
    })
    // var body = '';
    //   req.on('data', function(data){
    //     body = body + data;
    //   });
    //   req.on('end', function(){
    //     var post = qs.parse(body);
    //     var title = post.title;
    //     var description = post.description;
    //     fs.writeFile(`data/${title}`, description, 'utf8', function(err){
    //       res.redirect(`/page/${title}`);
    //     })
    // });
  })
  
  router.get('/update/:pageId', (req, res, next)=>{
    var filteredId = path.parse(req.params.pageId).base;
    fs.readFile(`data/${filteredId}`, 'utf8', function(err, description){
      if(err){
        next(err);
      }else{
        var title = req.params.pageId;
        var list = template.list(req.list);
        var html = template.HTML(title, list,
          `
          <form action="/topic/update" method="post">
            <input type="hidden" name="id" value="${title}">
            <p><input type="text" name="title" placeholder="title" value="${title}"></p>
            <p>
              <textarea name="description" placeholder="description">${description}</textarea>
            </p>
            <p>
              <input type="submit">
            </p>
          </form>
          `,
          `<a href="/topic/create">create</a> <a href="/topic/update/${title}">update</a>`
        );
        res.send(html);
      }
    });
  })
  
  router.post('/update', (req, res)=>{
    var post = req.body;
    var id = post.id;
    var title = post.title;
    var description = post.description;
    fs.rename(`data/${id}`, `data/${title}`, function(error){
      fs.writeFile(`data/${title}`, description, 'utf8', function(err){
        res.redirect( `/topic/${title}`)
      })
    })
  })
  
  router.post("/delete_process", (req, res)=>{
    var post = req.body;
    var id = post.id;
    var filteredId = path.parse(id).base;
    fs.unlink(`data/${filteredId}`, function(error){
      res.redirect(`/`); //default 302
    })
  })
  
  //url path기법으로 라우팅
  router.get('/:pageId', (req, res, next) => { // --> /page/:pageId에서 pageId를 객체화한다해야되나
      let filteredId = path.parse(req.params.pageId).base; //req.params.pageId랑 같은데 왜하는지?
      console.log(req.params.pageId);
      console.log(path.parse(req.params.pageId).base); 
      fs.readFile(`data/${filteredId}`, 'utf8', function(err, description){
        if(err){
          next(err);
        }else{
          var title = req.params.pageId;
          var sanitizedTitle = sanitizeHtml(title);
          var sanitizedDescription = sanitizeHtml(description, {
            allowedTags:['h1']
          });
          var list = template.list(req.list);
          var html = template.HTML(sanitizedTitle, list,
            `<h2>${sanitizedTitle}</h2>${sanitizedDescription}`,
            ` <a href="/topic/create">create</a>
              <a href="/topic/update/${sanitizedTitle}">update</a>
              <form action="/topic/delete_process" method="post">
                <input type="hidden" name="id" value="${sanitizedTitle}">
                <input type="submit" value="delete">
              </form>`
          );
          res.send(html)//{"pageId":"HTML"}
        }
      });
  })
  module.exports = router;