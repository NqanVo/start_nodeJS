const { json } = require("express");
const Pool = require("../config/configDB")


let getHomepage = async (req, res) => {
    const [rows, fields] = await Pool.execute('SELECT * FROM `tbl_users`');
    return res.send(rows)
}
let getUserpage = async (req, res) => {
    let idUser = req.params.idUser
    const [user, fields] = await Pool.execute(`SELECT * FROM tbl_users WHERE user_id = ?`, [idUser]);
    return res.send(user[0])
}
let createNewUser = async (req, res) => {
    const { user_firstName, user_lastName, user_email, user_phone } = req.body.userInfo
    await Pool.execute(`INSERT INTO tbl_users(user_firstName,user_lastName,user_email,user_phone) VALUES (?,?,?,?)`,
        [user_firstName, user_lastName, user_email, user_phone])
    return res.redirect("/")
}

let deleteUser = async (req, res) => {
    // console.log(req.body.userInfo);
    const { user_id } = req.body
    await Pool.execute(`DELETE FROM tbl_users WHERE user_id = ?`, [user_id])
    return res.redirect("/")
}

let updateUser = async (req, res) => {
    const { user_firstName, user_lastName, user_email, user_phone, user_id } = req.body.userInfo
    await Pool.execute(`UPDATE tbl_users SET user_firstName = ?, user_lastName = ?, user_email = ?, user_phone= ? WHERE user_id = ?`,
        [user_firstName, user_lastName, user_email, user_phone, user_id])
    return res.redirect(`/detail/user/${user_id}`)
}
let getUploadFile = async (req, res) => {
    return res.status(200).json({
        message: "image nè"
    })
}

let uploadSingleFile = async (req, res) => {
    console.log(req.file);
    if (req.fileValidationError) {
        return res.send(req.fileValidationError);
    }
    else if (!req.file) {
        return res.send('Please select an image to upload');
    }

    res.send(`You have uploaded this image: <hr/><img src="/image/${req.file.filename}" width="500"><hr /><a href="/upload">Upload another image</a>`);
    // });
}

let uploadMultipleFile = async (req, res) => {

    console.log(req.files);
    if (req.fileValidationError) {
        return res.send(req.fileValidationError);
    }
    else if (!req.files) {
        return res.send('Please select an image to upload');
    }

    let result = "You have uploaded these images: <hr />";
    const files = req.files;
    let index, len;

    // Loop through all the uploaded images and display them on frontend
    for (index = 0, len = files.length; index < len; ++index) {
        result += `<img src="/image/${files[index].filename}" width="300" style="margin-right: 20px;">`;
    }
    result += '<hr/><a href="/upload">Upload more images</a>';
    res.send(result);


    // res.send("heelo")
}
module.exports = {
    getHomepage,
    getUserpage,
    createNewUser,
    deleteUser,
    updateUser,
    getUploadFile,
    uploadSingleFile,
    uploadMultipleFile
}