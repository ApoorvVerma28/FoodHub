import React,{useState,useEffect} from 'react'
import Scroll from './Scroll';
import TopRestaurant from './TopRestaurant';
import OnilneFoodDelivery from './OnilneFoodDelivery';
const Body = () => {

 const [topRestaurantData,setTopRestaurantData] = useState([])
 const [scrollData,setScrollData] = useState([]) 
  // fetch top restaurant data here...  
  async function fetchData() {
    const data = await fetch("https://www.swiggy.com/dapi/restaurants/list/v5?lat=28.5355161&lng=77.3910265&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING")
    const result = await data.json();
   // console.log(result?.data?.cards[0]?.card?.card?.imageGridCards?.info);
   setTopRestaurantData(result?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants)
   setScrollData(result?.data?.cards[0]?.card?.card?.imageGridCards?.info)
}


useEffect(() => {
    fetchData()
}, [])


    return (

        <div className='w-full '>

            <div className='w-[80%] mx-auto  mt-3 overflow-hidden'>
               <Scroll data={scrollData}/>
               <TopRestaurant data={topRestaurantData} />
               <OnilneFoodDelivery data={topRestaurantData} />
            </div>

        

        </div>
    )
}

export default Body