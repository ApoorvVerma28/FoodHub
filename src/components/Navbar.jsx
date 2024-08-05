import React from 'react'
import { Outlet ,Link} from 'react-router-dom';
const Navbar = () => {

  const navItem = [

    {
      name: "FoodHub corporate",
      icon: "fi-rr-briefcase",
    },
    {
      name: "Search",
      icon: "fi-rr-search",
    },
    {
      name: "Offers",
      icon: "fi-rr-badge-percent",
    },
    {
      name: "Help",
      icon: "fi-rr-life-ring",
    },
    {
      name: "Sign In",
      icon: "fi-rr-users",
    },
    {
      name: "Cart",
      icon: " fi-rr-cart-shopping-fast",
    }


  ]

  return (

    <>
      <div className='w-full shadow-md h-20 flex justify-center items-center'>
        <div className='w-[85%] flex justify-between'>

          <div className='flex items-center gap-6'>
            <Link to={"/"}> <img className='w-24' src="/logo.png" alt="logo" /></Link>
            <p className='font-bold border-b-2   border-black'>Other</p>
            <i className="mt-2 text-2xl text-[#d38c1a] fi fi-rr-angle-small-down"></i>
          </div>

          <div className='flex items-center gap-12'>

            {
              navItem.map((item) => (
                <div className='flex items-center gap-2  '>
                  <i className={" mt-1 text-xl fi text-gray-700 " + item.icon}></i>
                  <p className='font-medium text-lg  text-gray-700'>{item.name}</p>
                </div>
              ))
            }



          </div>
        </div>

      </div>

      <Outlet/>
    </>
  )
}

export default Navbar