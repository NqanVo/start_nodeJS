import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux"
import { ApiLogout } from '../apiRequest/ApiLogout';
const Header = () => {
    const { user_id, user_firstName, user_lastName } = useSelector((state) => state.auth.login.dataUser)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const handleLogout = () => {
        ApiLogout(dispatch, navigate)
    }
    return (
        <header className='h-40 w-full mx-auto bg-slate-300'>
            {
                user_id ? (
                    <ul className="w-full h-full flex justify-center items-center">
                        <li className="mr-6">
                            <Link to={`/logout`} className='font-bold text-blue-500 hover:text-blue-800' onClick={handleLogout}>Đăng xuất</Link>
                        </li>
                        <li className="mr-6">
                            <Link to={`/detail/user/${user_id}`} className='font-bold text-blue-500 hover:text-blue-800'>{"Hello: " + user_firstName + " " + user_lastName}</Link>
                        </li>
                    </ul>
                ) : (
                    <ul className="w-full h-full flex justify-center items-center">
                        <li className="mr-6">
                            <Link to={`/register`} className='font-bold text-blue-500 hover:text-blue-800'>Đăng ký</Link>
                        </li>
                        <li className="mr-6">
                            <Link to={`/login`} className='font-bold text-blue-500 hover:text-blue-800'>Đăng nhập</Link>
                        </li>
                    </ul>
                )
            }

        </header>
    );
};

export default Header;