import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        loading: false,
        login: {
            error: false,
            dataUser: JSON.parse(localStorage.getItem("dataUser")) || {},
        },
        register: {
            error: false
        }
    },
    reducers: {
        //login slice
        //state = initialState
        loginStart: (state) => {
            state.loading = true;
            state.login.error = false;
            state.login.dataUser = {};
        },
        loginSuccess: (state, action) => {
            state.loading = false;
            state.login.error = false;
            state.login.dataUser = action.payload;
        },
        loginError: (state) => {
            state.loading = false;
            state.login.error = true;
            state.login.dataUser = {};
        },
        //logout slice
        logoutStart: (state) => {
            state.loading = true;
        },
        logoutSuccess: (state) => {
            state.loading = false;
            state.login.dataUser = {};
        },
        logoutError: (state) => {
            state.loading = false;
            state.login.error = true;
        },
        //register slice
        registerStart: (state) => {
            state.register.loading = true
        },
        registerSuccess: (state) => {
            state.register.loading = false
        },
        registerError: (state) => {
            state.register.error = false;
            state.register.error = true
        }

    }
})

export const {
    loginStart,
    loginSuccess,
    loginError,
    logoutStart,
    logoutSuccess,
    logoutError,
    registerStart,
    registerSuccess,
    registerError
} = authSlice.actions

export default authSlice.reducer