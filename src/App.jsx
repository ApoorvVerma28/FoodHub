import React, { useState,useEffect } from 'react'
import Navbar from './components/Navbar';
import Body from './components/Body';
import { Routes, Route } from 'react-router-dom';
import RestaurantMenu from './components/RestaurantMenu';
import { Visibility, Coordinate, CartContext } from './Context/contextApi';
import Cart from './components/Cart';
const App = () => {
  const [visible, setVisible] = useState(false);
  const [coord, setCoord] = useState({
    lat: 26.8466937, lng:
      80.94616599999999
  })
  const [cartData, setCartData] = useState([])
  function getDataFromLocalStorage() {
    const data = JSON.parse(localStorage.getItem("cartData")) || []
    setCartData(data);
  }

useEffect(() =>{

getDataFromLocalStorage();

})

  return (
    <CartContext.Provider value={{ cartData, setCartData }}>
      <Coordinate.Provider value={{ coord, setCoord }}>
        <Visibility.Provider value={{ visible, setVisible }}>
          <div className={visible ? 'max-h-screen overflow-hidden' : ''}>
            <Routes >
              <Route path="/" element={<Navbar />}>
                <Route path='/' element={<Body />} />
                <Route path='/restaurantMenu/:id' element={<RestaurantMenu />} />
                <Route path='/cart' element={<Cart />} />
                <Route path='/*' element={<h1 className='text-2xl p-5'>Coming Soon....</h1>} />
              </Route>

            </Routes>
          </div>
        </Visibility.Provider>
      </Coordinate.Provider>
    </CartContext.Provider>
  )
}

export default App;