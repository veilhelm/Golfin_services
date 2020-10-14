const axios = require("axios") 
function emitTransaction(kind) {
    return async function (transaction) {
        try{
            const event = await axios({
                method: "POST",
                baseURL: process.env.EVENT_BUS_URL,
                url:"events",
                data: {
                    type: kind,
                    data: {
                        ...transaction
                    }
                }
            }) 
            if(event.status === 400) emitTransaction(kind)(transaction)
            console.log(`event ${kind} sended successfully`)
        }catch(error){
            console.log(`retrying to send event : ${kind}`)
            setTimeout(async ()=>{
                await emitTransaction(kind)(transaction)
            },2000)
        }
    }
}

module.exports ={
    emitTransaction
} 