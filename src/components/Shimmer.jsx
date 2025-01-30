import React from 'react'

const Shimmer = ({searchDataForShimmer}) => {
    //console.log(searchDataForShimmer)
    return (
        <div className='w-full'>
            <div className='w-full h-[350px] flex justify-center items-center flex-col  bg-[#dce3eb]'>
            <span className="loader "></span>
                <h1 className='text-black font-semibold text-2xl mt-5'>
                    Looking for great food near you 
                    </h1>
            </div>
        </div>
    )
}

export default Shimmer