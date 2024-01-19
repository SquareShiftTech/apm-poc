const APM_CLIENT_CONFIG = {
  serviceName: process.env.SERVICE_NAME,
  secretToken: process.env.SERVICE_TOKEN,
  serverUrl: process.env.SERVER_URL,
  environment: process.env.ENVIRONMENT,
};

const apmEnabled = process.env.APM_ENABLED || true;
const conversionRates = {
  USD: 0.012033,
  EUR: 0.011056,
  CAD: 0.016226,
};

module.exports = {
  APM_CLIENT_CONFIG,
  apmEnabled,
  conversionRates,
};
