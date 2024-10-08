import React from 'react'
import { Link } from 'react-router-dom'

const RestaurantCard = (info) => {
 // console.log(info.link)
  return (
    <Link  to={`/restaurantMenu/${info?.link.split("/").at(-1)}`}>
     <div className='min-w-[295px] h-[182px]  relative'>
                        <img  className='w-full h-full rounded-2xl object-cover' src={"https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/" + info?.cloudinaryImageId} alt="" />
                        <div className='absolute rounded-2xl top-0 w-full h-full bg-gradient-to-t from-black from-1% to-transparent to-40%  '></div>
                        <p className='absolute bottom-0 text-2xl ml-2 mb-1 font-bold text-white '>
                          
                          {
                            info?.aggregatedDiscountInfoV3 ? info?.aggregatedDiscountInfoV3?.header + " " + info?.aggregatedDiscountInfoV3?.subHeader: ""
                          }


                         
                          
                          
                          </p>
                        
                        </div>

                        <div className='mt-3 mb-5'>
                            <h2 className='text-lg font-semibold '>{info?.name}</h2>
                            <p className='flex items-center gap-1 text-base font-semibold'> <i className=" mt-1 text-green-600 text-xl fi fi-ss-circle-star"></i> {info?.avgRating} <span className='mb-3 text-2xl'>.</span> <span>{info?.sla?.slaString}</span></p>
                            <p className='line-clamp-1 text-black/60'>{info?.cuisines.join(", ")}</p>
                            <p className='line-clamp-1 text-black/60'>{info?.locality}</p>
                        </div>

    
    </Link>
  )
}

export default RestaurantCard