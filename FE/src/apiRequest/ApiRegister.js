import axios from "axios";
import Notify from "../components/Notify";
import { registerStart, registerSuccess, registerError } from "../redux/authSlice";

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