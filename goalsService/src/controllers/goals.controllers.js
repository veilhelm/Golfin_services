const EventEmiter = require("events")
const Goal = require("../models/goals.model")
const { emitGoalCreated } = require("../subscribers/goals.subscribers")


class GoalsController extends EventEmiter {
    createGoal = async (req, res) => {

        const goal = await new Goal({...req.body, userId: req.userId})
        goal.calcQuotes()
        await goal.save()
        this.emit('goalCreated', goal)
        res.status(200).json(goal)
    }
}

const goalsController = new GoalsController()
goalsController.on('goalCreated', emitGoalCreated )
module.exports= goalsController