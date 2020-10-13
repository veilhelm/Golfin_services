const axios = require("axios")
const Subscription = require("../models/subscribtion.model")

const emitEvent = async (event) => {
    try{
        const [{subscribedList}] = await Subscription.find({})
        subscribedList.forEach( microService => {
            axios({
                method: "POST",
                url: microService.ReciverEventsUrl,
                data:{
                    ...event
                }
            })
        });
        console.log(`the event ${event.type} was registered`)
    }catch(error){
        console.log(error)
    }
}


module.exports ={
    emitEvent
}