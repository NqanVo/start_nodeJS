import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ApiDeleteUser } from '../apiRequest/ApiDeleteUser';
import { ApiGetAllUsers } from '../apiRequest/ApiGetAllUsers';

const ListUser = () => {
    const users = useSelector((state) => state.listUsers.users)
    const dispatch = useDispatch()
    useEffect(() => {
        ApiGetAllUsers(dispatch)
    }, [])

    const handleDeleteUser = (id) => {
        ApiDeleteUser(id, dispatch)
    }
    return (
        <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
            <thead className="bg-gray-50">
                <tr>
                    <th scope="col" className="px-6 py-4 font-medium text-gray-900">ID</th>
                    <th scope="col" className="px-6 py-4 font-medium text-gray-900">Name</th>
                    <th scope="col" className="px-6 py-4 font-medium text-gray-900">Email</th>
                    <th scope="col" className="px-6 py-4 font-medium text-gray-900">Role</th>
                    <th scope="col" className="px-6 py-4 font-medium text-gray-900">Action</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 border-t border-gray-100">
                {users ? users.map((user) => {
                    return (
                        <tr key={user.user_id} className="hover:bg-gray-50">
                            <td className="px-6 py-4">
                                <div className="font-medium text-gray-700">{user.user_id}</div>
                            </td>
                            <td className="flex gap-3 px-6 py-4 font-normal text-gray-900 items-center">
                                <div className="relative h-10 w-10">
                                    <img
                                        className="h-full w-full rounded-full object-cover object-center"
                                        src={`http://localhost:7070/` + user.user_avatar}
                                        alt=""
                                    />
                                    <span className="absolute right-0 bottom-0 h-2 w-2 rounded-full bg-green-400 ring ring-white"></span>
                                </div>
                                <div className="text-sm">
                                    <div className="font-medium text-gray-700">{user.user_firstName} {user.user_lastName}</div>
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <div className="font-medium text-gray-700">{user.user_email}</div>
                            </td>
                            <td className="px-6 py-4">{user.user_isAdmin ? "Admin" : "User"}</td>
                            <td className="px-6 py-4">
                                <div className="flex gap-4">
                                    <Link to={`/detail/user/${user.user_id}`}>Detail</Link>
                                    <Link to={`/detail/user-update/${user.user_id}`}>Update</Link>
                                    <p onClick={() => handleDeleteUser(user.user_id)}>Delete</p>
                                </div>
                            </td>
                        </tr>
                    )
                }
                ) : (
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                )}
            </tbody>
        </table>
    );
};

export default ListUser;