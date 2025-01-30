import React from 'react'
import RestaurantCard from './RestaurantCard'
const OnilneFoodDelivery = ({ data,title }) => {
    return (
        <>

            <div className='mt-8'>
                <h1 className='font-bold text-2xl' >{title}</h1>
              
              <div className='grid grid-cols-1 sm:grid-cols-2  md:grid-cols-3  gap-5 mt-4'>
                {
                    data?.map(({info,cta:{link}}) => (

                        <div key={info.id} className='hover:scale-95 duration-300'>
                            <RestaurantCard { ...info} link={link} />
                        </div>

                    ))
                }
                </div>
            </div>

        </>
    )
}

export default OnilneFoodDelivery