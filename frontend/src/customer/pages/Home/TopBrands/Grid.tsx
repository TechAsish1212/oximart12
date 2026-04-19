import React from 'react'

const Grid = () => {
  return (
    <div className='grid gap-4 grid-rows-12 grid-cols-12 lg:h-[600px] px-5 lg:px-20 py-4 '>
      <div className='col-span-3 row-span-12 text-white rounded-md'>
        <img src="https://m.media-amazon.com/images/I/61m1D-aTPNL._AC_UY1100_.jpg" alt="grid 1st image" className="w-full h-full object-cover rounded-md" />
      </div>
      <div className='col-span-2 row-span-6 text-white rounded-md'>
        <img src="https://www.whirlpool.com/is/image/content/dam/business-unit/whirlpoolv2/en-us/marketing-content/site-assets/page-content/refer-sclp-25/mh-2-m.jpg?$atomic-mobile$&fit=constrain&fmt=webp-alpha&qlt=100&bfc=off" alt="grid 2nd image" className="w-full h-full object-cover rounded-md"/>
      </div>
      <div className='col-span-4 row-span-6 text-white rounded-md'>
        <img src="https://sukkhi.com/cdn/shop/products/N73718_MIXBG1_2000x.jpg?v=1551866942" alt="grid 2nd image" className="w-full h-full object-cover rounded-md"/>
      </div>
      <div className='col-span-3 row-span-12 text-white rounded-md'>
        <img src="https://thekurtacompany.com/cdn/shop/files/XFHH.jpg?v=1718802926&width=1200" alt="grid 2nd image"  className="w-full h-full object-cover object-top rounded-md"/>
      </div>
      <div className='col-span-4 row-span-6 text-white rounded-md'>
        <img src="https://www.lifewire.com/thmb/ad6rVm_qAnrcFz0GoWVzQCzQ62s=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-2152164861-74211e0c48c441c29d1476d29fea732a.jpg" alt="grid 2nd image" className="w-full h-full object-cover rounded-md"/>
      </div>
      <div className='col-span-2 row-span-6 text-white rounded-md'>
        <img src="https://hips.hearstapps.com/hmg-prod/images/index2-660d8cf65cd7f.jpg?crop=0.5xw:1xh;center,top&resize=640:*" alt="grid 2nd image" className="w-full h-full object-cover rounded-md"/>
      </div>
    </div>
  )
}

export default Grid
