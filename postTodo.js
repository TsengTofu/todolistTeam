const { v4: uuidv4 } = require("uuid");
const errorHandler = require("./errorHandle");
const headers = {
  "Access-Control-Allow-Headers":
    "Content-Type, Authorization, Content-Length, X-Requested-With",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "PATCH, POST, GET,OPTIONS,DELETE",
  "Content-Type": "application/json",
};

/** 新增單筆代辦
 * @param data requestListener 資訊與清單物件
 */
const postTodo = (data) => {
  const { req, res, todos } = data;
  let body = "";

  req.on("data", (chunk) => {
    body += chunk;
  });

  req.on("end", () => {
    try {
      const title = JSON.parse(body)?.title;
      if (title != null) {
        const todo = {
          title,
          id: uuidv4(),
        };
        todos.push(todo);
        res.writeHead(200, headers);
        res.write(
          JSON.stringify({
            status: "true",
            data: todos,
          })
        );
        res.end();
      } else {
        errorHandler(res);
      }
    } catch {
      errorHandler(res);
    }
  });
};

module.exports = postTodo;
