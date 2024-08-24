import React, { useContext } from 'react'
import { CartContext } from '../Context/contextApi'
import { Link } from 'react-router-dom'

const Cart = () => {
    const {cartData,setCartData} = useContext(CartContext)

    if (cartData.length === 0) {
        return <div className='w-full'>
            <div className='w-[70%] mx-auto m-8'>
                <h1 className='text-2xl'>Nothing in the cart.</h1>
                <Link to ={"/"} className='font-bold border-[1px] border-black w-[156px] h-[40px] text-center pt-1 text-xl mt-4 rounded-xl inline-block'>Add somthing </Link>
            </div>
        </div>
    }

    function removeFromCart(i) {
       let newArr = [...cartData]
       newArr.splice(i, 1);
        setCartData(newArr);
        localStorage.setItem("cartData", JSON.stringify(newArr));
    }

  return (
    <div className='w-full'>
        <div className='w-[60%] mx-auto'>
        {
            cartData.map((data,i) => (
                <div className='flex w-full justify-between my-5 p-2'>
                    <h2 className='w-[70%] text-[20px]'>{data.name}</h2>
                    <div className='w-[20%] relative h-full'>
          <img className='rounded-xl w-[156px] h-[144px] object-cover ' src={"https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/" + data.imageId} alt="" />
          <button onClick={() => removeFromCart(i)} className='bg-red-700 bottom-[-20px] left-3 absolute text-lg font-bold  text-white px-8 drop-shadow rounded-xl py-2'>Remove</button>
        </div>
                </div>
            ))
        }
        </div>
    </div>
  )
}

export default Cart