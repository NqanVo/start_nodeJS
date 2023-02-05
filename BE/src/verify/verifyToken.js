const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")
dotenv.config()

const createJWT = (user_id, user_isAdmin) => {
    let token = null
    try {
        token = jwt.sign({
            idUser: user_id,
            isAdmin: user_isAdmin
        }, process.env.JWT, {
            expiresIn: "2h"
        }, {
            algorithm: "ES256"
        })
        // console.log(token);
    } catch (error) {
        console.log(error);
    }
    return token
}
const verifyJWT = (token) => {
    let data = null
    try {
        const decoded = jwt.verify(token, process.env.JWT)
        data = decoded
        return data
    } catch (error) {
        console.log(error);
        res.status(403).json({
            message: "Bạn cần đăng nhập"
        })
    }
}
const checkToken = (req, res) => {
    const token = req.cookies.access_token
    if (!token)
        res.status(200).json({
            message: "Bạn cần đăng nhập"
        })
    else
        return token
}
const verifyUser = async (req, res, next) => {
    try {
        const token = checkToken(req, res)
        let decoded = verifyJWT(token)
        const req_id = req.body.user_id || req.params.id || decoded.idUser
        if ((req_id == decoded.idUser) || decoded.isAdmin == 1)
            next()
        else
            res.status(200).json({
                message: "Bạn không có quyền"
            })
    } catch (error) {
        next(error)
    }
}
const verifyAdmin = async (req, res, next) => {
    try {
        const token = checkToken(req, res)
        let decoded = verifyJWT(token)
        if (decoded.isAdmin == 1)
            next()
        else
            res.status(200).json({
                message: "Bạn không có quyền"
            })
    } catch (error) {
        // next(error)
        res.status(500).json(error)
    }
}
module.exports = {
    createJWT,
    verifyJWT,
    verifyUser,
    verifyAdmin
}