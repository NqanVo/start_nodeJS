const express = require('express')
const homeController = require('../controller/homeController')
let router = express.Router()

const initWebRoute = (app) => {
    router.get('/', homeController.getHomepage)
    router.get('/detail/user/:idUser', homeController.getUserpage)
    router.post('/create-new-user', homeController.createNewUser)
    router.post('/delete-user', homeController.deleteUser)
    router.post('/update-user', homeController.updateUser)
    router.get('/get-files-upload', homeController.getUploadFile)
    router.post('/upload-profile-image', homeController.uploadFile)
    return app.use('/', router)
}

module.exports = initWebRoute