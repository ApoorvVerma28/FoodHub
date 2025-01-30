import React from 'react'
import { nonVeg, veg } from '../Utils/links'
import AddToCartBtn from './AddToCartBtn'

const SearchDishes = ({
    data :{
        card : {
            card : {
                info  ,
                    restaurant : {
                        info : resInfo}}}
    }
}) => {

    let { imageId = " ", name, price, isVeg = 0 } = info
    let {id,name : resName,avgRating, sla :{slaString}} = resInfo
  //  console.log(resName)
  return (
    <div className='bg-white rounded-2xl p-4 m-4'>
        <div className='flex justify-between text-sm opacity-50'>
            <div className=''>
                <p className='font-bold'> By{resName}</p>
                <div className='flex items-center gap-1'> 
                <i className="fi fi-ss-star pt-1"></i> 
                    <p className='my-2'>  {avgRating}  </p>
                <p className='ml-1'>{slaString}</p></div>
               
            </div>
            <i className="fi fi-rr-arrow-small-right text-2xl"></i>
        </div>
        <hr className='border-dotted ' />
        <div className='my-3 md:max-w-fit flex justify-between'>
        <div className='w-[50%]'>
            <div className='w-5 h-5'>
                {
                    isVeg ? <img src={veg} alt="" /> : <img src={nonVeg} alt="" />
                }
            </div>
            <p className='text-lg font-semibold'>{name}</p>
            <p className='font-semibold items-center flex gap-1'><i className="fi fi-bs-indian-rupee-sign text-sm pt-1 inline-block"></i> {price/100} </p>
        </div>
       
        <div className='w-[55%] md:w-[40%] relative h-full'>
          <img className='rounded-xl aspect-square object-cover ' src={"https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/" + imageId} alt="" />
         <AddToCartBtn info = {info} resInfo={resInfo}/>
        </div>
        
        </div>
    </div>
  )
}

export default SearchDishes