const dotenv = require("dotenv")
dotenv.config()

const express = require("express");
const cors = require("cors");
const bodyparser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

const PORT = parseInt(process.env.PORT) || 8080;

app.get("/", function (req, res) {
  res.status(200).send({
    success: true,
    data: "GET CALL",
  });
});

app.post("/", function (req, res) {
  res.status(200).send({
    success: true,
    data: "POST CALL",
  });
});

app.listen(PORT, () => {
  console.log("Server Started on PORT " + PORT);
});
