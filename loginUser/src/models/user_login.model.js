const {Schema, model} = require("mongoose")
const jwt = require("jsonwebtoken")

 const UserLoginSchema = new Schema({
    email:{
        type:String,
        required:true,
    },
    password: {
        type: String,
        required: true,
    },
    isLogged: {
        type: String,
        required: true,
        default:false
    },
    _id:{
        type: Schema.Types.ObjectId
    }
 },{
     _id: false,
     timestamps:true,
 })

 UserLoginSchema.methods.generateAuthToken = async function (){
    return jwt.sign({_id: this._id.toString()}, process.env.SECRET_KEY, {expiresIn: "1year"}) 
}

 const UserLogin = new model("UserLogin", UserLoginSchema)
 module.exports = UserLogin