const router = require("express").Router()
const goalsController = require("../controllers/goals.controllers")
const { authMiddleware } = require("../utils/middlewares")

router.route("/").post(authMiddleware, goalsController.createGoal)
router.route("/recieveEvents").post(goalsController.handleEvents)

module.exports = router