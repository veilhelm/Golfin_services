const {Schema, model} = require("mongoose")

 const TransactionSchema = new Schema({
    userId:{
        type: Schema.Types.ObjectId,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    ammount: {
        type: Number,
        required: true,
        min: 0
    },
    tags: {
        type: [{
            type: String,
            trim: true,
        }],
    },
    description: {
        type: String,
        required: true,
    }
 },{
     timestamps: true,
 })

 const Transaction = new model("Transaction", TransactionSchema)
 module.exports = Transaction