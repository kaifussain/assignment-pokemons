import React from 'react'
import './Card.css'

const Card = ({name,imageUrl}) => {
  return (
    <div className='Card'>
        <img src={imageUrl}/>
        {/* Capitalize the first letter of the name*/}
        <div>{name[0].toUpperCase()+name.slice(1)}</div>
    </div>
  )
}

export default Card