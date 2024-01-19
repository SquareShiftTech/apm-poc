// Service that handles apm flag enabling, creating apm instance etc.
const dotenv = require("dotenv");
dotenv.config();

const {
  APM_CLIENT_CONFIG,
  apmEnabled: apmEnabledFlag,
} = require("../constants");
const apm = require("elastic-apm-node");

let apmInstance;
let apmEnabled = apmEnabledFlag;

createApmInstance = () => {
  console.log("Create Instance", !!apmInstance);
  apmInstance = apm.start(APM_CLIENT_CONFIG);
  return apmInstance;
};

getApmInstance = () => {
  console.log("Get Instance", !!apmInstance);
  if (!apmInstance) return createApmInstance();
  return apmInstance;
};

enableApmLogging = () => {
  apmEnabled = true;
  return apmEnabled;
};

disableApmLogging = () => {
  apmEnabled = false;
  return apmEnabled;
};

isApmLoggingEnabled = () => {
  return apmEnabled;
};

module.exports = {
  getApmInstance,
  createApmInstance,
  isApmLoggingEnabled,
};
