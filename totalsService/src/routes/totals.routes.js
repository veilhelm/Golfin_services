const router = require("express").Router()
const totalsController = require("../controllers/totals.controllers")

router.route("/recieveEvents").post(totalsController.handleEvents)

module.exports = router