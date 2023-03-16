var express = require("express");
var router = express.Router();
const exhibitionCtrl = require("../controllers/exhibitions");

/* GET home page. */
router.get("/createNew", exhibitionCtrl.createNew);
router.post("/createNew", exhibitionCtrl.create);
router.get("/", exhibitionCtrl.index);
router.get("/:id", exhibitionCtrl.editPage);
router.put("/:id", exhibitionCtrl.update);
router.delete("/:id", exhibitionCtrl.del);
router.put("/artworks/:id", exhibitionCtrl.updateArtwork);
module.exports = router;
