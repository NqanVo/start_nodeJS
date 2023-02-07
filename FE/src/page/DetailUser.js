import axios from 'axios';
import React, { useEffect, useState } from 'react';
import DefaultPage from "../components/DefaultPage"
import { AiOutlineCloudUpload, AiOutlineEdit, AiOutlineClose } from "react-icons/ai"
import { useForm } from 'react-hook-form';
import { ApiDeleteImageAlbum, ApiUploadAlbum, ApiUploadAvatar } from '../apiRequest/actionProficeUser';
const DetailUser = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    let idUser = (window.location.pathname).split("/")[3]
    const [detailUser, setDetailUser] = useState()
    const [avatar, setAvartar] = useState()
    const [albumUser, setAlbumUser] = useState({})
    const [openUploadAvatar, setOpenUploadAvatar] = useState(false)

    //api get detail profice
    useEffect(() => {
        const getDetailUser = async () => {
            const res = await axios.get(`http://localhost:7070/api/v1/users/${idUser}`)
            setDetailUser(res.data.data)
            setAlbumUser(res.data.data.album)
        }
        getDetailUser()
    }, [])
    //api up avatar
    const onSubmitUploadAvatar = async (data) => {
        ApiUploadAvatar(idUser, data)
    }
    //api up album
    const onSubmitUploadAlbum = async (data) => {
        const res = await ApiUploadAlbum(idUser, data)
        setAlbumUser(res)
    }
    //api delete image in album
    const handleDeleteImageAlbum = async (id, image) => {
        const res = await ApiDeleteImageAlbum(id, image)
        setAlbumUser(res)
    }
    //review image befor send to server
    useEffect(() => {
        if (watch("user_avatar")) {
            if (watch("user_avatar")[0]) {
                avatar && URL.revokeObjectURL(avatar)
                const file = watch("user_avatar")[0]
                file.preview = URL.createObjectURL(file)
                return setAvartar(file.preview)
            }
        }
    }, [watch("user_avatar")])


    return (
        <DefaultPage>
            {detailUser ? (
                <div className='w-full min-h-screen flex flex-col justify-center items-center relative'>
                    <div className="p-4 w-96 h-32 bg-white rounded-xl shadow-md flex gap-4 relative">
                        <div className="cursor-pointer group  bg-black rounded-full" onClick={() => setOpenUploadAvatar(!openUploadAvatar)}>
                            <img src={`http://localhost:7070/${detailUser.user_avatar}`} alt="" className='group-hover:opacity-70 w-full h-full object-contain rounded-full' />
                        </div>
                        <div className="">
                            <h1>Full Name: {detailUser.user_firstName} {detailUser.user_lastName}</h1>
                            <p>Phone: {detailUser.user_phone}</p>
                            <p>Email: {detailUser.user_email}</p>
                            <p>Role: {detailUser.user_isAdmin ? "Admin" : "User"}</p>
                        </div>
                        <div
                            onClick={() => setOpenUploadAvatar(!openUploadAvatar)}
                            className="absolute right-16 -top-3 w-10 h-10 bg-green-500 flex justify-center items-center rounded-full text-white font-bold cursor-pointer hover:scale-105 transition-all">
                            <AiOutlineCloudUpload></AiOutlineCloudUpload>
                        </div>
                        <div className="absolute right-3 -top-3 w-10 h-10 bg-green-500 flex justify-center items-center rounded-full text-white font-bold cursor-pointer hover:scale-105 transition-all">
                            <AiOutlineEdit></AiOutlineEdit>
                        </div>
                    </div>
                    {openUploadAvatar && (
                        <form onSubmit={handleSubmit(onSubmitUploadAvatar)} className='absolute w-96 h-96 bg-white z-10'>
                            <div
                                onClick={() => setOpenUploadAvatar(!openUploadAvatar)}
                                className="absolute right-16 -top-3 w-10 h-10 bg-green-500 flex justify-center items-center rounded-full text-white font-bold cursor-pointer hover:scale-105 transition-all">
                                <AiOutlineClose></AiOutlineClose>
                            </div>
                            <input
                                type="file"
                                multiple={false}
                                name="user_avatar"
                                id="user_avatar"
                                {...register("user_avatar", { required: true })}
                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                            />
                            {errors.user_avatar && <span className='text-red-500'>Chưa chọn ảnh</span>}
                            <input type="submit" />
                            <img src={avatar && avatar} alt="" className='w-44 h-44 object-cover' />
                        </form>
                    )}
                    <form onSubmit={handleSubmit(onSubmitUploadAlbum)} className=' w-96 h-96 bg-white z-10'>

                        <input
                            type="file"
                            multiple={true}
                            name="user_avatar"
                            id="user_avatar"
                            {...register("user_album", { required: true })}
                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                        />
                        {errors.user_avatar && <span className='text-red-500'>Chưa chọn ảnh</span>}
                        <input type="submit" />
                    </form>

                    <div className="max-w-4xl grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 justify-center items-center gap-3">
                        {
                            albumUser ? albumUser.map((image) => (
                                <div key={image.album_id} className="w-full h-40 relative">
                                    <div
                                        onClick={() => handleDeleteImageAlbum(idUser, image.album_image)}
                                        className="absolute right-2 top-2 w-10 h-10 rounded-full bg-red-500 text-white flex justify-center items-center">
                                        <AiOutlineClose></AiOutlineClose>
                                    </div>
                                    <img src={`http://localhost:7070/${image.album_image}`} alt="" className='w-full h-full object-cover' />
                                </div>
                            )) : ""
                        }
                    </div>
                </div>
            ) : "Not Found"}


        </DefaultPage>
    );
};

export default DetailUser;