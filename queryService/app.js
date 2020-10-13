require("dotenv").config()
const dbConnection = require("./config/dbConnection")
dbConnection()
const express = require("express")
const helmet = require("helmet")
const morgan = require("morgan")
const cors = require("cors")
const queryRouter = require("./routes/query.routes")

const app = express()

app.use(express.json())
app.use(morgan("dev"))
app.use(helmet())
app.use(cors())

app.use("/query", queryRouter)

module.exports = app