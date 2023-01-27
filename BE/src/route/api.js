const express = require('express')
const APIController = require('../controller/APIController')
let router = express.Router()

const initAPIRoute = (app) => {
    router.get('/users', APIController.getAllUser)
    router.post('/create-new-user', APIController.createNewUser)
    router.put('/update-user', APIController.updateUser)
    router.delete('/delete-user', APIController.deleteUser)

    return app.use('/api/v1/', router) //url tiền tố trước khi gọi api
}

module.exports = initAPIRoute