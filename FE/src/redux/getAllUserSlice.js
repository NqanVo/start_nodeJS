import { createSlice } from "@reduxjs/toolkit";

const getAllUsersSlice = createSlice({
    name: "listUser",
    initialState: {
        users: []
    },
    reducers: {
        getAllUsers: (state, action) => {
            state.users = action.payload
        }
    }
})

export const {
    getAllUsers
} = getAllUsersSlice.actions

export default getAllUsersSlice.reducer