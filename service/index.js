const dotenv = require("dotenv");
dotenv.config();

const {
  getCallHelper,
  postCallHelper,
  putCallHelper,
  deleteCallHelper,
  makeErrorHelper,
} = require("../helpers");
const {
  getApmInstance,
  isApmLoggingEnabled,
} = require("./elastic-apm-service");

console.log("Controller index");
const apm = getApmInstance();
const apmEnabled = isApmLoggingEnabled();

const getCall = async (req, res) => {
  const data = getCallHelper();
  var trans =
    apmEnabled && apm.startTransaction("Custom Transaction", "Custom Type");
  setTimeout(() => {
    if (trans) trans.end();
    res.status(200).send({
      success: true,
      data,
    });
  }, 5000);
};

const postCall = async (req, res) => {
  const data = postCallHelper();
  var span = apmEnabled && apm.startSpan("POST CALL STARTED");
  apm.startSpan("POST CALL STARTED");
  setTimeout(() => {
    if (span) span.end();
    res.status(200).send({
      success: true,
      data,
    });
  }, 5000);
};

const putCall = async (req, res) => {
  const data = putCallHelper();
  res.status(200).send({
    success: true,
    data,
  });
};

const deleteCall = async (req, res) => {
  const data = deleteCallHelper();
  res.status(200).send({
    success: true,
    data,
  });
};

const makeAnError = async (req, res) => {
  const data = makeErrorHelper();
  const error = new Error("Custom Error");
  apmEnabled &&
    apm.captureError(error, {
      user: {
        id: "unique_id",
        username: "foo",
        email: "foo@example.com",
      },
    });
  res.status(500).send({
    success: true,
    data,
    error: error.message,
  });
};

module.exports = {
  getCall,
  postCall,
  putCall,
  deleteCall,
  makeAnError,
};
