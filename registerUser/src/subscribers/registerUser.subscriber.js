const axios = require("axios") 
async function emitUserRegistered(user) {
    const eventType = "userCreated"
    try{
        const event = await axios({
            method: "POST",
            baseURL: process.env.EVENT_BUS_URL,
            url:"events",
            data: {
                type: eventType,
                data: {
                    ...user
                }
            }
        }) 
        if(event.status === 400) emitUserRegistered(user)
        console.log(`event ${eventType} sended successfully`)
    }catch(error){
        console.log(`retrying to send event : ${eventType}`)
        setTimeout(()=>{
            emitUserRegistered(user)
        },2000)
    }
}

module.exports ={
    emitUserRegistered
} 