import axios from "axios";
import Notify from "../components/Notify";
import { getAllUsers } from "../redux/getAllUserSlice";

export const ApiDeleteUser = async (req, dispatch) => {
    try {
        // const userInfo = {
        //     user_id: req
        // }
        const res = await axios.delete(`http://localhost:7070/api/v1/delete-user/${req}`)
        console.log(req);
        console.log(res.data);
        if (res.data.status === 200) {
            Notify(res.data.status, res.data.message)
            dispatch(getAllUsers(res.data.data));
        }
        else
            Notify(res.data.status, res.data.message)

    } catch (error) {

    }
}