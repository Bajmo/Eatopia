import React ,{useEffect,useState} from 'react'
import Logo from '../assets/logo.png'
import Heart from '../assets/heart.png'
import User from '../assets/user.png'
import Search from '../assets/search.png'
import Restaurant from '../assets/restaurant.jpg'
import { Rate } from 'antd';
import Navbar from '../components/Navbar'
import Restaurantcard from '../components/Restaurantcard'

const Homepage = () => {
  const [restaurants, setRestaurants] = useState([]);
  
  // useEffect to fetch restaurants
  useEffect(() => {
    fetch('http://127.0.0.1:8000/restaurants')
      .then(response => response.json())
      .then(data => {
        setRestaurants(data);
        
      })
      .catch(error => console.error(error));
  }, []); 
  return (
    <div>
      <Navbar/>
      <div className='flex h-screen'>
        <div className='w-60 border-r p-5'>
          <p className='text-black text-sm'>Categories</p>
        </div>
        <div className='w-full p-7'>
          <p className='text-black text-lg px-72'>Hello <span className='font-bold'>Mehdi</span>, Based on your dining 
          preferences, we recommend the following restaurants.</p>
          <div className='grid grid-cols-3 mt-6 gap-5'>
             {restaurants.map((e)=>(
              <Restaurantcard id={e.id} title={e.name} rate={e.average_rating}/>
             ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Homepage