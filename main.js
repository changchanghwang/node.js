const express = require('express');
const app = express();
const port = 3000;
const fs = require('fs');
const bodyParser = require('body-parser'); //express 4.16버전 기준 내장
const template = require('./lib/template.js')
const path = require('path');
const sanitizeHtml = require('sanitize-html');
const qs = require('querystring');
const compression = require('compression');
const indexRouter = require('./routes/index');
const topicRouter = require('./routes/topic');
const helmet = require('heelmet');

app.use(helmet());

//middleWare
app.use(express.static('public'));
app.use(express.urlencoded({ extended:false })); //form data요청은 이렇게 처리
// app.use(express.json); //json 요청
app.use(compression());
app.get('*',(req, res, next)=>{
  fs.readdir('./data', (error, filelist) =>{
    req.list= filelist;
    next();
  })
})

app.get('/', indexRouter);
app.use('/topic', topicRouter);


app.listen(port, () => {
  console.log(`Hello World! http://localhost:${port}`)
})

app.use((req, res, next)=>{
  res.status(404).send('Sorry cant find that!')
})

app.use((err, req, res, next)=>{ //4개를 인자로 가지고있으면 에러핸들링 미들웨어.
  console.error(err.stack);
  res.status(500).send('Something broke!');
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
