
const express = require("express");
const cors = require("cors");
const bodyparser = require("body-parser");
const ServiceRoute = require('./router');

const app = express();
app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

const PORT = parseInt(process.env.PORT) || 8080;

app.use('/', ServiceRoute);

app.listen(PORT, () => {
  console.log("Server Started on PORT " + PORT);
});
