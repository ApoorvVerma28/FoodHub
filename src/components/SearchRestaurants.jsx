import React from 'react'

const SearchRestaurants = ({
  data :{
    card : {
      card : {
          info:{
              cloudinaryImageId ,cuisines, costForTwoMessage,name,avgRating, }}}
  }
}) => {
 // console.log(cuisines)
  return (
    <div className='bg-white m-4 p-4  flex gap-4 items-center'>
     <div className='w-[35%]'>
      <img className='aspect-square rounded-lg ' src={"https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_264,h_288,c_fill/" + cloudinaryImageId} alt="" />
     </div>
     <div className='w-[60%]'>
     <p className='font-bold line-clamp-1'> By{name}</p>
                <div className='flex items-center gap-1'> 
                <i className="fi fi-ss-star pt-1"></i> 
                    <p className='my-1'>  {avgRating}  </p>
                <p className='ml-1'>{costForTwoMessage}</p></div>
        <p className='line-clamp-2 '>{cuisines.join()}</p>
     </div>
    </div>
  )
}

export default SearchRestaurants