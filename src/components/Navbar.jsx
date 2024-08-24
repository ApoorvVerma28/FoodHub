import React, { useContext, useState } from 'react'
import { Outlet, Link } from 'react-router-dom';
import { Visibility,Coordinate,CartContext} from '../Context/contextApi';

const Navbar = () => {

  const navItem = [

    {
      name: "FoodHub",
      icon: "fi-rr-briefcase",
      path: "/foodhub",
    },
    {
      name: "Search",
      icon: "fi-rr-search",
      path: "/search",
    },
    {
      name: "Offers",
      icon: "fi-rr-badge-percent",
      path: "/offers",
    },
    {
      name: "Help",
      icon: "fi-rr-life-ring",
      path: "/help",
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

  const { visible, setVisible } = useContext(Visibility)
  const [Address,setAddress] = useState("")
  const [searchResult, setSearchResult] = useState([])
  const {setCoord} = useContext(Coordinate)
  const {cartData, setCartData} = useContext(CartContext)


  function handleVisibility() {
    setVisible(prev => !prev)
  }

  async function searchResultFunc(val) {
    if (val == "") return
    const res = await fetch(`https://www.swiggy.com/dapi/misc/place-autocomplete?input=${val}`);
    const data = await res.json();
    setSearchResult(data.data)
  }

  async function fetchLatAndLng(id) {
   // console.log(id)
    if (id == "") return
    handleVisibility()
    const res = await fetch(`https://www.swiggy.com/dapi/misc/address-recommend?place_id=${id}`);
    const data = await res.json();
    //console.log(data.data[0].geometry.location);
    setCoord({
      lat : data.data[0].geometry.location.lat,
      lng : data.data[0].geometry.location.lng
    })
    setAddress(data.data[0].formatted_address)
  }

  return (

    <div className='relative w-full'>


      <div className='w-full'>
        <div onClick={handleVisibility} className={'w-full h-full bg-black/50 absolute z-30 ' + (visible ? 'visible' : 'invisible')}></div>
        <div className={'bg-white w-[40%] flex flex-col p-10  h-full absolute z-40 duration-500' + (visible ? ' left-0 ' : ' -left-full ')}>
          <i className='fi fi-br-cross ' onClick={handleVisibility}></i>
          <input className='border p-5 my-5 focus:outline-none focus:shadow-lg' type="text" onChange={(e) => searchResultFunc(e.target.value)} />
          <div className='border p-5'>
            <ul>
              {searchResult.map((data, i) => {
                const isLast = (i === searchResult.length - 1)

                return (
                  <div className='my-5 '>
                    <div className='flex  gap-3'>
                      <i className='pt-2 fi fi-rr-marker'></i>
                      <li onClick={() => fetchLatAndLng(data.place_id)}>
                        {data.structured_formatting.main_text}
                        <p className='text-sm opacity-65'>{data.structured_formatting.secondary_text}
                        </p>
                        { !isLast && 
                        <p className='opacity-40 text-sm'>------------------------------------------------------------------------</p>
                        }
                      </li>
                    </div>
               
                </div>
              )})}
            </ul>
          </div>
        </div>
      </div>





      <div className='w-full  shadow-md h-20 flex  justify-center items-center'>
        <div className='w-[85%] flex justify-between'>

          <div className='flex items-center gap-6' >
            <Link to={"/"}> <img className='w-24' src="/logo.png" alt="logo" /></Link>
            <div className='flex items-center ' onClick={handleVisibility}>
              <p className='flex items-center'>
                <span  className='font-bold border-b-2 border-black'>other</span>
                <span className='ml-1 text-[14px] opacity-85 line-clamp-1'>{Address}</span>
              </p>
              <i className="mt-2  text-2xl text-[#d38c1a] fi fi-rr-angle-small-down"></i>
            </div>
          </div>

          <div className='flex items-center gap-12'>

            {
              navItem.map((item) => (
                <Link to={item.path}>
                <div className='flex items-center gap-2  '>
                  <i className={" mt-1 text-[18px] fi text-gray-700 " + item.icon}></i>
                  <p className='font-medium text-[16px]  text-gray-700'>{item.name}</p>
                  { item.name === 'Cart' && <p>{cartData.length}</p>}
                </div>
                </Link>
              ))
            }



          </div>
        </div>

      </div>

      <Outlet />
    </div>
  )
}

export default Navbar