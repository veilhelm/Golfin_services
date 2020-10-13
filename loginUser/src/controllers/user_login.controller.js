const EventEmiter = require("events")
const UserLogin = require("../models/user_login.model")
const bcrypt = require("bcrypt")
const { emitUserLogged } = require("../subscribers/loginUser.subscribers")

class UserLoginController extends EventEmiter {
    loginUser = async ( req, res ) =>{
        try{
            const {email, password} = req.body
            const [user] = await UserLogin.find({email})
            const isValid = user ? await bcrypt.compare(password, user.password || "" ) : false
            if(!user || !isValid) throw Error("the email or password is incorrect")
            const token = await user.generateAuthToken()
            this.emit('userLogged', {token, userId : user._id})
            res.json(token)
        }catch(error){
            console.log(error)
            res.status(400).json(error.message)
        }
    }

    recieveEvents = async (req, res) => {
        if(req.body._doc.type === "userCreated") await UserLogin.create(req.body._doc.data)
        res.status(200).json({recieved: "ok"})
    }

}

const userLoginController = new UserLoginController()
userLoginController.on('userLogged', emitUserLogged)
module.exports= userLoginController