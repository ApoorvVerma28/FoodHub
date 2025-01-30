import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "authSlice",
    initialState: {
        userData : JSON.parse(localStorage.getItem("userData"))
    },
    reducers: {
        setUserData:(state,action)=>{
            state.userData = action.payload;
            localStorage.setItem("userData", JSON.stringify(action.payload));

        },
        clearUserData:(state)=>{
            state.userData = null;
            localStorage.removeItem("userData");
        }
    }
})

export const { setUserData, clearUserData } = authSlice.actions;

export default authSlice.reducer;