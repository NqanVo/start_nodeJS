const express = require('express')
const APIController = require('../controller/APIController')
const { midlewareUploadImage } = require('../midleware/midlewareUploadImage')
const { verifyUser, verifyAdmin } = require("../verify/verifyToken")
let router = express.Router()

const initAPIRoute = (app) => {
    router.post('/login', APIController.login)
    router.post('/logout', APIController.logout)
    router.post('/create-new-user', APIController.createNewUser)
    router.get('/get-default-avatar', APIController.getDefaultAvatar)

    //quyen user admin
    router.delete('/delete-user/:id', verifyAdmin, APIController.deleteUser)
    //quyen user binh thuong + admin
    router.get('/users', verifyUser, APIController.getAllUser)
    router.get('/users/:id', verifyUser, APIController.checkInfoUser)
    router.put('/update-password', verifyUser, APIController.updatePassword)
    router.put('/update-user', verifyUser, APIController.updateUser)

    router.post('/upload-avatar/:id', verifyUser, midlewareUploadImage, APIController.uploadAvatar)
    router.post('/upload-album/:id', verifyUser, APIController.uploadAlbum)
    router.delete('/delete-image-album/:id/:image', verifyUser, APIController.deleteImageAlbum)
    return app.use('/api/v1/', router) //url tiền tố trước khi gọi api
}

module.exports = initAPIRoute