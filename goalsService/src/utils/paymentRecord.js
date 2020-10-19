const PaymentRecord = require("../models/paymentRecord.model")
const { DateTime } = require("luxon")
const {emitPaymentRecordCreated } = require("../subscribers/goals.subscribers")

const createPaymentRecord = async (goal) => {
    const records = []
    const now = DateTime.utc()
    let dayOfPayment
    let addingUnit
    let unit
    if(goal.timeFrame === 'short-term'){
        dayOfPayment = now.endOf(`week`) 
        addingUnit = {days: 6}
        unit = 'week'
    }
    else{
        dayOfPayment = now.month <= 15 ? now.endOf(`month`) : now.plus({months:1}).endOf(`month`)
        addingUnit = {days: 25}
        unit = 'month'
    } 
    for(let i = 0 ; i < goal.numberOfQuotes ; i ++){
        records.push({name:dayOfPayment.toFormat("yyyy-MM-dd"), payed: 0, quote: goal.quote, remain:goal.amount})
        dayOfPayment = dayOfPayment.plus(addingUnit).endOf(unit)
    }
    console.log({userId: goal.userId, goalId: goal._id})
    const paymentRecord = await new PaymentRecord({payments: records, userId: goal.userId, goalId: goal._id})
    const payment = await paymentRecord.save()
    emitPaymentRecordCreated(payment)
}

module.exports = {
    createPaymentRecord
}