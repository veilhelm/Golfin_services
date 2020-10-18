const router = require("express").Router()
const goalsController = require("../controllers/goals.controllers")
const { authMiddleware } = require("../utils/middlewares")

router.route("/").post(authMiddleware, goalsController.createGoal)

module.exports = router