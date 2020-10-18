require("dotenv").config()
const dbConnection = require("./src/config/dbConnection")
dbConnection()
const express = require("express")
const helmet = require("helmet")
const morgan = require("morgan")
const cors = require("cors")
const totalsRouter = require("./src/routes/totals.routes")

const app = express()

app.use(express.json())
app.use(morgan("dev"))
app.use(helmet())
app.use(cors())

app.use("/totals", totalsRouter)

module.exports = app