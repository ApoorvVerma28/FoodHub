import React from 'react'
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react';
const RestaurantMenu = () => {

  const { id } = useParams();

  //  console.log(id)

  let mainId = id.split("-").at(-1)

  const [menuData, setMenuData] = useState([]);
  const [resInfo, setResInfo] = useState([]);
  const [discountData, setDiscountData] = useState([]);

  async function fetchMenu() {
    let data = await fetch(`https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=28.5355161&lng=77.3910265&restaurantId=${mainId}&catalog_qa=undefined&submitAction=ENTER`)
    let res = await data.json();
    //console.log(res?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]?.card?.card);
    setMenuData()
    setDiscountData(res?.data?.cards[3]?.card?.card?.gridElements?.infoWithStyle?.offers)
    setResInfo(res?.data?.cards[2]?.card?.card?.info)
    setMenuData(res?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]?.card?.card)
  }

  useEffect(() => {
    fetchMenu();
  }, [])

  return (
    <>
      <div className='w-full'>

        <div className='w-[800px] mx-auto  pt-8 text-sm'>
          <p className='text-[12px] text-slate-400 '> <Link to="/"> <span className='hover:text-slate-700 cursor-pointer'>Home</span> </Link> / <span className='hover:text-slate-700 cursor-pointer'>{resInfo.city}</span> / <span className='text-slate-700'>{resInfo.name}</span> </p>
          <h1 className='font-bold pt-6 text-2xl'>{resInfo.name}</h1>

          <div className='w-full h-[206px] bg-gradient-to-t px-4 pb-4 from-slate-300/70  rounded-[30px] mt-3'>
            <div className='w-full border bg-white p-4 border-slate-300/70 rounded-[30px] h-full '>
              <div className='flex items-center gap-1 text-[16px] font-bold'>
                <i className=" mt-1 text-green-600 text-xl fi fi-ss-circle-star"></i>
                <span>{resInfo?.avgRating}</span>
                <span>({resInfo?.totalRatingsString})</span>
                <span className='pb-2'>.</span>
                <span>{resInfo?.costForTwoMessage}</span>

              </div>
              <p className='underline font-bold text-orange-600 text-sm'>{resInfo?.cuisines?.join(",")}</p>

              <div className='flex gap-2 mt-[15px]'>
                <div className='w-[7px] flex flex-col justify-center items-center'>
                  <div className='w-[7px] h-[7px] bg-gray-300 rounded-full'></div>
                  <div className='w-[1px] h-[25px] bg-gray-300'></div>
                  <div className='w-[7px] h-[7px] bg-gray-300 rounded-full'></div>
                </div>
                <div className=' flex flex-col gap-1 mt-[-5px]'>
                  <p className='font-bold'>Outlet   <span className='font-normal'>{resInfo?.locality}</span></p>
                  <p className='font-bold lowercase mt-2'>{resInfo?.sla?.slaString}</p>
                </div>
              </div>
              <div className='p-2 w-full'>
              <div>
                  <img className='w-6' src={"https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_40,h_40/" + resInfo?.feeDetails?.icon} alt="" />
                </div>
                </div>

            </div>
          </div>

        </div>
      </div>
    </>
  )
}

export default RestaurantMenu;