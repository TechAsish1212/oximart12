import React, { useState } from 'react'
import './ProductCard.css'

const ProductsCard = ({ item }: any) => {

  const [isHovered, setIsHovered] = useState(false);
  const [currentImage, setCurrentImage] = useState(1)

  return (
    <div className='group px-4 relative '>
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className='relative w-[250px] sm:w-full h-[350px] overflow-hidden  '>
        {item.images.map((image: string, index: number) => {
          return (
            <img 
            src={image} 
            alt="" 
            className='card-media object-top' 
            key={index} 
            style={{transform:`translateX(${(index-currentImage)*100}%)`}}
            />
          )
        })}
      </div>
    </div>
  )
}

export default ProductsCard