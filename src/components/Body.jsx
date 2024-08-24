import React,{useState,useEffect,useContext} from 'react'
import Scroll from './Scroll';
import TopRestaurant from './TopRestaurant';
import OnilneFoodDelivery from './OnilneFoodDelivery';
import { Coordinate } from '../Context/contextApi';
const Body = () => {

 const [topRestaurantData,setTopRestaurantData] = useState([])
 const [topResTitle,setTopResTitle] = useState("")
 const [onlineTitle,setOnlineTitle] = useState("")
 const [scrollData,setScrollData] = useState([]) 
 const {coord:{lat,lng}} = useContext(Coordinate)
 const [unserviceableData,setUnserviceableData] = useState({})
  // fetch top restaurant data here...  
  async function fetchData() {
    const data = await fetch(`https://www.swiggy.com/dapi/restaurants/list/v5?lat=${lat}&lng=${lng}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`)
    const result = await data.json();
   // console.log(result?.data?.cards[0]?.card?.card?.imageGridCards?.info);
   setTopRestaurantData(result?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants)
   setScrollData(result?.data?.cards[0]?.card?.card?.imageGridCards?.info)
   setTopResTitle(result?.data?.cards[1]?.card?.card?.header?.title)
   setOnlineTitle(result?.data?.cards[2]?.card?.card?.title)
    // fetch unserviceable data here.. 
    
    setUnserviceableData(result?.data) //
}


useEffect(() => {
    fetchData()
}, [lat,lng])


if (unserviceableData.communication ){
    return <div className='flex mt-48 justify-center items-center flex-col'>
        <img className='w-72 '  src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_476,h_476/portal/m/location_unserviceable.png" alt="" />
        <h1 className='text-2xl font-semibold'>Location Unserviceable</h1>
    </div>
}

    return (

        <div className='w-full '>

            <div className='w-[80%] mx-auto  mt-3 overflow-hidden'>
               <Scroll data={scrollData} />
               <TopRestaurant data={topRestaurantData} title={topResTitle} />
               <OnilneFoodDelivery data={topRestaurantData} title={onlineTitle} />
            </div>

        

        </div>
    )
}

export default Body