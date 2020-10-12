const EventEmiter = require("events")
const User = require("../models/user.model")
const { emitUserRegistered } = require("../subscribers/registerUser.subscriber")

class UserController extends EventEmiter {
    createNewUser = async (req, res) => {
        try{
            const user = await new User(req.body)
            const token = await user.generateAuthToken()
            await user.encryptPassword()
            await user.save()
            this.emit('userCreated', user)
            res.status(201).json(token)
        }catch(error){
            console.log(error)
            res.status(400).json(error)
        }
      
    }
}

const userController = new UserController()
userController.on('userCreated', emitUserRegistered)
module.exports= userController
