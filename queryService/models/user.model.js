const {Schema, model} = require("mongoose")

 const UserSchema = new Schema({
    firstName:{
        type: String,
    },
    lastName:{
        type: String,
    },
    email:{
        type: String,
    },
    phoneNumber: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 13,
        trim: true
    },
    photo: {
        type: String,
    },
    tokens: {
        type: [String],

    },
    isVerified:{
        type: Boolean,
        default: false
    },
    createdAt:{
        type: String,
    },
    updatedAt:{
        type: String,
    },
    _id:{
        type: Schema.Types.ObjectId
    }
 },{
     _id: false,
 })


 const publicUser = new model("User", UserSchema)
 module.exports = publicUser