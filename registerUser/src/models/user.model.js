const {Schema, model} = require("mongoose")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const {emailValidators, passwordValidators} = require("../utils/validators")

 const UserSchema = new Schema({
    firstName:{
        type: String,
        trim: true,
        uppercase: true
    },
    lastName:{
        type: String,
        trim: true,
        uppercase: true
    },
    email:{
        type: String,
        required: true,
        lowercase: true,
        validate: emailValidators()
    },
    password: {
        type: String,
        required: true,
        validate: passwordValidators.bind(this)
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
        default: "someUserPhoto"
    },
    tokens: {
        type: [String],

    },
    isVerified:{
        type: Boolean,
        default: false
    }
 },{
     timestamps: true,
 })

 UserSchema.methods.generateAuthToken = async function (){
     this.tokens.push(jwt.sign({_id: this._id.toString()}, process.env.SECRET_KEY, {expiresIn: "1m"}))
     return this.tokens[this.tokens.length -1]
 }

 UserSchema.methods.encryptPassword = async function () {
    this.password = await bcrypt.hash(this.password, 8)
    return this.password
}

 const User = new model("User", UserSchema)
 module.exports = User
