import axios from "axios";
import Notify from "../components/Notify";
import { getAllUsers } from "../redux/getAllUserSlice";

export const ApiGetAllUsers = async (dispatch) => {
    try {
        const res = await axios.get("http://localhost:7070/api/v1/users/")
        dispatch(getAllUsers(res.data.data))
    } catch (error) {
        console.log(error);
    }
}

export const ApiDeleteUser = async (req, dispatch) => {
    try {
        const res = await axios.delete(`http://localhost:7070/api/v1/delete-user/${req}`)
        // console.log(req);
        // console.log(res.data);
        if (res.data.status === 200) {
            Notify(res.data.status, res.data.message)
            dispatch(getAllUsers(res.data.data));
        }
        else
            Notify(res.data.status, res.data.message)

    } catch (error) {
        console.log(error);
    }
}