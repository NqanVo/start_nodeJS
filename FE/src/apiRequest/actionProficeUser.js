import axios from "axios";
import Notify from "../components/Notify";
import _ from "lodash"

export const ApiUploadAvatar = async (id, data) => {
    const avatar = data.user_avatar[0]
    const formData = new FormData();
    formData.append('file', avatar);
    const res = await axios.post(`http://localhost:7070/api/v1/upload-avatar/${id}`, formData)
    Notify(res.data.status, res.data.message)
}

export const ApiUploadAlbum = async (id, data) => {
    const album = data.user_album
    const formData = new FormData();
    _.forEach(album, image => {
        formData.append("user_album", image)
    });
    const res = await axios.post(`http://localhost:7070/api/v1/upload-album/${id}`, formData)
    Notify(res.data.status, res.data.message)
    return res.data.data.album
}

export const ApiDeleteImageAlbum = async (id, image) => {
    const res = await axios.delete(`http://localhost:7070/api/v1/delete-image-album/${id}/${image}`)
    Notify(res.data.status, res.data.message)
    return res.data.data.album
}