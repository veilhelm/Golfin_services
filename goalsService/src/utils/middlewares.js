const jwt = require("jsonwebtoken")

const authMiddleware = async function( req, res, next){
    const token = req.headers["authorization"] ? req.headers["authorization"].replace("Bearer ", "") : null
    try{
        const userId = jwt.verify(token, process.env.SECRET_KEY)
        req.userId = userId
        next()
    }catch(err){
        res.status(401).json("the user is not authorized. Please provide a valid token to proceed")
    }  
}

module.exports = {
    authMiddleware,
}