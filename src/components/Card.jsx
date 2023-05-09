import React from 'react'

const Card = (props) => {
  return (
    <div className='flex justify-center items-center border border-black px-4 py-3 rounded-full'>
        <p>{props.name}</p>
    </div>
  )
}

export default Card