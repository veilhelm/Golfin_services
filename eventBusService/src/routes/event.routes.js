const router = require("express").Router()
const eventController = require("../controllers/event.controller")

router.route("/").post(eventController.eventCreated)
router.route("/subscribe").post(eventController.subscribeMicroservice)

module.exports = router