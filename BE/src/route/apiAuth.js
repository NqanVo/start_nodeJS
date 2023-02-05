const express = require('express')
let router = express.Router()

const apiAuth = (app) => {
    router.post('/login', APIController.login)
    router.post('/create-new-user', APIController.createNewUser)

    return app.use('/api/v1/', router) //url tiền tố trước khi gọi api
}

