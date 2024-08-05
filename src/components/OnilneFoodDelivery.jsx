import React from 'react'
import RestaurantCard from './RestaurantCard'
const OnilneFoodDelivery = ({ data }) => {
    return (
        <>

            <div className='mt-3'>
                <h1 className='font-bold text-2xl' >Restaurants with online food delivery in Delhi</h1>
              
              <div className='grid grid-cols-3 gap-5 mt-4'>
                {
                    data.map(({info,cta:{link}}) => (

                        <div className='hover:scale-95 duration-300'>
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