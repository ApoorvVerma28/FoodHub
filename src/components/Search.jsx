import React, { useState, useContext, useEffect } from "react";
import { Coordinate } from "../Context/contextApi";
import SearchDishes from "./SearchDishes";
import SearchRestaurants from "./SearchRestaurants";
import Shimmer from "./Shimmer";
function Search() {


    const {
        coord: { lat, lng },
    } = useContext(Coordinate);

    const [searchQuery, setSearchQuery] = useState("")
    const [dishes, setDishes] = useState([])
    const [restaurants, setRestaurants] = useState([])

    const filterOptions = ["Restaurants", "Dishes"]

    const [activeBtn, setActiveBtn] = useState("Dishes")

    function handleFilterBtn(filterName) {
        setActiveBtn(filterName)
    }

    async function fetchDishes() {
        let data = await fetch(`${import.meta.env.VITE_BASE_URL}/restaurants/search/v3?lat=${lat}&lng=${lng}&str=${searchQuery}&trackingId=4836a39e-ca12-654d-dc3b-2af9d645f8d7&submitAction=ENTER&queryUniqueId=7abdce29-5ac6-7673-9156-3022b0e032f0`)
        let res = await data.json()
        //   console.log((res?.data?.cards[1]?.groupedCard?.cardGroupMap?.DISH?.cards).filter((data) => data?.card?.card?.info))
        const finalDishesData = (res?.data?.cards[1]?.groupedCard?.cardGroupMap?.DISH?.cards).filter((data) => data?.card?.card?.info)
        setDishes(finalDishesData)
    }
    async function fetchRestaurants() {
        let data = await fetch(`${import.meta.env.VITE_BASE_URL}/restaurants/search/v3?lat=${lat}&lng=${lng}&str=${searchQuery}&trackingId=4836a39e-ca12-654d-dc3b-2af9d645f8d7&submitAction=ENTER&queryUniqueId=7abdce29-5ac6-7673-9156-3022b0e032f0&selectedPLTab=RESTAURANT`)
        let res = await data.json()
        //console.log((res?.data?.cards[0]?.groupedCard?.cardGroupMap?.RESTAURANT?.cards).filter((data) => data?.card?.card?.info))
        const finnalRestaurantsData = (res?.data?.cards[0]?.groupedCard?.cardGroupMap?.RESTAURANT?.cards).filter((data) => data?.card?.card?.info)
        setRestaurants(finnalRestaurantsData)
    }


    function handleSearchQuery(e) {
        let val = e.target.value

        if (e.keyCode == 13) {

            setSearchQuery(val)
        }
    }

    useEffect(() => {
        if (searchQuery === "") {
            return
        }
        fetchDishes()
        fetchRestaurants()
    }, [searchQuery])

    return (
        <div className="w-full md:w-[800px] mx-auto">
            <input onKeyDown={handleSearchQuery} className="border w-full p-3 my-5 rounded-2xl border-gray-300 focus:outline-none focus:shadow-xl" placeholder="search for restaurants and dishes" type="text" />

       
                <div className="my-7 flex flex-wrap gap-3">
                {
                    filterOptions.map(filterName => (
                        <button key={filterName} onClick={() => handleFilterBtn(filterName)} className={
                            "filterBtn flex ml-3  gap-2 " +
                            (activeBtn === filterName ? "active" : "")
                        }>
                            <p>{filterName}</p>
                        </button>
                    ))
                }
            </div>

            <div className="w-full md:w-[800px] grid grid-cols-1 md:grid-cols-2  flex-wrap bg-slate-200">
                {
                    activeBtn === "Dishes" ? dishes.map((data,id) => <SearchDishes key={id} data={data} />)
                        : restaurants.map((data,id) => <SearchRestaurants key={id} data={data} />)
                }
            </div>
           
          


        </div>

    )
}

export default Search