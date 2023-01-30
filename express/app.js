const express = require("express");
const app = express();
const PORT = 8082;

const {
  getUser,
  searchUserByUUID,
  filterUser,
} = require("./controllers/userController.js");

app.use(express.json());

// let todoList = ["one", "two", "three", "four", "five"];

app.get("/", (request, response) => {
  response.send("<h1>Hello world</h1>");
});
app.get("/user", getUser);
app.get("/user/search", filterUser);
app.get("/user/:uuid", searchUserByUUID);

// app.get("/todos", (req, res) => {
//   res.send(todoList);
// });

// app.post("/todos", (request, response) => {
//   // console.log(request.body.name);
//   todoList.push(request.body.name);
//   console.log(todoList);
//   response.status(201).end();
// });

// app.delete("/todos", (request, response) => {
//   let toBeDel = request.body.name;
//   todoList = todoList.filter((item) => {
//     if (item !== toBeDel) return item;
//   });
//   console.log(todoList);
//   response.send(204);
// });

// app.all("/todos", (request, response) => {
//   response.status(501).send();
// });

app.all("*", (request, response) => {
  response.status(404);

  response.send("<Custom 404 message>");
});

app.listen(PORT, () => {
  console.log("listening learing on", PORT);
});
