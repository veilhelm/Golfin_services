const {Schema, model} = require("mongoose")

 const totalsSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        unique: true,
    },
    years: {
        type: [{type: Schema.Types.Mixed, required: true}],
        required: true,
        default: [{year: new Date().getUTCFullYear() , totals: { totalexp: 0, totalinc: 0}}]
    },
    months: {
        type: [{type: Schema.Types.Mixed, required: true}],
        required: true,
        default: [{month: new Date().getUTCMonth() , totals: {totalexp: 0, totalinc: 0}}]
    }
 })

totalsSchema.methods.calcNewTotalsOnNewTransaction= function ({ammount, type}) {
   const now = new Date()
   let yearIndex = this.years.findIndex(({year}) => year === now.getUTCFullYear())
   if(yearIndex < 0) {
       this.years.push({year: now.getUTCFullYear() , totals: {totalexp: 0 , totalinc: 0}})
       yearIndex = this.years.length - 1 
   } 
   this.years[yearIndex].totals[`total${type}`] += ammount
   

   let monthIndex = this.months.findIndex(({month}) => month === now.getUTCMonth())
   if(monthIndex < 0) {
       this.months.push({month: now.getUTCMonth() , totals: {totalexp: 0 , totalinc: 0}})
       monthIndex = this.months.length - 1
   } 
   this.months[monthIndex].totals[`total${type}`] += ammount

   return {years: this.years, months: this.months}
}

totalsSchema.methods.calcNewTotalsOnDeleteTransaction = function({createdAt, type, ammount}) {
    const dateOfTransaction = new Date(createdAt)
    let yearIndex = this.years.findIndex(({year}) => year === dateOfTransaction.getUTCFullYear())
    this.years[yearIndex].totals[`total${type}`] -= ammount
    let monthIndex = this.months.findIndex(({month}) => month === dateOfTransaction.getUTCMonth())
    this.months[monthIndex].totals[`total${type}`] -= ammount
    return {years: this.years, months: this.months}
}

 const Total = new model("Total", totalsSchema)
 module.exports = Total