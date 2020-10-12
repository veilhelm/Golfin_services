const EventEmiter = require("events")
const Event = require("../models/event.model")
const Subscription = require("../models/subscribtion.model")
const { emitEvent } = require("../subscribers/eventSubscribers")

class EventController extends EventEmiter {
    eventCreated = async (req , res) => {
        try{
            const event = await new Event(req.body)
            const newEvent = await event.save()
            this.emit('eventCreated', newEvent)
            res.status(201).json(newEvent)
        }catch(error){
            res.status(400).json(error)
        }
    }

    subscribeMicroservice = async (req, res) => {
        try{
            let [subscriptions] = await Subscription.find({})
            if(subscriptions) {
                const alreadyRegistered = subscriptions.subscribedList.some( subscription => subscription.microService === req.body.microService)
                if(!alreadyRegistered){
                    subscriptions.subscribedList.push({...req.body})
                    console.log(`service ${req.body.microService} has subscribed to the events`)
                } 
            }
            else subscriptions = new Subscription({subscribedList : [{...req.body}]})
            await subscriptions.save()
            res.json(`microservice ${req.body.microService} subscribed to the event bus`)
        }catch(error){
            console.log(error)
            res.status(400).json(error)
        }
    }
}

const eventController = new EventController()
eventController.on('eventCreated', emitEvent)
module.exports= eventController