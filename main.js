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
fdaadfsfasdsdfa
     })
    })
      
  }afdasdf
  }
})


app.listen(3000);