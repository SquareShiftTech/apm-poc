const apm = require("elastic-apm-node").start(APM_CLIENT_CONFIG);

const { APM_CLIENT_CONFIG } = require("../constants");

const {
  getCallHelper,
  postCallHelper,
  putCallHelper,
  deleteCallHelper,
  makeErrorHelper,
} = require("../helpers");

const getCall = async (req, res) => {
  const data = getCallHelper();
  res.status(200).send({
    success: true,
    data,
  });
};

const postCall = async (req, res) => {
  const data = postCallHelper();
  res.status(200).send({
    success: true,
    data,
  });
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
