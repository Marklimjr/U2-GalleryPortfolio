var express = require("express");
var router = express.Router();
const artistACtrl = require("../controllers/artistA");

/* GET users listing. */
router.get("/", artistACtrl.artistPage);
router.get("/createNew", artistACtrl.createPage);
router.post("/createNew", artistACtrl.create);

module.exports = router;
