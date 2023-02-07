import axios from "axios";
import Notify from "../components/Notify";
import {
    registerStart,
    registerSuccess,
    registerError,
    loginError,
    loginStart,
    loginSuccess,
    logoutError,
    logoutStart,
    logoutSuccess
} from "../redux/authSlice";

export const ApiRegister = async (req, dispatch, navigate) => {
    dispatch(registerStart())
    try {
        const res = await axios.post("http://localhost:7070/api/v1/create-new-user", req)
        if (res.data.status == 200) {
            Notify(res.data.status, res.data.message)
            dispatch(registerSuccess())
            setTimeout(() => {
                navigate("/login")
            }, 1000)
        }
        else {
            Notify(res.data.status, res.data.message)
            dispatch(registerError())
        }
    } catch (error) {
        dispatch(registerError())
    }
}

export const ApiLogin = async (reqUser, dispatch, navigate) => {
    dispatch(loginStart())
    try {
        const res = await axios.post("http://localhost:7070/api/v1/login", reqUser)
        if (res.data.status == 200) {
            dispatch(loginSuccess(res.data.data))
            localStorage.setItem("dataUser", JSON.stringify(res.data.data))
            navigate("/")
        }
        else {
            Notify(res.data.status, res.data.message)
            dispatch(loginError())
        }

    } catch (error) {
        dispatch(loginError())
    }
}


export const ApiLogout = async (dispatch, navigate) => {
    dispatch(logoutStart())
    try {
        await axios.post("http://localhost:7070/api/v1/logout")
        dispatch(logoutSuccess())
        localStorage.removeItem("dataUser")
        navigate("/login")
    } catch (error) {
        dispatch(logoutError())
    }
}