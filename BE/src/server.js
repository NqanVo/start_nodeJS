const express = require('express')
const cors = require('cors')
require('dotenv').config()
const initWebRoute = require('./route/web')
const initAPIRoute = require('./route/api')
const connection = require("./config/configDB")
const cookieParser = require('cookie-parser')
const fileUpload = require("express-fileupload")
const app = express()
const port = process.env.PORT || 3030

app.use(cors(
    {
        origin: true,
        credentials: true
    }
))
app.use(cookieParser())
//config giup client gui data len server don gian hon
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(fileUpload({
    createParentPath: true
}))
app.use(express.static('./src/uploads/'))
// connection
initWebRoute(app)
initAPIRoute(app) //khai bao api
//404
app.use((req, res) => {
    return res.send("404")
})

app.listen(port, () => {
    connection
    console.log(`Connect success server + DB: ${port}`)
})