import React from 'react'
import Navbar from './components/Navbar';
import Body from './components/Body';
import {  Routes, Route } from'react-router-dom';
import RestaurantMenu from './components/RestaurantMenu';
const App = () => {
  return (
    <>
    <Routes >
      <Route path="/" element={<Navbar/>}>
        <Route path='/' element={<Body/>}/>
        <Route path='/restaurantMenu/:id' element={<RestaurantMenu/>}/>
      </Route> 
     
    </Routes>
    </>
  )
}

export default App;