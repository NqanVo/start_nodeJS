const Pool = require("../config/configDB")
const { createJWT } = require("../verify/verifyToken")
const bcrypt = require("bcrypt")
const fs = require('fs')
const _ = require("lodash")
let removeAvatarOld = async (user_id) => {
    const [user] = await Pool.execute(`SELECT user_avatar FROM tbl_users WHERE user_id=?`, [user_id])
    const avatar = user[0].user_avatar
    if (avatar.indexOf("defaultAvatar") !== 0)
        fs.unlinkSync(`./src/uploads/${avatar}`)
}

let login = async (req, res, next) => {

    const { user_email, user_password } = req.body
    let comparePassword = null
    try {
        const [user, fields] = await Pool.execute("SELECT * FROM tbl_users WHERE user_email = ?", [user_email])
        if (user[0]) {
            comparePassword = await bcrypt.compare(user_password, user[0].user_password)
            if (comparePassword) {
                const token = createJWT(user[0].user_id, user[0].user_isAdmin)
                const { user_password, ...orthers } = user[0]
                res
                    .cookie("access_token", token, { secure: false, httpOnly: true })
                    .status(200)
                    .json({
                        status: 200,
                        message: "Đăng nhập thành công",
                        user_id: user[0].user_id,
                        data: { ...orthers }
                    })
            }
            else
                res.status(200).json({
                    status: 502,
                    message: "Thông tin đăng nhập không hợp lệ pass" //sai mat khau
                })
        }
        else
            res.status(200).json({
                status: 502,
                message: "Thông tin đăng nhập không hợp lệ email" //khong ton tai email
            })

    } catch (error) {
        next(error)
    }

}

let logout = async (req, res, next) => {
    res.clearCookie("access_token").status(200).json({
        message: "Logout thành công"
    });
}

let getDefaultAvatar = async (req, res) => {
    const files = fs.readdirSync('./src/uploads/')
    res.status(200).json({
        data: files
    })
}

let checkInfoUser = async (req, res) => {
    const req_id = req.params.id
    const [user] = await Pool.execute(`SELECT * FROM tbl_users WHERE user_id=?`, [req_id])
    const [album] = await Pool.execute(`SELECT * FROM tbl_album WHERE user_id=?`, [req_id])
    const { user_password, ...orthers } = user[0]
    // console.log({ ...orthers, album })
    res.status(200).json({
        message: "Lay dữ liệu thành công",
        data: { ...orthers, album }
    })
}

let getAllUser = async (req, res) => {
    const [users, fields] = await Pool.execute('SELECT * FROM `tbl_users`');

    return res.status(200).json({
        message: "ok",
        data: users
    })
}

let createNewUser = async (req, res) => {
    const { user_firstName, user_lastName, user_email, user_phone, user_password, user_avatar } = req.body
    const user_isAdmin = false
    if (!user_firstName || !user_lastName || !user_email || !user_phone || !user_password)
        return res.status(200).json({
            status: 502,
            message: "Thiếu thông tin",
        })
    let [checkEmail, orther] = await Pool.execute('SELECT * FROM tbl_users WHERE user_email=?', [user_email])

    if (checkEmail[0])
        return res.status(200).json({ status: 502, message: "Email đã tồn tại" })
    else {
        const salt = await bcrypt.genSalt(10)
        const hashed = await bcrypt.hash(user_password, salt)
        await Pool.execute(`INSERT INTO tbl_users(user_firstName,user_lastName,user_email,user_phone,user_password,user_isAdmin,user_avatar) VALUES (?,?,?,?,?,?,?)`,
            [user_firstName, user_lastName, user_email, user_phone, hashed, user_isAdmin, user_avatar])
    }
    //cap nhat lai danh sach users
    const [users, fields] = await Pool.execute('SELECT * FROM `tbl_users`');
    return res.status(200).json({
        status: 200,
        message: "Tạo user mới thành công",
        data: users
    })
}

let updateUser = async (req, res) => {
    const { user_id, user_firstName, user_lastName, user_email, user_phone } = req.body
    if (!user_id || !user_firstName || !user_lastName || !user_email || !user_phone)
        return res.status(200).json({
            message: "Thiếu thông tin",
        })
    //update user
    await Pool.execute(`UPDATE tbl_users SET user_firstName = ?, user_lastName = ?, user_email = ?, user_phone= ? WHERE user_id = ?`,
        [user_firstName, user_lastName, user_email, user_phone, user_id])
    //lay thong tin users
    const [users, fields] = await Pool.execute('SELECT * FROM `tbl_users` WHERE user_id=?', [user_id]);

    return res.status(200).json({
        message: "Cập nhật thành công",
        data: users
    })
}

