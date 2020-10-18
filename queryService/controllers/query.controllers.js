const EventEmiter = require("events")
const PublicGoal = require("../models/goals.model")
const PublicTotals = require("../models/totals.model")
const PublicTransaction = require("../models/transaction.model")
const PublicUser = require("../models/user.model")

class QueryController extends EventEmiter {
    handleEvents = async (req , res) => {
        const {type, data} = req.body._doc
        try{
            switch(type){
                case 'userCreated':
                    await PublicUser.create(data)
                    break;

                case 'userLogged':
                    const [user] = await PublicUser.find({_id: data.userId})
                    user.tokens.push(data.token)
                    await user.save()
                    break;

                case 'transactionCreated':
                    await PublicTransaction.create(data)
                    break;

                case 'transactionDeleted':
                    await PublicTransaction.findByIdAndDelete(data)
                    break;

                case `totalsCreated`:
                    await PublicTotals.create(data)
                    break;

                case 'totalsUpdated':
                    await PublicTotals.findOneAndUpdate({userId: data.userId},{...data})
                    break;

                case `goalCreated`:
                    await PublicGoal.create(data)
                    break;
                    
                default :
                    break
            }
        return res.status(200).json({status: "ok"})
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
            const transactions = await PublicTransaction.find({userId: req.user._id}, null, {sort:`-createdAt`})
            res.status(200).json(transactions)
        } catch (error) {
            res.status(400).json(error)     
        }
    }
    getPublicTotals = async ( req, res ) => {
        try {
            const totals = await PublicTotals.findOne({userId: req.user._id})
            res.status(200).json(totals)
        } catch (error) {
            res.status(400).json(error)
        }
    }
    getPublicGoals = async ( req, res ) => {
        try {
            const goals = await PublicGoal.find({userId: req.user._id})
            res.status(200).json(goals)
        } catch (error) {
            res.status(400).json(error)
        }
    }

}

const queryController = new QueryController()
queryController.on('userCreated', () => console.log("a user was created"))
module.exports= queryController