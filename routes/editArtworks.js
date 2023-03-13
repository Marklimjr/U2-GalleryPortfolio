var express = require("express");
var router = express.Router();
const artistACtrl = require("../controllers/artistA");

module.exports = router;

router.get("/:id", artistACtrl.editPost);
router.put("/:id", artistACtrl.update);
// router.put("/:id", newFlightsCtrl.update);
