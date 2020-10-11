const router = require("express").Router()
const userController = require("../controllers/user.controller")

router.route("/").post(userController.createNewUser)

module.exports = router