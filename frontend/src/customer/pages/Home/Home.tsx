import React from 'react'
import ElectronicCategory from './ElectronicCategory/ElectronicCategory'
import Grid from './TopBrands/Grid'
import Deal from './Deal/Deal'
import HomeCategory from './HomeCategory/HomeCategory'
import { Button } from '@mui/material'
import StorefrontIcon from '@mui/icons-material/Storefront';

const Home = () => {
    return (
        <div className='space-y-10'>
            <ElectronicCategory />
            <section>
                <Grid />
            </section>

            <section className='pt-10'>
                <h1 className='text-3xl font-black text-green-400 text-center pb-5'>Today's Deal</h1>
                <Deal />
            </section>

            <section className='pt-10'>
                <h1 className='text-3xl font-black text-green-400 text-center pb-5'>Shop By categories</h1>
                <HomeCategory />
            </section>

            <section className='lg:px-20 relative h-[200px] lg:h-[450px] object-cover'>
                <img src="src/assets/seller_banner_image.jpg" alt="" />
                <div className='absolute top-1/2 left-4 lg:left-[15rem] transform -translate-y-1/2 font-semibold lg:text-4xl space-y-3'>
                    <h1>Sell your Product</h1>
                    <p className='text-lg md:text-2xl'>With <strong className='logo text-3xl md:text-5xl pl-2'>OxiMart</strong></p>
                    <div className='pt-6 flex justify-center'>
                        <Button startIcon={<StorefrontIcon/>} variant='contained'>Become Seller</Button>
                    </div>
                </div>
            </section>

        </div>
    )
}

export default Home
