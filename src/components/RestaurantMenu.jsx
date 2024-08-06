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
  const [value, setValue] = useState(0);
  const [currIndex, setCurrIndex] = useState(null);
  function handleNext() {

  }
  function handlePrev() {

  }

  async function fetchMenu() {
    let data = await fetch(`https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=28.5355161&lng=77.3910265&restaurantId=${mainId}&catalog_qa=undefined&submitAction=ENTER`)
    let res = await data.json();
    //console.log(res?.data?.cards[3]?.card?.card?.gridElements?.infoWithStyle?.offers);
    setMenuData()
    setDiscountData(res?.data?.cards[3]?.card?.card?.gridElements?.infoWithStyle?.offers)
    setResInfo(res?.data?.cards[2]?.card?.card?.info)
    let actualMenu = (res?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards).filter((data) => data?.card?.card?.itemCards)
    setMenuData(actualMenu)
  }

  useEffect(() => {
    fetchMenu();
  }, [])

  function toggleFun(i) {
    setCurrIndex(i === currIndex ? null : i)
  }

  return (
    <>
      <div className='w-full'>

        <div className='w-[800px] mx-auto  pt-8 text-sm'>
          <p className='text-[12px] text-slate-400 '> <Link to="/">
            <span className='hover:text-slate-700 cursor-pointer'>Home</span> </Link> / <span className='hover:text-slate-700 cursor-pointer'>{resInfo.city}</span> / <span className='text-slate-700'>{resInfo.name}</span>
          </p>
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
                  <p className='font-bold'>Outlet   <span className='font-normal  text-slate-500'>{resInfo?.locality}</span></p>
                  <p className='font-bold lowercase mt-2'>{resInfo?.sla?.slaString}</p>
                </div>
              </div>
              <div className=' pt-4 w-full'>
                <div className='flex items-center gap-2'>
                  <img className='w-6' src={"https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_40,h_40/" + resInfo?.feeDetails?.icon} alt="" />

                  {resInfo.length !== 0 ? <span className='text-sm ml-2 text-slate-500'>{resInfo?.expectationNotifiers[0]?.enrichedText.replace(/<[^>]*>/g, "")}</span> : ""}

                </div>
              </div>

            </div>
          </div>


          <div className='w-full overflow-hidden'>

            <div className='flex justify-between mt-8'>
              <h1 className='font-bold text-xl'>Deals for you</h1>
              <div className='flex gap-3'>
                <div onClick={handlePrev} className={`  cursor-pointer rounded-full w-9 h-9 flex justify-center items-center ` + (value <= 0 ? "bg-gray-100" : "bg-gray-200")}>
                  <i className={` fi text-2xl mt-1 fi-rr-arrow-small-left ` + (value <= 0 ? "text-gray-300" : "text-gray-800")}></i>
                </div>
                <div onClick={handleNext} className={` cursor-pointer rounded-full w-9 h-9 flex justify-center items-center ` + (value >= 128 ? "bg-gray-100" : "bg-gray-200")}>
                  <i className={` fi text-2xl mt-1 fi-rr-arrow-small-right ` + (value >= 150 ? "text-gray-300" : "text-gray-800")}></i>
                </div>
              </div>
            </div>


            <div className='flex gap-4 mt-5'>
              {

                discountData.map((data) => (

                  <Discount data={data} />

                ))
              }
            </div>

          </div>

          <div>
            <h2 className='text-center mt-5 text-[15px] tracking-[4px]'>MENU</h2>
            <div className='w-full mt-4 relative cursor-pointer'>
              <div className='w-full  p-3 rounded-xl font-semibold text-[15px]  bg-slate-200 text-center'>Search for dishes</div>
              <i className="absolute  fi fi-rr-search top-[14px] right-4"></i>
            </div>

            <div >
              {
                menuData.map(({ card: { card: { itemCards, title } } }, i) => (
                  <div >
                    <div className='flex justify-between'>
                      <h1>{title}({itemCards.length})</h1>
                      <i onClick={() => toggleFun(i)} className="fi text-2xl fi-rr-angle-small-down"></i>
                    </div>
                    {
                      currIndex === i &&
                      <div className='m-5'>
                        {
                          itemCards.map(({ card: { info } }) => (
                            <h1>{info.name}</h1>
                          ))
                        }
                      </div>
                    }
                  </div>

                ))
              }
            </div>

          </div>

        </div>
      </div>
    </>
  )
}

function Discount({ data: { info: { header, offerLogo, couponCode } } }) {
  return (
    <div className='flex gap-2  min-w-[328px] border border-slate-300 rounded-2xl p-3 h-[76px]'>
      <img src={"	https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_96,h_96/" + offerLogo} alt="" />
      <div>
        <h2 className='font-bold text-xl'>{header}</h2>
        <p className='text-slate-500'>{couponCode}</p>
      </div>
    </div>
  )
}

export default RestaurantMenu;