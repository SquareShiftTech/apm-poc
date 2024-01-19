const router = require("express").Router();
const Service = require("../service");
const CurrencyService = require("../service/currency-service");

router.get("/", CurrencyService.getAllCurrencies);
router.post("/", CurrencyService.convertINR);
router.get("/error-call", Service.makeAnError);

module.exports = router;
