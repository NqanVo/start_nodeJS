import axios from "axios";
import { getAllUsers } from "../redux/getAllUserSlice";

export const ApiGetAllUsers = async (dispatch) => {
    try {
        const res = await axios.get("http://localhost:7070/api/v1/users/")
        dispatch(getAllUsers(res.data.data))

    } catch (error) {
        console.log(error);
    }
}