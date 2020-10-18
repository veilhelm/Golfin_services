const {Schema, model} = require("mongoose")

 const totalsSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
    },
    years: {
        type: [{type: Schema.Types.Mixed, required: true}],
    },
    months: {
        type: [{type: Schema.Types.Mixed, required: true}],
    }
 })

 const PublicTotals = new model("PublicTotals", totalsSchema)
 module.exports = PublicTotals