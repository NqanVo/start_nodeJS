import axios from "axios";
import { logoutError, logoutStart, logoutSuccess } from "../redux/authSlice";

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