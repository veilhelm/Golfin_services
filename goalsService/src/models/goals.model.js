const {Schema, model} = require("mongoose")
const { DateTime, Interval } = require("luxon")
const { monthlyRates } = require("../utils/iRates")

 const GoalsSchema = new Schema({
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
        default: "" 
    },
    quote: {
        type: Number,
    },
    numberOfQuotes: {
        type: Number,
    },
    initialDate: {
        type: Date,
        required: true, 
    },
    iRate: {
        type: Number,
    }
 },{
     timestamps: true,
 })
GoalsSchema.methods.calcQuotes = function () {
    const interval = Interval.fromDateTimes(DateTime.local().toUTC(), this.date)
    numberOfMonths = Math.round(interval.length('months'))
    if( numberOfMonths <= 3) this.timeFrame = 'short-term'
    if( numberOfMonths > 3) this.timeFrame = 'middle-term'
    if( numberOfMonths > 36) this.timeFrame = 'long-term'
    this.numberOfQuotes = this.timeFrame === 'short-term' ? Math.round(interval.length('weeks')) : numberOfMonths
    this.quote = (this.amount * Math.pow((1 + monthlyRates[this.kind]), this.numberOfQuotes)) / this.numberOfQuotes
    this.iRate = monthlyRates[this.kind]
}

 const Goal = new model("Goal", GoalsSchema)
 module.exports = Goal