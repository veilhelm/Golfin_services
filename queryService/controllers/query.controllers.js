const EventEmiter = require("events")
const PublicTransaction = require("../models/transaction.model")
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
                case 'transactionCreated':
                    await PublicTransaction.create(data)
                    return res.status(200).json({status: "ok"})
                case 'transactionDeleted':
                    await PublicTransaction.findByIdAndDelete(data)
                    return res.status(200).json({status: "ok"})
                default :
                res.status(200).json("ok")
            }

        }catch(error){
            console.log(error)
        }
    }
    getPublicUser = async ( req , res )  => {
        try {
            const user = await PublicUser.findById(req.user._id)
            res.json(user)
        } catch (error) {
            res.status(400).json(error)
        }
    }
    getPublicTransactions = async ( req, res ) => {
        try {
            const transactions = await PublicTransaction.find({userId: req.user._id})
            res.json(transactions)
        } catch (error) {
            res.status(400).json(error)     
        }
    }

}

const queryController = new QueryController()
queryController.on('userCreated', () => console.log("a user was created"))
module.exports= queryController