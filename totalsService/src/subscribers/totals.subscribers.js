const axios = require("axios") 
async function emitTotalsCreated(totals) {
    const eventType = "totalsCreated"
    try{
        const event = await axios({
            method: "POST",
            baseURL: process.env.EVENT_BUS_URL,
            url:"events",
            data: {
                type: eventType,
                data: {
                    ...totals
                }
            }
        }) 
        if(event.status === 400) emitTotalsCreated(totals)
        console.log(`event ${eventType} sended successfully`)
    }catch(error){
        console.log(`retrying to send event : ${eventType}`)
        setTimeout(()=>{
            emitTotalsCreated(totals)
        },2000)
    }
}
async function emitTotalsUpdated(totals) {
    const eventType = "totalsUpdated"
    try{
        const event = await axios({
            method: "POST",
            baseURL: process.env.EVENT_BUS_URL,
            url:"events",
            data: {
                type: eventType,
                data: {
                    ...totals
                }
            }
        }) 
        if(event.status === 400) emitTotalsUpdated(totals)
        console.log(`event ${eventType} sended successfully`)
    }catch(error){
        console.log(`retrying to send event : ${eventType}`)
        setTimeout(()=>{
            emitTotalsUpdated(totals)
        },2000)
    }
}

module.exports ={
    emitTotalsCreated,
    emitTotalsUpdated,
} 