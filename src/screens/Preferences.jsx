import React from 'react'
import Logo from '../assets/logo.png'

import Card from '../components/Card'
import Droite from '../assets/droite.png'
const Preferences = () => {
  return (
    <div className='flex flex-col items-center'>
        <img className='w-24 mt-16' src={Logo}/>
        <p className='text-xl p-7'>Specify your preferences</p>
        <div className=''>
        <div className='flex gap-1'>
          <Card/>
          <Card/>
          <Card/>
          <Card/>
        </div>
        <div className='flex ml-6 mt-1 gap-1'>
          <Card/>
          <Card/>
          <Card/>
          <Card/>
        </div>
        <div className='flex ml-12 mt-1 gap-1'>
          <Card/>
          <Card/>
          <Card/>
          <Card/>
        </div>
        <div className='flex mt-1 gap-1'>
          <Card/>
          <Card/>
          <Card/>
          <Card/>
        </div>
        </div>
        
        
    </div>
  )
}

export default Preferences