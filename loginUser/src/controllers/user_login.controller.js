const EventEmiter = require("events")
const UserLogin = require("../models/user_login.model")
const bcrypt = require("bcrypt")

class UserLoginController extends EventEmiter {
    loginUser = async ( req, res ) =>{
        try{
            const {email, password} = req.body
            const [user] = await UserLogin.find({email})
            const isValid = await bcrypt.compare(password, user.password || "" )
            if(!user || !isValid) throw Error("the email or password is incorrect")
            const token = await user.generateAuthToken()
            this.emit('userLogged', [token, user._id])
            res.json(token)
        }catch(error){
            res.json(error)
        }
    }
}

const userLoginController = new UserLoginController()
userLoginController.on('userLogged', () => console.log("a user was created"))
module.exports= userLoginController