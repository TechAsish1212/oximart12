// import React from 'react'
// import { useNavigate } from 'react-router-dom'

const ElectronicCategoryCard = ({item}:any) => {
    // const navigate=useNavigate();
  return (
    <div className='flex w-20 flex-col items-center gap-3 cursor-pointer'>
        <img src={item.image} alt="" className='object-contain h-10' />
        <h2 className='font-semibold text-sm'>{item.name}</h2>
    </div>
  )
}

export default ElectronicCategoryCard
