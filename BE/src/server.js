const express = require('express')
const initWebRoute = require('./route/web')
const initAPIRoute = require('./route/api')
const connection = require("./config/configDB")
const cors = require('cors')
require('dotenv').config()
const app = express()
const port = process.env.PORT || 3030
app.use(cors())

//config giup client gui data len server don gian hon
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

connection
initWebRoute(app)
initAPIRoute(app) //khai bao api

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})