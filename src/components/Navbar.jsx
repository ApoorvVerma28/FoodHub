import React, { useContext, useState } from 'react'
import { Outlet, Link } from 'react-router-dom';
import { Coordinate } from '../Context/contextApi';
import { useDispatch, useSelector } from 'react-redux';
import { toggleVisibility,toggleLoginBar } from '../Utils/toggleSlice';
import SignInBtn from './SignInBtn';
const Navbar = () => {

  const navItem = [

 
    {
      name: "Search",
      icon: "fi-rr-search",
      path: "/search",
    },


    {
      name: "Sign In",
      icon: "fi-rr-users",
      path: "/signin",
    },
    {
      name: "Cart",
      icon: " fi-rr-cart-shopping-fast",
      path: "/cart",
    }

  ]

  // const { visible, setVisible } = useContext(Visibility)
  const [Address, setAddress] = useState("")
  const [searchResult, setSearchResult] = useState([])
  const { setCoord } = useContext(Coordinate)
  // const {cartData, setCartData} = useContext(CartContext)
  const cartData = useSelector((state) => state.cartSlice.cartItems);
  const userData = useSelector((state) => state.authSlice.userData);
 // console.log(userData)
  //console.log(Address.split(1))
  const visible = useSelector((state) => state.toggleSlice.searchBarToggle)
  const loginVisible = useSelector((state) => state.toggleSlice.loginBarToggle)

  const dispatch = useDispatch();


  function handleVisibility() {

    dispatch(toggleVisibility())
    

  }
  function handleLogin() {

    dispatch(toggleLoginBar())

  }

  async function searchResultFunc(val) {
    if (val == "") return
    const res = await fetch(`https://cors-by-codethread-for-swiggy.vercel.app/cors/dapi/misc/place-autocomplete?input=${val}`);
    const data = await res.json();
    setSearchResult(data.data)
   
  }

  async function fetchLatAndLng(id) {
    // console.log(id)
    if (id == "") return
    handleVisibility()
    const res = await fetch(`https://cors-by-codethread-for-swiggy.vercel.app/cors/dapi/misc/address-recommend?place_id=${id}`);
    const data = await res.json();
    //console.log(data.data[0].geometry.location.lat);
   // console.log(data.data[0].geometry.location.lng);
    setCoord({
      lat: data.data[0].geometry.location.lat,
      lng: data.data[0].geometry.location.lng
    })
    const address = data.data[0].formatted_address;
    const maxLength = 30;
    let shortAddress = address.length > maxLength ? address.substring(0, maxLength) + "..." : address;
    setAddress(shortAddress)
  }

  return (
    <>

      <div className='w-full'>
        <div onClick={handleVisibility} className={'w-full h-full bg-black/50 absolute z-30 ' + (visible ? 'visible' : 'invisible')}></div>
        <div className={'bg-white w-full md:w-[40%] flex flex-col p-10  h-full absolute z-40 duration-500' + (visible ? ' left-0 ' : ' -left-full ')}>
          <i className='fi fi-br-cross ' onClick={handleVisibility}></i>
          <input placeholder='Search for aera and street name' className='border p-5 my-5 rounded-2xl border-gray-300 focus:outline-none focus:shadow-xl' type="text" onChange={(e) => searchResultFunc(e.target.value)} />
          <div className='border p-5'>
            <Link to={"/"}>
              {searchResult.map((data,i) => {
                const isLast = (i === searchResult.length - 1)

                return (
                  <div key={data.place_id} className='my-5 '>
                    <div className='flex  gap-3'>
                      <i className='pt-2 fi fi-rr-marker'></i>
                      <li onClick={() => fetchLatAndLng(data.place_id)}>
                        {data.structured_formatting.main_text}
                        <p className='text-sm opacity-65'>{data.structured_formatting.secondary_text}
                        </p>
                        {!isLast &&
                          <p className='opacity-40 text-sm'>------------------------------------------------------------------------</p>
                        }
                      </li>
                    </div>

                  </div>
                )
              })}
            </Link>
          </div>
        </div>
      </div>
      <div className='w-full'>
        <div onClick={handleLogin} className={'w-full h-full bg-black/50 absolute z-30 ' + (loginVisible ? 'visible' : 'invisible')}></div>
        <div className={'bg-white  w-full md:w-[30%] flex flex-col p-10  h-full fixed z-40 duration-500' + (loginVisible ? ' right-0 ' : ' -right-full ')}>
          <i className='fi fi-br-cross ' onClick={handleLogin}></i>
          <div className='flex my-3 justify-between  items-center'>
            <h2 className='font-bold text-3xl border-b-2 border-black pb-3'>Login</h2>
            <img className='w-28' src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/Image-login_btpq7r" alt="" />
          </div>
             <SignInBtn/>
              <p className='text-base mt-2 opacity-70'>By clicking on Login, I accept the Terms & Conditions & Privacy Policy</p>
        </div>
      </div>
      <div className='relative w-full'>
        <div className='w-full  shadow-md h-20 flex  justify-center items-center'>
          <div className='w-full  sm:w-[90%]  md:w-[85%] flex justify-between'>

            <div className='flex items-center gap-6' >
              <Link to={"/"}>
              <div className='w-24'>
               <img  src="/logo.png" alt="logo" />
               </div>
               </Link>
              <div className='flex items-center ' onClick={handleVisibility}>
                <p className='flex items-center'>
                  <span className='font-bold border-b-2 border-black'>other</span>
                  <span className='ml-1 md:hidden block whitespace-nowrap text-ellipsis text-[13px] overflow-hidden  opacity-85 '>{Address.split(",")[0]}</span>
                  <span className='ml-1 md:block hidden whitespace-nowrap text-ellipsis  overflow-hidden  text-[14px] opacity-85 '>{Address}</span>
                </p>
                <i className="mt-2 pl-[-5px] text-2xl text-[#d38c1a] fi fi-rr-angle-small-down"></i>
              </div>
            </div>

            <div className='md:flex hidden items-center gap-2 md:gap-12'>

              {
                navItem.map((item) => (

                  item.name == "Sign In" ?
                  
                    <div key={item.path} onClick={handleLogin}>
                      <div className='flex items-center gap-2  '>
                        {
                          userData ? <img className='rounded-full mt-1 h-10 w-10' src={userData.photo} alt="" /> :
                            <i className={" mt-1 text-[18px] fi text-gray-700 " + item.icon}></i>

                        }
                        <p className='font-medium text-[16px]  text-gray-700'>{userData ? userData.name : item.name}</p>
                        {item.name === 'Cart' && <p>{cartData.length}</p>}
                      </div>
                    </div>
                    
                    :
                    <Link key={item.path} to={item.path}>
                      <div  className='flex items-center gap-2  '>
                        <i className={" mt-1 text-[18px] fi text-gray-700 " + item.icon}></i>
                        <p className='font-medium text-[16px]  text-gray-700'>{item.name}</p>
                        {item.name === 'Cart' && <p>{cartData.length}</p>}
                      </div>
                    </Link>
                ))
              }



            </div>
              <div className='flex md:hidden items-center gap-8 mr-5'>
              {
                navItem.map(item => (
                  item.name == "Sign In" ? 
                  (
                  <div  key={item.path} onClick={handleLogin}>
                     {
                          userData ? <img className='rounded-full mt-1 h-8' src={userData.photo} alt="" /> :
                            <i className={" mt-1 text-[18px] fi text-gray-700 " + item.icon}></i>

                        }
                  </div>
                  )

                  :
                 (
                   <Link key={item.path} to={item.path}>
                  <i className={" mt-1 text-[18px] fi text-gray-700 " + item.icon}></i>
                  {item.name === 'Cart' && <span className='ml-2 '>{cartData.length}</span>}
                  </Link>

                  )
              
                ))
              }
              </div>


          </div>

        </div>

        <Outlet />
      </div>
    </>
  )
}

export default Navbar