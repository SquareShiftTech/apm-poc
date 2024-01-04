const dotenv = require("dotenv")

const express = require("express");
const cors = require("cors");
const bodyparser = require("body-parser");
const ServiceRoute = require('./router');

dotenv.config()
const app = express();
app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

const PORT = parseInt(process.env.PORT) || 8080;

app.get("/", function (req, res) {
  res.status(200).send("Hello from Node Server");
});
app.use('/', ServiceRoute);

app.listen(PORT, () => {
  console.log("Server Started on PORT " + PORT);
});
