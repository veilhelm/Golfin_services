const axios = require("axios") 
async function emitUserLogged(userCredentials) {
    const eventType = "userLogged"
    try{
        const event = await axios({
            method: "POST",
            baseURL: process.env.EVENT_BUS_URL,
            url:"events",
            data: {
                type: eventType,
                data: {
                    ...userCredentials
                }
            }
        }) 
        if(event.status === 400) emitUserLogged(userCredentials)
        console.log(`event ${eventType} sended successfully`)
    }catch(error){
        console.log(`retrying to send event : ${eventType}`)
        setTimeout(()=>{
            emitUserLogged(userCredentials)
        },2000)
    }
}

module.exports ={
    emitUserLogged
} 