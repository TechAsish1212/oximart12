import React, { useState } from 'react'
import FilterSection from './FilterSection'
import { Divider, FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import ProductsCard from './ProductsCard';

const product =
{
  images: [
    "https://images.squarespace-cdn.com/content/v1/62957e003c63212b17de5749/cb3406ee-bb0d-418c-9ba1-4f182180ef2a/Sennheiser-Product-Gel0018.jpg",
    "https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTExL3JtMzYyLTAxYS1tb2NrdXAuanBn.jpg",
    "https://www.dropicts.com/wp-content/uploads/Dropicts-Feautred-Images-Beauty-Product-02.jpg",
    "https://i.pinimg.com/236x/89/e2/83/89e283ed8495bac5c5dae62084d78a43.jpg"

  ]
}

const Products = () => {

  const [sort, setSort] = useState("price_low");

  const handleSortProduct = (e: any) => {
    setSort(e.target.value);
  }

  return (
    <div className='-z-10 mt-10 '>
      <div className=''>
        <h1 className='text-3xl text-center font-bold text-gray-700 pb-5 px-9 uppercase  space-x-2'>Sports</h1>
      </div>

      <div className='lg:flex'>
        <section className='border-r hidden lg:block w-[20%] min-h-screen border-gray-300'>
          <FilterSection />
        </section>
        <section className='w-full lg:w-[80%] space-y-5'>
          <div className='flex justify-between items-center px-9 h-[40px] '>
            <div>

            </div>
            <FormControl>
              <InputLabel id="sort">Sort</InputLabel>
              <Select
                labelId="sort"
                id="sort"
                value={sort}
                label="Sort"
                onChange={handleSortProduct}
              >
                <MenuItem value={"price_low"}>Price: Low - High</MenuItem>
                <MenuItem value={"price_high"}>Price: High - Low</MenuItem>
              </Select>
            </FormControl>
          </div>

          <Divider />

          <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-5 px-5 justify-center'>
            {[1, 1, 1, 1, 1].map((item, index) =>
              <div key={index * 3}>
                <ProductsCard item={product} />
              </div>
            )}
          </div>

        </section>
      </div>

    </div>
  )
}

export default Products