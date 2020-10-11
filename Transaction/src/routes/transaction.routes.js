const router = require("express").Router()
const transactionController = require("../controllers/transaction.controllers")

router.route("/").post(transactionController.createTransaction)

module.exports = router