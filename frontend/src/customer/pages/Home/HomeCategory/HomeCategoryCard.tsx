import React from 'react'
// import "./HomeCategoryCard.css"

const HomeCategoryCard = () => {
  return (
    <div className='flex gap-3 flex-col justify-center items-center group cursor-pointer'>
      <div className='custom-border w-[150px] lg:w-[249px] h-[150px] lg:h-[249px] rounded-full bg-teal-400 '>
        <img className='group-hover:scale-95 transition-transform transform duration-700 object-cover object-top h-full w-full rounded-full' src={"https://www.homesake.in/cdn/shop/files/IH0F143-PJT-1-Theme.jpg?v=1748346148"} alt="" />
      </div>
      <h1>{"Lamp & "}</h1>
    </div>
  )
}

export default HomeCategoryCard
