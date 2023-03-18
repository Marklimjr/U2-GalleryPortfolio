var express = require("express");
var router = express.Router();
const indexCtrl = require("../controllers/index");
/* GET home page. */

router.get("/", indexCtrl.home);

module.exports = router;
