function deleteTodo(req, res, todos) {
  const headers = {};
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
  } else if (index === -1) {
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
    errHandle(res);
  }
}

module.exports = deleteTodo;
