const {Schema, model} = require("mongoose")

 const eventSchema = new Schema({
    type: {
        type: String,
        required:true,
    },
    data: {
        type: Schema.Types.Mixed,
        required:true
    }
 },{
     timestamps:true
 }
 )

 const Event = new model("Event", eventSchema)
 module.exports = Event