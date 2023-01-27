const Pool = require("../config/configDB")

let getAllUser = async (req, res) => {
    const [users, fields] = await Pool.execute('SELECT * FROM `tbl_users`');

    return res.status(200).json({
        message: "ok",
        data: users
    })
}

let createNewUser = async (req, res) => {
    const { user_firstName, user_lastName, user_email, user_phone } = req.body
    if (!user_firstName || !user_lastName || !user_email || !user_phone)
        return res.status(200).json({
            message: "Thiếu thông tin",
        })
    //tao user moi
    await Pool.execute(`INSERT INTO tbl_users(user_firstName,user_lastName,user_email,user_phone) VALUES (?,?,?,?)`,
        [user_firstName, user_lastName, user_email, user_phone])
    //cap nhat lai danh sach users
    const [users, fields] = await Pool.execute('SELECT * FROM `tbl_users`');
    return res.status(200).json({
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

let deleteUser = async (req, res) => {
    const { user_id } = req.body
    if (!user_id)
        return res.status(200).json({
            message: "Thiếu thông tin",
        })
    //delete user
    await Pool.execute(`DELETE FROM tbl_users WHERE user_id = ?`, [user_id])
    //lay danh sach users
    const [users, fields] = await Pool.execute('SELECT * FROM `tbl_users`');

    return res.status(200).json({
        message: "Xóa thành công",
        data: users
    })
}
module.exports = {
    getAllUser,
    createNewUser,
    updateUser,
    deleteUser
}