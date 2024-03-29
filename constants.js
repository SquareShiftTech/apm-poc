const dotenv = require("dotenv");
dotenv.config();

 const APM_CLIENT_CONFIG = {
  serviceName: process.env.SERVICE_NAME,
  secretToken: process.env.SERVICE_TOKEN,
  serverUrl: process.env.SERVER_URL,
  environment: process.env.ENVIRONMENT,
};

const CURRENCY_MAP = {
  USD : 0.012,
  EURO:0.011,
  DIRHAM: 0.044
}

module.exports = {
    APM_CLIENT_CONFIG,
    PORT: parseInt(process.env.PORT) || 8080,
    CURRENCY_MAP
}