const router = require("express").Router()
const userLoginController = require("../controllers/user_login.controller")

router.route("/").post(userLoginController.loginUser)

module.exports = router