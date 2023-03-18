var express = require("express");
var router = express.Router();
const artworkCtrl = require("../controllers/artworks");
const { isAuth } = require("../controllers/users");

/* GET home page. */
router.get("/createNew", isAuth, artworkCtrl.createNew);
router.post("/createNew", isAuth, artworkCtrl.create);
router.get("/", isAuth, artworkCtrl.index);
router.get("/:id", isAuth, artworkCtrl.editPage);
router.put("/:id", isAuth, artworkCtrl.update);
router.delete("/:id", isAuth, artworkCtrl.del);

module.exports = router;
