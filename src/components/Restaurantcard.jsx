import React from 'react'
import Restaurant from '../assets/restaurant.jpg'
import { Rate } from 'antd';
import { Link , useNavigate } from 'react-router-dom'

const Restaurantcard = (props) => {
  const navigate = useNavigate();
  return (
    <div className='cursor-pointer' onClick={()=>navigate(`../details/${props.id}`)}>
        <img className='w-72 rounded-3xl' src={Restaurant}/>
        <p>{props.title}</p>
        <div>
        <Rate disabled defaultValue={props.rate} />
        <span className='text-xs ml-2'>{props.rate}</span>
        </div>
    </div>
  )
}

export default Restaurantcard