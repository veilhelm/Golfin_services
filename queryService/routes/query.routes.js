const router = require("express").Router()
const queryController = require("../controllers/query.controllers")
const { authMiddleware } = require("../utils/middlewares")

router.route("/recieveEvents").post(queryController.handleEvents)
router.route("/user").get(authMiddleware, queryController.getPublicUser)
router.route("/transactions").get(authMiddleware, queryController.getPublicTransactions)

module.exports = router