import React from 'react'
import style from './MainSlider.module.css'
import slade1 from '../../assets/finalProjectImages/images/slider-image-1.jpeg'
import slade2 from '../../assets/finalProjectImages/images/slider-image-2.jpeg'
import slade3 from '../../assets/finalProjectImages/images/slider-image-3.jpeg'
import slade4 from '../../assets/finalProjectImages/images/grocery-banner.png'
import slade5 from '../../assets/finalProjectImages/images/grocery-banner-2.jpeg'

import Slider from "react-slick";


export default function MainSlider() {

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay:true,
    autoplaySpeed:1000,
    arrows:false,
  };


  return (
    <>
        
        <div className='flex flex-wrap items-center my-0'>
            <div className='w-3/4'>
            <Slider {...settings}>
              <img src={slade3} className='w-full h-[200px] md:h-[400px] object-cover' alt="" />
              <img src={slade4} className='w-full h-[200px] md:h-[400px] object-cover' alt="" />
              <img src={slade5} className='w-full h-[200px] md:h-[400px] object-cover' alt="" />
              </Slider>
            </div>
            <div className='w-1/4'>
            <img src={slade3} className='w-full h-[100px] md:h-[200px]' alt="" />
            <img src={slade2} className='w-full h-[100px] md:h-[200px]' alt="" />

            </div>
          </div>
    </>
  )
}
