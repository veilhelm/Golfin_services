const {Schema, model} = require("mongoose")

 const goalsSchema = new Schema({
    kind: {
        type: String,
        required: true,
    },
    timeFrame: {
        type: String,
    },
    amount: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    title: {
        type: String,
        required: true, 
    },
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    status: {
        type: String,
    },
    quote: {
        type: Number,
    },
    numberOfQuotes: {
        type: Number,
    },
    initialDate: {
        type: Date,
    },
    iRate: {
        type: Number,
    },
    createdAt: Date,
    updatedAt: Date,
 })

 const PublicGoal = new model("PublicGoal", goalsSchema)
 module.exports = PublicGoal