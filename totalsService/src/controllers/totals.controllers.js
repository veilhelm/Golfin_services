const EventEmiter = require("events")
const Total = require("../models/totals.model")
const { emitTotalsCreated, emitTotalsUpdated } = require("../subscribers/totals.subscribers")

class TotalsController extends EventEmiter {
    handleEvents = async ( req , res ) => {
        console.log(req.body._doc)
        const { type, data } = req.body._doc
        switch (type) {
            case 'userCreated':
                const totals= await Total.create({userId: data._id})
                this.emit('totalsCreated', totals)
            break;

            case 'transactionCreated':
                const total = await Total.findOne({userId: data.userId})
                const updatedTotals = total.calcNewTotalsOnNewTransaction(data)
                await total.updateOne(updatedTotals)
                this.emit('totalsUpdated',{userId: total.userId, ...updatedTotals})
                res.status(200).json({status: "ok"})
            break;

            case 'transactionDeleted':
                const totalToUpdate = await Total.findOne({userId: data.userId})
                const updatedTotalsOnDelete = totalToUpdate.calcNewTotalsOnDeleteTransaction(data)
                await totalToUpdate.updateOne(updatedTotalsOnDelete)
                this.emit('totalsUpdated',{userId: totalToUpdate.userId, ...updatedTotalsOnDelete})
                res.status(200).json({status: "ok"})
            break;
            
            
            default:
                res.status(200).json({status: "ok"})
                break;
        }
    }
}

const totalsController = new TotalsController()
totalsController.on('totalsCreated', emitTotalsCreated)
totalsController.on('totalsUpdated', emitTotalsUpdated)
module.exports= totalsController