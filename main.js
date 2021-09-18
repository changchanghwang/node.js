const express = require('express')
const app = express()
const port = 3000
const fs = require('fs');
const template = require('./lib/template.js')
const path = require('path');
const sanitizeHtml = require('sanitize-html');
const qs = require('querystring');

//route, routing
app.get('/', (req, res) => {
  fs.readdir('./data', (error, filelist) =>{
    let title = 'Welcome';
    let description = 'Hello, Node.js';
    let list = template.list(filelist);
    let html = template.HTML(title, list,
      `<h2>${title}</h2>
      ${description}`,
      `<a href="/create">create</a>`
    );
    res.send(html);
  });
})

//url path기법으로 라우팅
app.get('/page/:pageId', (req, res) => { // --> /page/:pageId에서 pageId를 객체화한다해야되나
  fs.readdir('./data', function(error, filelist){
    let filteredId = path.parse(req.params.pageId).base; //req.params.pageId랑 같은데 왜하는지?
    console.log(req.params.pageId);
    console.log(path.parse(req.params.pageId).base); 
    fs.readFile(`data/${filteredId}`, 'utf8', function(err, description){
      var title = req.params.pageId;
      var sanitizedTitle = sanitizeHtml(title);
      var sanitizedDescription = sanitizeHtml(description, {
        allowedTags:['h1']
      });
      var list = template.list(filelist);
      var html = template.HTML(sanitizedTitle, list,
        `<h2>${sanitizedTitle}</h2>${sanitizedDescription}`,
        ` <a href="/create">create</a>
          <a href="/update/${sanitizedTitle}">update</a>
          <form action="/delete_process" method="post">
            <input type="hidden" name="id" value="${sanitizedTitle}">
            <input type="submit" value="delete">
          </form>`
      );
      res.send(html)//{"pageId":"HTML"}
    });
  });
})

app.get('/create', (req, res)=>{
  fs.readdir('./data', function(error, filelist){
    var title = 'WEB - create';
    var list = template.list(filelist);
    var html = template.HTML(title, list, `
      <form action="/create" method="post">
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
});

app.post('/create', (req, res)=>{
  var body = '';
    req.on('data', function(data){
        body = body + data;
    });
    req.on('end', function(){
        var post = qs.parse(body);
        var title = post.title;
        var description = post.description;
        fs.writeFile(`data/${title}`, description, 'utf8', function(err){
          res.redirect(`/page/${title}`);
        })
    });
})

app.get('/update/:pageId', (req, res)=>{
  fs.readdir('./data', function(error, filelist){
    var filteredId = path.parse(req.params.pageId).base;
    fs.readFile(`data/${filteredId}`, 'utf8', function(err, description){
      var title = req.params.pageId;
      var list = template.list(filelist);
      var html = template.HTML(title, list,
        `
        <form action="/update" method="post">
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
        `<a href="/create">create</a> <a href="/update/${title}">update</a>`
      );
      res.send(html);
    });
  });
})

app.post('/update', (req, res)=>{
  var body = '';
    req.on('data', function(data){
        body = body + data;
    });
    req.on('end', function(){
        var post = qs.parse(body);
        var id = post.id;
        var title = post.title;
        var description = post.description;
        fs.rename(`data/${id}`, `data/${title}`, function(error){
          fs.writeFile(`data/${title}`, description, 'utf8', function(err){
            res.writeHead(302, {Location: `/page/${title}`});
            res.end();
        })
      });
  });
})

app.post("/delete_process", (req, res)=>{
  var body = '';
    req.on('data', function(data){
      body = body + data;
    });
    req.on('end', function(){
      var post = qs.parse(body);
      var id = post.id;
      var filteredId = path.parse(id).base;
      fs.unlink(`data/${filteredId}`, function(error){
        res.redirect(`/`); //default 302
      })
  });
})

app.listen(port, () => {
  console.log(`Hello World! http://localhost:${port}`)
})


  
// var http = require('http');
// var fs = require('fs');
// var url = require('url');
// var qs = require('querystring');
// var template = require('./lib/template.js');
// var path = require('path');
// var sanitizeHtml = require('sanitize-html');

// var app = http.createServer(function(request,response){
//   var _url = request.url;
//   var queryData = url.parse(_url, true).query;
//   var pathname = url.parse(_url, true).pathname;
//   if(pathname === '/'){
//     if(queryData.id === undefined){
//     } else {
//       
//     }
//   } else if(pathname === '/create'){
//     
//   } else if(pathname === '/create_process'){
//     
//   } else if(pathname === '/update'){
//     
//   } else if(pathname === '/update_process'){
//     
//   } else if(pathname === '/delete_process'){
//     
//   } else {
//     response.writeHead(404);
//     response.end('Not found');
//   }
// });
// app.listen(3000);


//nodejs+mysql 수업

// var http = require('http');
// var url = require('url');
// var topic = require('./lib/topic');
// var author = require('./lib/author');


// var app = http.createServer(function(request,response){
//     var _url = request.url;
//     var queryData = url.parse(_url, true).query;
//     var pathname = url.parse(_url, true).pathname;
//     if(pathname === '/'){
//       if(queryData.id === undefined){
//         topic.home(request, response);
//       } else {
//         topic.page(request, response);
//       }
//     } else if(pathname === '/create'){
//       topic.create(request,response);
//     } else if(pathname === '/create_process'){
//       topic.create_process(request, response);
//     } else if(pathname === '/update'){
//       topic.update(request, response);
//     } else if(pathname === '/update_process'){
//       topic.update_process(request, response);
//     } else if(pathname === '/delete_process'){
//       topic.delete(request, response);
//     } else if(pathname === '/author'){
//       author.index(request, response);
//     } else if(pathname === '/author/create_process'){
//       author.create_process(request,response);
//     } else if(pathname === '/author/update'){
//       author.update(request,response);
//     } else if(pathname === '/author/update_process'){
//       author.update_process(request,response);
//     } else if(pathname === '/author/delete_process'){
//       author.delete(request,response);
//     }
    
    
//     else {
//       response.writeHead(404);
//       response.end('Not found');
//     }
// });
// app.listen(3000);
