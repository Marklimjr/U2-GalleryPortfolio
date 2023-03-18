var express = require("express");
var router = express.Router();
const userCtrl = require("../controllers/users");

/* GET users listing. */
router.get("/login", userCtrl.loginPage);
router.post("/login", userCtrl.loginSubmit);
module.exports = router;
