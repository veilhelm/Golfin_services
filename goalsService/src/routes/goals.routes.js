const router = require("express").Router()
const goalsController = require("../controllers/goals.controllers")

router.route("/").post(goalsController.createGoal)

module.exports = router