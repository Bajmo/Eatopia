import React from 'react'
import Logo from '../assets/logo.png'
import Burger from '../assets/burger.png'
import Sushi from '../assets/sushi.png'
import Location from '../assets/location.png'
import Droite from '../assets/droite.png'

const Welcome = () => {
  return (
    <div>
      <img className='absolute top-52 left-0 w-72' src={Sushi}/>
      <img className='absolute w-80 bottom-0 right-0' src={Burger}/>
      <div className='nav flex justify-between items-center px-32 py-4'>
      <img className='w-24' src={Logo}/>
        <div>
        <button className='px-8 py-4 rounded-3xl text-xs border border-black mr-2'>Sign In</button>
        <button className='bg-black text-white px-8 py-4 rounded-3xl text-xs'>Sign Up</button>
        </div>
      </div>
      <div className='flex flex-col items-center'>
      <p className='text-center px-96 py-7 text-xl'>Welcome to <span className='font-bold'>Eatopia</span>, where we help you find the perfect
         restaurant for any occasion. Get started by entering 
         your location and food preferences, and let us
          handle the rest. Sign up now and discover the best 
          dining experiences near you!</p>
      <div className='bg-zinc-200 flex items-center justify-between w-96 px-7 py-4 rounded-full'>
      <div className='flex items-center'>
      <img className='w-5' src={Location}/>
      <input className='bg-transparent placeholder:text-black placeholder:text-sm text-sm px-3 focus:outline-none focus:placeholder-transparent' placeholder='Where are you ?'/>
      </div>
      <img className='w-6' src={Droite}/>
      </div>
      </div>
      
    </div>
  )
}

export default Welcome