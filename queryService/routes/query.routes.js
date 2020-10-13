const router = require("express").Router()
const queryController = require("../controllers/query.controllers")

router.route("/recieveEvents").post(queryController.handleEvents)

module.exports = router