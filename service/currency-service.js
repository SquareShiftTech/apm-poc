const dotenv = require("dotenv");
dotenv.config();

const {
  getApmInstance,
  isApmLoggingEnabled,
} = require("./elastic-apm-service");
const { conversionRates } = require("../constants");
const { convertCurrency } = require("../helpers");

console.log("CURRENCY");
const apm = getApmInstance();
const apmEnabled = isApmLoggingEnabled();

const getAllCurrencies = async (req, res) => {
  var trans =
    apmEnabled && apm.startTransaction("Get All Currencies", "Currency");
  setTimeout(() => {
    if (trans) trans.end();
    res.status(200).send({
      success: true,
      data: { conversionRates },
    });
  }, 5000);
};

const convertINR = async (req, res) => {
  const { toCurr, inr } = req.body;
  if (!toCurr || !inr) {
    res.status(400).send("toCurr and inr is required");
  }
  if (!Object.keys(conversionRates).includes(toCurr)) {
    res.status(400).send("supported toCurr: USD, EUR, CAD");
  }

  var trans =
    apmEnabled &&
    apm.startTransaction(`Convert INR to ${toCurr}`, "Custom Type");

  setTimeout(() => {
    if (trans) trans.end();
    res.status(200).send({
      success: true,
      data: convertCurrency(inr, toCurr),
    });
  }, 5000);
};

module.exports = {
  getAllCurrencies,
  convertINR,
};
