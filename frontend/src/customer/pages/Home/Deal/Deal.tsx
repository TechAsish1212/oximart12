import React from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import DealCard from './DealCard'

const Deal = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay:true,
    autoplaySpeed:2000,
    // cssEase:"linear",

  };
  
  return (
    <div className='py-5 lg:px-20'>

      <div className='slide-container'>
        <Slider {...settings}>
          {
            [1, 1, 1,1, 1, 1,1].map((item,index) => (
              <div key={index} className='px-2'>
                <DealCard deal={{ image: "https://rukminim2.flixcart.com/image/612/612/xif0q/smartwatch/f/g/g/-original-imagywnz46fngcks.jpeg?q=70", discount: "10" }} />
              </div>
            ))
          }
        </Slider>
      </div>

    </div>
  )
}

export default Deal
