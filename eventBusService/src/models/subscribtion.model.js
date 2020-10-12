const {Schema, model} = require("mongoose")

 const subscriptionSchema = new Schema({
    subscribedList :{
        type:[Schema.Types.Mixed]
    }
 })

 const Subscription = new model("subscription", subscriptionSchema)
 module.exports = Subscription