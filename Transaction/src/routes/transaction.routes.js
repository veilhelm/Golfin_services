const router = require("express").Router()
const transactionController = require("../controllers/transaction.controllers")
const { authMiddleware } = require("../utils/middlewares")

router.route("/").post(authMiddleware, transactionController.createTransaction)
router.route("/").delete(authMiddleware, transactionController.deleteTransaction)
router.route("/recieveEvents").post(transactionController.recieveEvents)

module.exports = router