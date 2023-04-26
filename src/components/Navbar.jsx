import React from 'react'
import Logo from '../assets/logo.png'
import Heart from '../assets/heart.png'
import User from '../assets/user.png'
import Search from '../assets/search.png'

const Navbar = () => {
  return (
    <div className='flex items-center justify-between px-44 py-4 border-b'>
        <div className='flex items-center'>
        <img className='w-20' src={Logo}/>
        <div className='flex items-center border rounded-3xl px-3 py-1 ml-5'>
          <img className='w-4' src={Search}/>
          <input type="text" className='bg-transparent'/>
        </div>
        </div>
        <div className='flex items-center'>
          <div className='flex items-center mr-7'>
          <img className='w-5' src={Heart}/>
          <p className='text-sm ml-2'>My Wichlist</p>
        </div>
        <img className='w-5' src={User}/>
        </div>
      </div>
  )
}

export default Navbar