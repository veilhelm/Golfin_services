const axios = require("axios")
const app = require("./app")

const port = process.env.PORT || 4000

const subscribeToEventBusService =  async () => {
    try {
        const subscription = await axios({
            method: "POST",
            baseURL: process.env.EVENT_BUS_URL,
            url:"events/subscribe",
            data:{
                microService: "register-user-service",
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

app.listen( port, async () => {
    console.log(`listening at ${port}`)
    await subscribeToEventBusService()
}) 
