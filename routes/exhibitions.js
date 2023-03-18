var express = require("express");
var router = express.Router();
const exhibitionCtrl = require("../controllers/exhibitions");
const { isAuth } = require("../controllers/users");
/* GET home page. */
router.get("/createNew", isAuth, exhibitionCtrl.createNew);
router.post("/createNew", isAuth, exhibitionCtrl.create);
router.get("/", isAuth, exhibitionCtrl.index);
router.get("/:id", isAuth, exhibitionCtrl.editPage);
router.put("/:id", isAuth, exhibitionCtrl.update);
router.delete("/:id", isAuth, exhibitionCtrl.del);
router.put("/artworks/:id", isAuth, exhibitionCtrl.updateArtwork);
module.exports = router;
