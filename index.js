const express = require("express");
const cors = require("cors");
const bodyparser = require("body-parser");
const { APM_CLIENT_CONFIG, CURRENCY_MAP, PORT } = require("./constants");
const { default: axios } = require("axios");
let apm;
const app = express();
app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

// Steps to configure APM client in NodeJS application
// #1 Download and install elastic-apm-node npm module.
// #2 Collect the credentials of your APM Client, which includes serverURL, secret token.
// #3 Provide a valid service, environment, along with the credentials and start the APM client with below code

// const apm = require("elastic-apm-node").start(APM_CLIENT_CONFIG);

// Below are some major functionalities of apm

// - To Mark a Transaction,
// const trans = apm.startTransaction("Get Currency transaction", "GET API");
// trans.end()

// - To Mark a Span,
// const span = apm.startSpan("POST CALL STARTED", "POST API");
// span.end()

// - To Mark an Error,
// apm.captureError("error", "error data");

const isAPMEnabled = true; // This is the flag for enabling and disabling the APM.
if (isAPMEnabled) {
  apm = require("elastic-apm-node").start(APM_CLIENT_CONFIG);
}

// Simple GET Request
app.get("/", function (req, res) {
  res.status(200).send({
    success: true,
    data: "This is a GET CALL",
  });
});

// Simple POST Request
app.post("/", function (req, res) {
  var span = isAPMEnabled ? apm.startSpan("POST CALL STARTED") : null;
  setTimeout(() => {
    if (span) span.end();
    res.status(200).send({
      success: true,
      data: "This is a POST CALL",
    });
  }, 2000);
});

// Simple PUT Request
app.put("/", function (req, res) {
  res.status(200).send({
    success: true,
    data: "This is a PUT CALL",
  });
});

// Simple DELETE Request
app.delete("/", function (req, res) {
  res.status(200).send({
    success: true,
    data: "This is a DELETE CALL",
  });
});

// Generates an error call
app.get("/error-call", function (req, res) {
  if (isAPMEnabled) {
    const error = new Error("Custom Error");
    apm.captureError(error, {
      user: {
        id: "unique_id",
        username: "foo",
        email: "foo@example.com",
      },
    });
  }

  res.status(200).send({
    success: true,
    data: "ERROR CALL",
  });
});

// Returns list of currency equivale
app.get("/currency", async function (req, res) {
  var trans = isAPMEnabled
    ? apm.startTransaction("Get Currency transaction", "GET API")
    : null;
  const { data } = await axios.get(
    "https://api.coindesk.com/v1/bpi/currentprice.json"
  );
  setTimeout(() => {
    if (trans) trans.end();
    res.status(200).send({
      success: true,
      data: data?.bpi,
    });
  }, 2000);
});

// Currency conversion
app.get("/convert-currency", function (req, res) {
  const { to = "", rupee = 0 } = req?.body;
  if (to.length === 0 || rupee === 0) {
    const error = new Error("Arguments missing error");
    isAPMEnabled &&
      apm.captureError(error, {
        data: "Argument named 'to' and 'rupee' is mandatory for conversion",
      });
    res.status(200).send({
      success: false,
      error: "Arguments missing error",
    });
  } else {
    var trans = isAPMEnabled
      ? apm.startTransaction("Convert Currency transaction", "POST API")
      : null;
    setTimeout(() => {
      if (trans) trans.end();
      res.status(200).send({
        success: true,
        data: {
          value: (CURRENCY_MAP[to?.toUpperCase()] * rupee).toFixed(2),
        },
      });
    }, 2000);
  }
});

app.listen(PORT, () => {
  console.log("Server Started on PORT " + PORT);
});
