require("dotenv").config();
const express = require("express");
const { verifyAuth } = require("./middleware/verifyAuth.js");
const userRoute = require("./routes/userRoute.js");
const app = express();
const PORT = 8082;

app.use(express.json());
app.use(verifyAuth);

app.get("/", (request, response) => {
  response.send("<h1>Hello world</h1>");
});

app.use("/user", userRoute);

app.all("*", (request, response) => {
  response.status(404);

  response.send("<Custom 404 message>");
});

app.listen(PORT, () => {
  console.log("listening learing on", PORT);
});
