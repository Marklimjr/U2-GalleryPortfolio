var express = require("express");
var router = express.Router();
const userCtrl = require("../controllers/users");

/* GET users listing. */
router.get("/login", userCtrl.loginPage);
router.post("/login", userCtrl.loginSubmit);
router.get("/createUser", userCtrl.createUser);
router.post("/createUser", userCtrl.createUserLoginDetails);
router.get("/admin", userCtrl.isAuth, userCtrl.index);
router.post("/logout", userCtrl.logoutSession);

module.exports = router;
