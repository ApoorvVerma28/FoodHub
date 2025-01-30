import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cartSlice",
    initialState: {
        cartItems: JSON.parse(localStorage.getItem("cartData")) || [],
       
    },
    reducers:{
        addToCart: (state,action)=>{

            const {info} = action.payload
            state.cartItems = [...state.cartItems,info]
            localStorage.setItem("cartData", JSON.stringify( state.cartItems))
        },
        deleteFromCart: (state,action)=>{
            state.cartItems = action.payload
            localStorage.setItem("cartData", JSON.stringify(action.payload));

        },
        deleteAllCart: (state)=>{
            state.cartItems = []
            localStorage.removeItem("cartData")
        }
    }

})

export const {addToCart, deleteFromCart, deleteAllCart } = cartSlice.actions;
export default cartSlice.reducer;