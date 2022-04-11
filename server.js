const http = require('http');
const { v4: uuidv4 } = require('uuid');
const errHandle = require('./errorHandle');
const getTodo = require('./getTodo');
const postTodo = require('./postTodo');
const deleteTodo = require('./deleteTodo');
const patchTodo = require('./patchTodo');
const todos = [];

const requestListener = (req, res) => {
    const headers = {
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, Content-Length, X-Requested-With',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'PATCH, POST, GET,OPTIONS,DELETE',
        'Content-Type': 'application/json'
    }
    let body = "";

    req.on('data', chunk => {
        body += chunk;
    })

    if (req.url == "/todos" && req.method == "GET") {
        res.writeHead(200, headers);
        res.write(JSON.stringify({
            'status': 'scuess',
            'data': todos,
        }));
        res.end();
        // getTodo.js
    } else if (req.url == "/todos" && req.method == "POST") {
        req.on('end', () => { // 確保body有資料
            // try catch 檢查是否為物件格式, 但有可能是物件格式但key不是title 如: {'qq': title}
            try {
             const title = JSON.parse(body).title;
             if (title !== undefined) {
              const todo = {
               "title": title,
               "id": uuid4()
              };
              todos.push(todo);
              res.writeHead(200, headers);
              res.write(JSON.stringify({
               'status': 'scuess',
               'data': todos,
              }));
              res.end();
             } else {
              errHandle(res);
             }
            } catch (error) {
             errHandle(res);
            }
           });
        // postTodo.js
    } else if (req.url == "/todos" && req.method == "DELETE") {
        // deleteTodo.js
    } else if (req.url.startsWith("/todos/") && req.method == "DELETE") {
        // deleteTodo.js
    } else if (req.url.startsWith("/todos/") && req.method == "PATCH") {
        // patchTodo.js
        patchTodo(res, req, todos);
    } else if (req.method == "OPTIONS") {
        res.writeHead(200, headers);
        res.end();
    } else {
        res.writeHead(404, headers);
        res.write(JSON.stringify({
            "status": "false",
            "message": "無此網站路由"
        }));
        res.end();
    }
}

const server = http.createServer(requestListener);
server.listen(process.env.PORT || 3005);