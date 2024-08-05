import React,{useEffect,useState} from 'react'

const Scroll = ({data}) => {

 //   const [data, setData] = useState([]);
    const [value, setValue] = useState(0);
   // async function fetchData() {
  //      const data = await fetch("https://www.swiggy.com/dapi/restaurants/list/v5?lat=28.65200&lng=77.16630&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING")
  //      const result = await data.json();
       // console.log(result?.data?.cards[0]?.card?.card?.imageGridCards?.info);
  //      setData(result?.data?.cards[0]?.card?.card?.imageGridCards?.info)
 //   }


  //  useEffect(() => {
   //     fetchData()
  //  }, [])

  //  console.log(value)

    function handleNext() {
      value>=150?"" :  setValue((prev)=>prev +32)
    }

    function handlePrev() {
     value <= 0 ? "" :  setValue((prev)=> prev-32)
    }

  return (
    <>
     <div className='flex justify-between mt-3'>
                    <h1 className='font-bold text-2xl'>What's on your mind?</h1>
                    <div className='flex gap-3'>
                        <div onClick={handlePrev} className= {`  cursor-pointer rounded-full w-9 h-9 flex justify-center items-center ` + (value <=0 ?"bg-gray-100" :"bg-gray-200")}>
                            <i className={` fi text-2xl mt-1 fi-rr-arrow-small-left ` + (value <= 0 ?"text-gray-300":"text-gray-800")}></i>
                        </div>
                        <div onClick={handleNext} className={` cursor-pointer rounded-full w-9 h-9 flex justify-center items-center ` + (value >= 128 ?"bg-gray-100" :"bg-gray-200")}>
                            <i className={` fi text-2xl mt-1 fi-rr-arrow-small-right ` + (value >= 150 ?"text-gray-300":"text-gray-800")}></i>
                        </div>
                    </div>
                </div>
                <div
                style={{translate: `-${value}%`}}
                className= {`flex mt-4  duration-300`}>
                    {
                        data.map((item) => (
                            <img className='w-36' src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/${item.imageId}`} alt="" />
                        ))
                    }
                </div>
                
    </>
  )
}

export default Scroll