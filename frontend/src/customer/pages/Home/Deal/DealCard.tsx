import React from 'react'

const DealCard = ({ deal }: any) => {
  return (
    <div className='w-full cursor-pointer gap-2'>
      <img src={deal.image} alt="" className='border-x-[7px] border-t-[7px] mt-5 border-pink-600 w-full h-[12rem] object-cover object-top' />

      <div className='border-4 border-black bg-black text-white p-2 text-center '>
        <p className='text-2xl font-bold'>{deal.discount}</p>
        <p className='font-bold capitalize'>shop now</p>
      </div>

    </div>
  )
}

export default DealCard