let updatePassword = async (req, res) => {
    const { user_id, user_password, user_password_new } = req.body
    const [user] = await Pool.execute("SELECT user_password FROM tbl_users WHERE user_id=?", [user_id])
    let comparePassword = null
    comparePassword = await bcrypt.compare(user_password, user[0].user_password)
    if (comparePassword) {
        const salt = await bcrypt.genSalt(10)
        const hashed = await bcrypt.hash(user_password_new, salt)
        await Pool.execute("UPDATE tbl_users SET user_password =? WHERE user_id = ?", [hashed, user_id])
        res.status(200).json({
            message: "cap nhật mat khẩu thành công"
        })
    }
    else
        res.status(500).json({
            message: "Sai mật khẩu cũ"
        })

}

let deleteUser = async (req, res) => {
    const user_id = req.params.id
    if (!user_id)
        return res.status(200).json({
            status: 502,
            message: "Thiếu thông tin",
        })
    //remove avatar
    removeAvatarOld(user_id)
    //delete user
    await Pool.execute(`DELETE FROM tbl_users WHERE user_id = ?`, [user_id])
    //lay danh sach users
    const [users, fields] = await Pool.execute('SELECT * FROM `tbl_users`');

    return res.status(200).json({
        status: 200,
        message: "Xóa thành công",
        data: users
    })
}

let uploadAvatar = async (req, res) => {
    try {
        let avatar = req.files.file
        let user_id = req.params.id
        //remove avatar
        removeAvatarOld(user_id)
        const rename = await avatar.name.split(".")[0] + Date.now() + "." + avatar.mimetype.split("/")[1]
        avatar.mv('./src/uploads/' + rename)
        await Pool.execute("UPDATE tbl_users SET user_avatar = ? WHERE user_id=?", [rename, user_id])
        res.status(200).json({
            status: 200,
            message: "Tai anh thanh cong",
            data: {
                name: rename,
                mimetype: avatar.mimetype,
                size: avatar.size
            }
        })

    } catch (error) {
        res.status(500).send(error)
    }
}

let uploadAlbum = async (req, res) => {
    if (req.files) {
        const user_id = req.params.id
        if (req.files.user_album.length >= 2) {
            for (let i in req.files.user_album) {
                let image = req.files.user_album[i]
                let rename = await image.name.split(".")[0] + Date.now() + "." + image.mimetype.split("/")[1]
                image.mv('./src/uploads/' + rename)
                await Pool.execute(`INSERT INTO tbl_album(user_id ,album_image) VALUES (?,?)`, [user_id, rename])
            }
        }
        else {
            let image = req.files.user_album
            let rename = await image.name.split(".")[0] + Date.now() + "." + image.mimetype.split("/")[1]
            image.mv('./src/uploads/' + rename)
            await Pool.execute(`INSERT INTO tbl_album(user_id ,album_image) VALUES (?,?)`, [user_id, rename])
        }
        const [album] = await Pool.execute(`SELECT * FROM tbl_album WHERE user_id=?`, [user_id])
        res.status(200).json({
            status: 200,
            message: "Tai anh thanh cong",
            data: { album }
        })
    }
    else {
        console.log("no")
    }
}

let deleteImageAlbum = async (req, res) => {
    const user_id = req.params.id
    const user_album = req.params.image
    await Pool.execute("DELETE FROM tbl_album WHERE user_id = ? AND album_image = ?", [user_id, user_album])
    fs.unlinkSync(`./src/uploads/${user_album}`)
    const [album] = await Pool.execute(`SELECT * FROM tbl_album WHERE user_id=?`, [user_id])
    res.status(200).json({
        status: 200,
        message: "Xoa anh thanh cong",
        data: { album }
    })
}
module.exports = {
    getAllUser,
    createNewUser,
    updateUser,
    deleteUser,
    login,
    checkInfoUser,
    updatePassword,
    logout,
    uploadAvatar,
    getDefaultAvatar,
    uploadAlbum,
    deleteImageAlbum
}