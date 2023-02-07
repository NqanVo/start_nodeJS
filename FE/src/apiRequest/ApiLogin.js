import axios from "axios";
import Notify from "../components/Notify";
import { loginError, loginStart, loginSuccess } from "../redux/authSlice";

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

