const express = require('express')
const homeController = require('../controller/homeController')
let router = express.Router()
const multer = require("multer")
const path = require("path")
const appRoot = require("app-root-path")

//validate file
const imageFilter = function (req, file, cb) {
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        req.fileValidationError = 'Only image files are allowed!';
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};
//noi luu va doi ten file
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, appRoot + '/src/public/image/');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});
let upload = multer({ storage: storage, fileFilter: imageFilter })
let uploadMultiple = multer({ storage: storage, fileFilter: imageFilter }).array('multiple_pic', 3)
let middlewareMultiple = (req, res, next) => {
    uploadMultiple(req, res, (err) => {
        if (err instanceof multer.MulterError && err.code === "LIMIT_UNEXPECTED_FILE")
            res.send('LIMIT_UNEXPECTED_FILE')
        else if (err)
            res.send(err)
        else
            next()
    })
}
const initWebRoute = (app) => {
    router.get('/', homeController.getHomepage)
    router.get('/detail/user/:idUser', homeController.getUserpage)
    router.post('/create-new-user', homeController.createNewUser)
    router.post('/delete-user', homeController.deleteUser)
    router.post('/update-user', homeController.updateUser)
    router.get('/get-files-upload', homeController.getUploadFile)
    router.post('/upload-profile-image', upload.single('profile_pic'), homeController.uploadSingleFile)
    router.post('/upload-multiple-image', middlewareMultiple, homeController.uploadMultipleFile)
    return app.use('/', router)
}

module.exports = initWebRoute