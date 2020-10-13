const EventEmiter = require("events")
const PublicUser = require("../models/user.model")

class QueryController extends EventEmiter {
    handleEvents = async (req , res) => {
        const {type, data} = req.body._doc
        try{
            switch(type){
                case 'userCreated':
                    await PublicUser.create(data)
                    return res.status(200).json({status: "ok"})
                case 'userLogged':
                    const [user] = await PublicUser.find({_id: data.userId})
                    user.tokens.push(data.token)
                    await user.save()
                    return res.status(200).json({status: "ok"})
                default :
                res.status(200).json("ok")
            }

        }catch(error){
            console.log(error)
        }
    }

}

const queryController = new QueryController()
queryController.on('userCreated', () => console.log("a user was created"))
module.exports= queryController