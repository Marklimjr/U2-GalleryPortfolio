var express = require("express");
var router = express.Router();
const artworkCtrl = require("../controllers/artworks");

/* GET home page. */
router.get("/createNew", artworkCtrl.createNew);
router.post("/createNew", artworkCtrl.create);
router.get("/", artworkCtrl.index);
router.get("/:id", artworkCtrl.editPage);
router.put("/:id", artworkCtrl.update);
router.delete("/:id", artworkCtrl.del);

module.exports = router;
