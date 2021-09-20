const express = require("express");
const Router = express.Router();
const template = require('../lib/template.js')


//route, routing
Router.get('/', (req, res) => {
    let title = 'Welcome';
    let description = 'Hello, Node.js';
    let list = template.list(req.list);
    let html = template.HTML(title, list,
      `<h2>${title}</h2>
      ${description}
      <img src="/img/animal.jpg" style="width:300px; display:block; margin: 10px 0">
      `,
      `
      <a href="/topic/create">create</a>
      `
    );
    res.send(html);
})

module.exports = Router;