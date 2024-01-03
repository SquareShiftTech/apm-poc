 const APM_CLIENT_CONFIG = {
  serviceName: process.env.SERVICE_NAME,
  secretToken: process.env.SERVICE_TOKEN,
  serverUrl: process.env.SERVER_URL,
  environment: process.env.ENVIRONMENT,
};


module.exports = {
    APM_CLIENT_CONFIG
}