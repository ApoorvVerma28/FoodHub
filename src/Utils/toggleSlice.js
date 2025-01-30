import { createSlice } from "@reduxjs/toolkit";

const toggleSlice = createSlice({
    name: "toggleSlice",
    initialState: {
        searchBarToggle: false,
        loginBarToggle: false
    },
    reducers: {
        toggleVisibility: (state, action) => {
            state.searchBarToggle = !state.searchBarToggle;
        },
        toggleLoginBar:(state)=>{
            state.loginBarToggle = !state.loginBarToggle;
        }
    }

})


export const { toggleVisibility,toggleLoginBar} = toggleSlice.actions;
export default toggleSlice.reducer;
