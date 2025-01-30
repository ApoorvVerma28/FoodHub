import React from 'react'
import { addToCart } from '../Utils/cartSlice'
import { useDispatch, useSelector } from 'react-redux'
import toast from 'react-hot-toast'

function AddToCartBtn({info}) {


  const cartData =  useSelector((state) => state.cartSlice.cartItems)
  const dispatch = useDispatch()
     function handleAddToCart() { 
    
        const isAdded = cartData.find((data) => data.id === info.id)
        if (!isAdded) {
         dispatch(addToCart({info}))  
         toast.success("Added to cart",{duration: 1000})
        } else {
         toast.error("Already added",{duration: 1000})
        }
    
      }
    

  return (
    <button onClick={handleAddToCart} className='bg-white bottom-[-20px] md:left-1/2 translate-x-5 md:-translate-x-1/2 absolute text-lg font-bold  text-green-700 border px-10 drop-shadow rounded-xl py-2'>Add</button>
  )
}

export default AddToCartBtn