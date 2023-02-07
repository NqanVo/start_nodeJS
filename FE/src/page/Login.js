import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import DefaultPage from '../components/DefaultPage';
import { ApiLogin } from "../apiRequest/ApiLogin"
const Login = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const loading = useSelector((state) => state.auth.login.loading)
    const issetUser = useSelector((state) => state.auth.login.dataUser)
    if (issetUser.user_id)
        setTimeout(() => {
            navigate("/")
        }, 0)
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = async (data) => {
        ApiLogin(data, dispatch, navigate)
    }
    // pattern: /^[0-9]*$/
    return (
        <DefaultPage>
            {loading && <div style={{ width: "100px", hight: "100px", backgroundColor: "red" }}></div>}
            <Link to="/register">Đăng ký</Link>
            <form onSubmit={handleSubmit(onSubmit)} method="POST" className='mix-w-[768px] mx-auto flex flex-col'>
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
                            {errors.user_email && <span className='text-red-500'>Số điện thoại không hợp lệ</span>}
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
                            {errors.user_password && <span className='text-red-500'>Chưa điền password</span>}
                        </div>
                    </div>
                </div>
                <div>
                    <input
                        type="submit"
                        value={"Login"}
                        className="cursor-pointer hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none"
                    />
                </div>
            </form>
        </DefaultPage>
    );
};

export default Login;