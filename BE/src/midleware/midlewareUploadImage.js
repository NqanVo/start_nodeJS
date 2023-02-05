const midlewareUploadImage = async (req, res, next) => {
    if (!req.files)
        return res.status(200).json({
            status: 502,
            message: "Chưa chọn ảnh"
        })
    let avatarSize = req.files.file.size
    if (avatarSize >= 200000)
        return res.status(200).json({
            status: 502,
            message: "Kích thước không được vượt quá 200kb"
        })
    let avatarType = req.files.file.mimetype.split("/")[1]
    if (!avatarType.match(/(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/))
        return res.status(200).json({
            status: 502,
            message: "File ảnh không hợp lệ"
        })
    return next()
}

module.exports = {
    midlewareUploadImage
}