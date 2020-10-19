const router = require("express").Router()
const queryController = require("../controllers/query.controllers")
const { authMiddleware } = require("../utils/middlewares")

router.route("/recieveEvents").post(queryController.handleEvents)
router.route("/user").get(authMiddleware, queryController.getPublicUser)
router.route("/transactions").get(authMiddleware, queryController.getPublicTransactions)
router.route("/totals").get(authMiddleware, queryController.getPublicTotals)
router.route("/goals").get(authMiddleware, queryController.getPublicGoals)
router.route("/payments").get(authMiddleware, queryController.getPaymentRecords)

module.exports = router