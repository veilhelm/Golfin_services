const EventEmiter = require("events")
const Transaction = require("../models/transaction.model")

class TransactionController extends EventEmiter {
    createTransaction = async (req, res) => {
        try{
            const transaction = new Transaction(req.body)
            const newTransaction = await transaction.save()
            this.emit('transactionCreated', newTransaction)
            res.json(newTransaction)
        }catch(error){  
            res.status(400).json(error)
        }
    }
}

const transactionController = new TransactionController()
transactionController.on('transactionCreated', () => console.log("a transaction was created"))
module.exports= transactionController