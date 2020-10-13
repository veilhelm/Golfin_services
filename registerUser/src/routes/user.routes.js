const router = require("express").Router()
const userController = require("../controllers/user.controller")

router.route("/").post(userController.createNewUser)
router.route("/recieveEvents").post(userController.recieveEvents)

module.exports = router