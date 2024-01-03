const dotenv = require("dotenv")
dotenv.config()

const express = require("express");
const cors = require("cors");
const bodyparser = require("body-parser");
const { APM_CLIENT_CONFIG } = require("./constants");
const apm = require("elastic-apm-node").start(APM_CLIENT_CONFIG);

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
  var span = apm.startSpan("POST CALL STARTED");
  apm.startSpan("POST CALL STARTED");
  setTimeout(() => {
    if (span) span.end();
    res.status(200).send({
      success: true,
      data: "POST CALL",
    });
  }, 5000);
});

app.get("/error-call", function (req, res) {
  const error = new Error("Custom Error");
  apm.captureError(error, {
    user: {
      id: "unique_id",
      username: "foo",
      email: "foo@example.com",
    },
  });
  res.status(200).send({
    success: true,
    data: "ERROR CALL",
  });
});

app.post("/start-transaction", function (req, res) {
  var trans = apm.startTransaction("Custom Transaction", "Custom Type");
//   apm.startSpan("POST CALL STARTED");
  setTimeout(() => {
    if (trans) trans.end();
    res.status(200).send({
      success: true,
      data: "POST CALL",
    });
  }, 5000);
});

app.listen(PORT, () => {
  console.log("Server Started on PORT " + PORT);
});
