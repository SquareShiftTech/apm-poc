const router = require("express").Router();
const Service = require("../service");

router.get("/", Service.getCall);
router.post("/", Service.postCall);
router.get("/error-call", Service.makeAnError);
router.put("/", Service.putCall);
router.delete("/", Service.deleteCall);

module.exports = router;