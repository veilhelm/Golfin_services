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

async function emitPaymentRecordCreated(paymentRecord) {
    const eventType = "PaymentRecordCreated"
    try{
        const event = await axios({
            method: "POST",
            baseURL: process.env.EVENT_BUS_URL,
            url:"events",
            data: {
                type: eventType,
                data: {
                    ...paymentRecord
                }
            }
        }) 
        if(event.status === 400) emitPaymentRecordCreated(paymentRecord)
        console.log(`event ${eventType} sended successfully`)
    }catch(error){
        console.log(`retrying to send event : ${eventType}`)
        setTimeout(()=>{
            emitPaymentRecordCreated(paymentRecord)
        },2000)
    }
}

module.exports= {
    emitGoalCreated,
    emitPaymentRecordCreated
}
