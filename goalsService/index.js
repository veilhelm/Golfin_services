const app  = require("./app")
const axios = require("axios")

const port = process.env.PORT || 4005

const subscribeToEventBusService =  async () => {
    try {
        const subscription = await axios({
            method: "POST",
            baseURL: process.env.EVENT_BUS_URL,
            url:"events/subscribe",
            data:{
                microService: "goals-service",
                ReciverEventsUrl: process.env.REGISTER_USER_URL
            }
        }) 
        console.log(subscription.data)
    } catch (error) {
        setTimeout(() =>{
            console.log("retrying to subscribe to eventBus")
            subscribeToEventBusService()
        }, 2000)
    }
}

app.listen(port, async ()=> {
    console.log(`Listening at port ${port}`)
    await subscribeToEventBusService()
})