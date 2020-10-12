const EventEmiter = require("events")
const Transaction = require("../models/transaction.model")
const { emitTransactionCreated } = require("../utils/transaction.subscribers")

class TransactionController extends EventEmiter {
    createTransaction = async (req, res) => {
        try{
            const transaction = await new Transaction(req.body)
            const newTransaction = await transaction.save()
            this.emit('transactionCreated', newTransaction)
            res.json(newTransaction)
        }catch(error){  
            res.status(400).json(error)
        }
    }

    deleteTransaction = async ( req, res ) => {
        try{
            const deletedTransaction = await Transaction.findOneAndDelete({_id: req.body.id})
            this.emit('transactionDeleted', deletedTransaction)
            res.json(deletedTransaction)
        }catch(error){
            res.status(400).json(error)
        }
    }
}

const transactionController = new TransactionController()
transactionController.on('transactionCreated', emitTransactionCreated)
transactionController.on('transactionDeleted', () => console.log("a transaction was deleted"))
module.exports= transactionController