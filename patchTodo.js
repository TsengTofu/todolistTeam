const errHandle = require('./errorHandle');
const headers = {
 'Access-Control-Allow-Headers': 'Content-Type, Authorization, Content-Length, X-Requested-With',
 'Access-Control-Allow-Origin': '*',
 'Access-Control-Allow-Methods': 'PATCH, POST, GET, OPTIONS, DELETE',
 'Content-Type': 'application/json'
}

function patchTodo(res, req, todos) {
 req.on('end', () => {
  try {
   const todo = JSON.parse(body).title;
   const id = req.url.split('/').pop();
   const index = todos.findIndex(el => el.id == id);
   // 檢查title是否有值, todo ID是否存在 -1代表不存在
   if (todo !== undefined && id !== -1) {
    todos[index].title = todo;
    res.writeHead(200, headers);
    res.write(JSON.stringify({
     'status': 'scuess',
     'data': todos,
    }));
    res.end();
   } else {
    errHandle(res);
   }
   res.end();
  } catch {
   errHandle(res);
  }
 });
}
module.exports = patchTodo;
