import React from 'react'
import Restaurant from '../assets/restaurant.jpg'
import Heart from '../assets/redheart.png'
import { Rate } from 'antd'
import { Link , useNavigate } from 'react-router-dom'

const Restaurantcard = (props) => {
  const navigate = useNavigate();
  return (
    <div className='cursor-pointer relative w-72' onClick={()=>navigate(`../details/${props.id}`)}>
        <div className='bg-white inline-block absolute right-3 top-3 rounded-full p-1'>
        <img className='w-5 rounded-3xl' src={Heart}/>
        </div>
        <img className='rounded-3xl' src={Restaurant}/>
        <p>{props.title}</p>
        <div>
        <Rate disabled defaultValue={props.rate} />
        <span className='text-xs ml-2'>{props.rate}</span>
        </div>
    </div>
  )
}

export default Restaurantcard