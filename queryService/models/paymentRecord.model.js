const {Schema, model} = require("mongoose")

 const PaymentRecordSchema = new Schema({
    payments :{
        type: [Schema.Types.Mixed],
    },
    goalId: Schema.Types.ObjectId,
    userId: Schema.Types.ObjectId,
 })

 const PaymentRecord = new model("PaymentRecord", PaymentRecordSchema)
 module.exports = PaymentRecord