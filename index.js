const express = require("express");
const cors = require("cors");
const bodyparser = require("body-parser");
const { createApmInstance } = require("./service/elastic-apm-service");
createApmInstance();

const ServiceRoute = require("./router");

const app = express();
app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

// If apm is enabled - then create the apm instance
const PORT = parseInt(process.env.PORT) || 8080;

// Routes without Transctions
app.get("/", (req, res) => {
  return res.send("This is a anonymous GET route");
});
app.post("/", (req, res) => {
  return res.send("This is a anonymous POST route");
});

// Routes with Transctions
app.use("/service", ServiceRoute);

app.listen(PORT, () => {
  console.log("Server Started on PORT " + PORT);
});
