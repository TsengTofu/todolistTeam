const errorHandle = require("./errorHandle");
const headers = {
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, Content-Length, X-Requested-With',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'PATCH, POST, GET,OPTIONS,DELETE',
  'Content-Type': 'application/json'
}

function deleteTodo(req, res, todos) {
  const id = req.url.split('/').pop();
  const index = todos.findIndex((element) => element.id === id);

  if (index !== -1) {
    todos.splice(index, 1);
    res.writeHead(200, headers);
    res.write(
      JSON.stringify({
        status: 'success',
        data: todos,
      })
    );
    res.end();
  } else if (index === -1 && req.url === '/todos') {
    todos.length = 0;
    res.writeHead(200, headers);
    res.write(
      JSON.stringify({
        status: 'success',
        data: todos,
      })
    );
    res.end();
  } else {
    errorHandle(res);
  }
}

module.exports = deleteTodo;
