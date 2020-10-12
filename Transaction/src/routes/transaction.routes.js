const router = require("express").Router()
const transactionController = require("../controllers/transaction.controllers")

router.route("/").post(transactionController.createTransaction)
router.route("/").delete(transactionController.deleteTransaction)

module.exports = router