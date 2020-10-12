const axios = require("axios") 
async function emitTransactionCreated(transaction) {
    const eventType = "transactionCreated"
    try{
        const event = await axios({
            method: "POST",
            baseURL: process.env.EVENT_BUS_URL,
            url:"events",
            data: {
                type: eventType,
                data: {
                    ...transaction
                }
            }
        }) 
        if(event.status === 400) emitTransactionCreated(transaction)
        console.log(`event ${eventType} sended successfully`)
    }catch(error){
        console.log(`retrying to send event : ${eventType}`)
        setTimeout(()=>{
            emitTransactionCreated(transaction)
        },2000)
    }
}

module.exports ={
    emitTransactionCreated
} 