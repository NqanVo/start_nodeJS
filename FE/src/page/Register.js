import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { ApiRegister } from '../apiRequest/ApiRegister';
import DefaultPage from '../components/DefaultPage';

const Register = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const issetUser = useSelector((state) => state.auth.login.dataUser)
    const [defaultAvatars, setDefaultAvatars] = useState([])
    const [defaultAvatar, setDefaultAvatar] = useState()
    if (issetUser.user_id)
        setTimeout(() => {
            navigate("/")
        }, 0)
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = (data) => {

        ApiRegister({ ...data, user_avatar: defaultAvatar }, dispatch, navigate)
    }
    const handleChoseAvatar = (item) => {
        setDefaultAvatar(item)
    }
    useEffect(() => {
        const getDefaultAvatar = async () => {
            const res = await axios.get("http://localhost:7070/api/v1/get-default-avatar")
            setDefaultAvatars(res.data.data);
            setDefaultAvatar(res.data.data[0])
        }
        getDefaultAvatar()
    }, [])
    return (
        <DefaultPage>
            <Link to="/login">login</Link>
            <form onSubmit={handleSubmit(onSubmit)} method="POST" className='mix-w-[768px] mx-auto flex flex-col'>
                <div className="-mx-3 flex flex-wrap">
                    <div className="w-full px-3 sm:w-1/2">
                        <div className="mb-5">
                            <label
                                htmlFor="firstName"
                                className="mb-3 block text-base font-medium text-[#07074D]"
                            >
                                First name
                            </label>
                            <input
                                type="text"
                                id="firstName"
                                {...register("user_firstName", { required: true })}
                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                            />
                            {errors.user_email && <span className='text-red-500'>Only lowercase or uppercase characters</span>}
                        </div>
                    </div>
                    <div className="w-full px-3 sm:w-1/2">
                        <div className="mb-5">
                            <label
                                htmlFor="lastName"
                                className="mb-3 block text-base font-medium text-[#07074D]"
                            >
                                Last name
                            </label>
                            <input
                                type="text"
                                id="lastName"
                                {...register("user_lastName", { required: true })}
                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                            />
                            {errors.user_password && <span className='text-red-500'>Only lowercase or uppercase characters</span>}
                        </div>
                    </div>
                </div>
                <div className="mb-5">
                    <label
                        htmlFor="phone"
                        className="mb-3 block text-base font-medium text-[#07074D]"
                    >
                        Phone number
                    </label>
                    <input
                        type="tel"
                        name="phone"
                        {...register("user_phone", { required: true, pattern: /^[0-9]*$/ })}
                        className="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    />
                    {errors.user_phone && <span className='text-red-500'>Invalid phone number</span>}
                </div>
                <div className="-mx-3 flex flex-wrap">
                    <div className="w-full px-3 sm:w-1/2">
                        <div className="mb-5">
                            <label
                                htmlFor="email"
                                className="mb-3 block text-base font-medium text-[#07074D]"
                            >
                                Email
                            </label>
                            <input
                                type="email"
                                name="user_email"
                                id="email"
                                {...register("user_email", { required: true })}
                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                            />
                            {errors.user_email && <span className='text-red-500'>Invalid email</span>}
                        </div>
                    </div>
                    <div className="w-full px-3 sm:w-1/2">
                        <div className="mb-5">
                            <label
                                htmlFor="password"
                                className="mb-3 block text-base font-medium text-[#07074D]"
                            >
                                Password
                            </label>
                            <input
                                type="password"
                                name="user_password"
                                id="password"
                                {...register("user_password", { required: true })}
                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                            />
                            {errors.user_password && <span className='text-red-500'>Do not leave the password blank</span>}
                        </div>
                    </div>
                </div>
                <div>
                    <input
                        type="submit"
                        value={"Register"}
                        className="cursor-pointer hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none"
                    />
                </div>
            </form>
            <div className="flex gap-3 justify-center">
                {
                    defaultAvatars ? defaultAvatars.map((item) => (
                        <div key={item} className={`w-20 h-20 ${defaultAvatar === item ? "border-green-400" : "border-white"} border-[2px] rounded-lg overflow-hidden cursor-pointer`}>
                            <img
                                src={`http://localhost:7070/${item}`}
                                alt=""
                                className='w-full h-full object-cover'
                                onClick={() => { handleChoseAvatar(item) }}
                            />
                        </div>
                    )) : ""
                }
            </div>
        </DefaultPage>
    );
};

export default Register;