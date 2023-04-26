import React from 'react'
import Suship from '../assets/suship.png'
const Card = () => {
  return (
    <div className='flex items-center border border-black px-4 py-3 rounded-full'>
        <p>Asian</p>
        <img className='w-5 ml-2' src={Suship}/>
    </div>
  )
}

export default Card