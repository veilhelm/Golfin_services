const {Schema, model} = require("mongoose")

 const PublicTransactionSchema = new Schema({
    tags:{
        type:[String]
    },
    _id: {
        type: Schema.Types.ObjectId,
    },
    userId:{
        type: Schema.Types.ObjectId
    },
    type: String,
    ammount: Number,
    description: String,
    createdAt: String,
    updatedAt:String,
    category: String,
 },{
     _id: false,
 })

 const PublicTransaction = new model("PublicTransaction", PublicTransactionSchema)
 module.exports = PublicTransaction