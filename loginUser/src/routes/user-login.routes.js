const router = require("express").Router()
const userLoginController = require("../controllers/user_login.controller")

router.route("/").post(userLoginController.loginUser)
router.route("/recieveEvents").post(userLoginController.recieveEvents)

module.exports = router