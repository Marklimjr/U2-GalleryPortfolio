var express = require("express");
var router = express.Router();
const locationInfoCtrl = require("../controllers/locationInfo");

module.exports = router;

router.get("/", locationInfoCtrl.indexPage);
router.get("/createNew", locationInfoCtrl.createPage);
router.post("/createNew", locationInfoCtrl.create);

// router.get("/:id", artistACtrl.editPost);
// router.put("/:id", artistACtrl.update);
// router.put("/:id", newFlightsCtrl.update);
