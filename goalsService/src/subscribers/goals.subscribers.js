const axios = require("axios")

async function emitGoalCreated(goal) {
    const eventType = "goalCreated"
    try{
        const event = await axios({
            method: "POST",
            baseURL: process.env.EVENT_BUS_URL,
            url:"events",
            data: {
                type: eventType,
                data: {
                    ...goal
                }
            }
        }) 
        if(event.status === 400) emitGoalCreated(goal)
        console.log(`event ${eventType} sended successfully`)
    }catch(error){
        console.log(`retrying to send event : ${eventType}`)
        setTimeout(()=>{
            emitGoalCreated(goal)
        },2000)
    }
}

module.exports= {
    emitGoalCreated
}
