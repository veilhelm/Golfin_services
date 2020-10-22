const EventEmiter = require("events")
const Goal = require("../models/goals.model")
const { emitGoalCreated } = require("../subscribers/goals.subscribers")
const { createPaymentRecord } = require("../utils/paymentRecord")


class GoalsController extends EventEmiter {
    createGoal = async (req, res) => {
        const goal = await new Goal({...req.body, userId: req.userId})
        goal.calcQuotes()
        await goal.save()
        this.emit('goalCreated', goal)
        const payment = await createPaymentRecord(goal)
        res.status(200).json({goal, payment})
    }
    handleEvents = (req, res) => {
        res.status(200).json({status: "ok"})
    }
}

const goalsController = new GoalsController()
goalsController.on('goalCreated', emitGoalCreated )
module.exports= goalsController