import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { deleteFromCart, deleteAllCart } from '../Utils/cartSlice'
import toast from 'react-hot-toast'
import { toggleLoginBar } from '../Utils/toggleSlice'



const Cart = () => {
    // const { cartData, setCartData } = useContext(CartContext)
    const navigate = useNavigate()
    const userData = useSelector((state) => state.authSlice.userData);
    const cartData = useSelector((state) => state.cartSlice.cartItems)
    const dispatch = useDispatch()
   
    let totalPrice = cartData.reduce((acc, carValue) => acc + carValue.price / 100 || carValue.defaultPrice / 100, 0)


    //console.log(cartData)

    if (cartData.length === 0) {
        return <div className='w-full'>
            <div className='w-[95%] md:w-[800px] mx-auto m-8'>
                <h1 className='text-2xl'>Nothing in the cart.</h1>
                <Link to={"/"} className='font-bold border-[1px] border-black w-[156px] h-[40px] text-center pt-1 text-xl mt-4 rounded-xl inline-block'>Add something </Link>
            </div>
        </div>
    }

    function removeFromCart(i) {
        if (cartData.length > 1) {
            let newArr = [...cartData];
            newArr.splice(i, 1);
            // setCartData(newArr);
            dispatch(deleteFromCart(newArr));
            toast.success("Food removed");
        } else {
            clearCart();
            toast.success("Cart is cleared");
        }
    }

    function clearCart() {
        //  setCartData([])
        dispatch(deleteAllCart())
        // localStorage.setItem("cartData", JSON.stringify(newArr));
    }

   
   
    
    function handlePlaceOrder() {
        if (!userData) {
            toast.error("Please login to place order");
            dispatch(toggleLoginBar())
            return;
        }
        else{
            toast(
                (t) => (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      background: "#d38c1a", 
                      color: "#fff",
                      padding: "16px",
                      borderRadius: "12px",
                      boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
                      width: "300px",
                      fontSize: "14px",
                    }}
                  >
                    <img
                      src="/logo.png"
                      alt="Order Confirmed"
                      style={{ width: "96px" }}
                    />
                    <div>
                      <strong className='text-black text-xl font-extrabold'>Order Confirmed </strong>
                      <p style={{ margin: "4px 0", fontSize: "13px" }}>
                        Hey <b>{userData.name}</b>, <br />
                        Your order:
                        {cartData.map((data, i) => (
                          <span key={i} style={{ display: "block", fontWeight: "bold" }}>
                            {data.name}.
                          </span>
                        ))}
                      </p>
                      <p style={{ fontSize: "15px", opacity: "0.8" }}>Sit back & relax, it’ll be delivered soon! </p>
                      <p className='font-bold text-[15px]'>Thank You..</p>
                    </div>
                  </div>
                ),
                {
                  duration: 4000,
                  style: {
                    background: "transparent",
                    boxShadow: "none",
                  },
                }
              );
              setTimeout(() =>
                dispatch(deleteAllCart())
                ,2000)
              
        }
        
        
    }

    return (
        <div className='w-full'>
            <div className='md:w-[60%] mx-10 md:mx-auto'>
                {
                    cartData.map((data, i) => (
                        <div key={i} className='md:flex  md:w-full justify-between my-5 p-2'>
                            <div className='md:w-[70%] '>
                                <h2 className='text-[30px] font-semibold'>{data.name}</h2>
                                <p className='mt-3 font-bold hidden md:flex text-[15px]'>  ₹{data.price / 100 || data.defaultPrice / 100}</p>
                            </div>

                            <div className='md:w-[20%] w-[200px] relative h-full'>
                                <img className='rounded-xl w-[200px] md:w-[170px] md:h-[144px] object-cover ' src={"https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/" + data.imageId} alt="" />
                               
                                <button onClick={() => removeFromCart(i)} className='bg-red-700 bottom-[-20px]   absolute text-base font-bold  text-white w-full md:px-5 drop-shadow rounded-xl py-2'>Remove</button>
                               
                            </div>
                            <p className='mt-3 md:hidden flex font-bold mt-6 text-[20px]'>   ₹{data.price / 100 || data.defaultPrice / 100}</p>
                        </div>
                    ))
                }
                <h1 className='font-semibold text-lg '>Total Amount - ₹{totalPrice}</h1>
                <div className='flex flex-col justify-between items-start'>
                    <button onClick={() => handlePlaceOrder()} className='mb-5 bg-green-700 text-lg mt-3  font-bold md:w-[20%] w-auto  text-white px-8 drop-shadow rounded-xl py-2'>Place Order</button>
                   
                 

                    <button onClick={() => clearCart()} className='mb-5 md:w-[20%] w-auto   bg-green-700 text-lg mt-1  font-bold  text-white px-8 drop-shadow rounded-xl py-2'>Clear Cart</button>
                </div>
            </div>
        </div>
    )
}

export default Cart