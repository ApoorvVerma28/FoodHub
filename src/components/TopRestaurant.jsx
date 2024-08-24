import React,{useState} from 'react'
import RestaurantCard from './RestaurantCard';

const TopRestaurant = ({data,title}) => {

 //   console.log(data)

    const [value,setValue] = useState(0);
   // const [data, setData] = useState([]);

    //async function fetchData() {
     //   const data = await fetch("https://www.swiggy.com/dapi/restaurants/list/v5?lat=28.65200&lng=77.16630&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING")
    //    const result = await data.json();
       // console.log(result?.data?.cards[0]?.card?.card?.imageGridCards?.info);
   //     setData(result?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants)
   // }


   // useEffect(() => {
   //     fetchData()
   // }, [])

  // console.log(value)
   
    function handleNext(){
       value>= 480  ? "" : setValue((prev) =>prev +60)
    }
    
    function handlePrev(){
      value<= 0 ? "" : setValue((prev) =>prev -60)
    }

  return (
    <div className='mt-20'>
      <div className='flex justify-between mt-3'>
                    <h1 className='font-bold text-2xl'>{title}</h1>
                    <div className='flex gap-3'>
                        <div onClick={handlePrev} className= {`  cursor-pointer rounded-full w-9 h-9 flex justify-center items-center ` + (value <=0 ?"bg-gray-100" :"bg-gray-200")}>
                            <i className={` fi text-2xl mt-1 fi-rr-arrow-small-left ` + (value <= 0 ?"text-gray-300":"text-gray-800")}></i>
                        </div>
                        <div onClick={handleNext} className={` cursor-pointer rounded-full w-9 h-9 flex justify-center items-center ` + (value >= 480 ?"bg-gray-100" :"bg-gray-200")}>
                            <i className={` fi text-2xl mt-1 fi-rr-arrow-small-right ` + (value >= 480 ?"text-gray-300":"text-gray-800")}></i>
                        </div>
                    </div>
                </div>
                <div className={`flex mt-4 gap-5 w-full duration-300`} style={{translate: `-${value}%`}}>
                   {
                    data.map(({info, cta: {link}})=>(
                        
                        <div className='hover:scale-95 duration-300'>
                       <RestaurantCard {...info} link={link}/>
                        </div>

                    ))
                   }
                </div>
    </div>
  )
}

export default TopRestaurant