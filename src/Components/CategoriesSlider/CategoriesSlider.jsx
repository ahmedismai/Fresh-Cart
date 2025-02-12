import React, { useEffect, useState } from 'react'
import style from './CategoriesSlider.module.css'
import axios from 'axios'
import Slider from "react-slick";






export default function CategoriesSlider() {
  const [categorios,setcategorios]=useState([])

  function getProducts(){
    
    axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
    .then((res)=>{
      setcategorios(res.data.data)
    })
    .catch((res)=>{})
  }

useEffect(()=>{
  getProducts()
},[])

var settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 2,
  autoplay:true,
  autoplaySpeed:1000,
};

  return (
    <>
    <h2 className=' my-5 text-3xl '>Shop Popular Categories </h2>
        <Slider {...settings}>
          {categorios.map((category)=><div className='text-center' key={category._id} >
            <img src={category.image} className='w-full h-[100px] md:h-[300px] mb-4 object-cover' alt="" />
            <h4 >{category.name}</h4>
          </div>)}
        </Slider>
    </>
  )
}
