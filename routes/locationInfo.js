var express = require("express");
var router = express.Router();
const locationInfoCtrl = require("../controllers/locationInfo");

router.get("/", locationInfoCtrl.indexPage);
router.get("/createNew", locationInfoCtrl.createPage);
router.post("/createNew", locationInfoCtrl.create);
router.get("/:id", locationInfoCtrl.editPost);
router.put("/:id", locationInfoCtrl.update);
router.delete("/:id", locationInfoCtrl.del);

module.exports = router;
