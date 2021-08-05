var http = require('http');
var fs = require('fs');
var url = require('url');

function templateHTML(title, list, body){
  return `
    <!doctype html>
      <html>
        <head>
          <title>WEB1 - ${title}</title>
          <meta charset="utf-8">
        </head>
        <body>
          <h1><a href="/">WEB</a></h1>
          <body>
          </body>
          ${list}
          ${body}
        </body>
      </html>
  `;
}
function templateList(filelist){
  var list ='<ul>'
      for(i=0; i<filelist.length; i++){
        list +=`<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`
      }
  list = list+'</ul>';
  return list;
}

var app = http.createServer(function(request,response){
  var _url = request.url;
  var queryData = url.parse(_url, true).query;
  var pathname = url.parse(_url, true).pathname;
  var title = queryData.id;
  if(pathname ==='/'){
    
    fs.readdir('./data', function(err, filelist){
      fs.readFile(`data/${queryData.id}`, 'utf8', function(err, description){
        if(title === undefined){
          title = 'Welcome';
          description = 'Hello Node.js';
        }
        var list = templateList(filelist)
        var template = templateHTML(title, list, `<h2>${title}</h2>${description}`);
        response.writeHead(200);
        response.end(template);
     })
    })
      
  }afdasdf
  }
})


app.listen(3000);