import React, { useContext, useState } from 'react'
import {useFormik} from 'formik';
import axios from 'axios'
import { UserContext } from '../../Context/userContext';
import { CartContext } from '../../Context/cartContext';



export default function Checkout() {
  
  let {Checkout,cartId}=useContext(CartContext)
  let formik = useFormik({
    initialValues:{
      details:"",
      phone:"",
      city:"",
    },
    onSubmit :()=> handleCheckout(cartId,window.location.origin + "/allorders")
  })


 async function handleCheckout(cartId,url){
    let {data}= await Checkout(cartId,url,formik.values)
    window.location.href=data.session.url
  }

  return (
    <>

  
    <h1 className='text-emerald-600 p-5 font-bold text-3xl text-center mb-10'>Checkout Now </h1>

    <form onSubmit={formik.handleSubmit} className="max-w-md mx-auto">
      
      
      <div className="relative z-0 w-full mb-5 group">
        <input type="text" name="details" value={formik.values.details} onChange={formik.handleChange} 
        onBlur={formik.handleBlur} id="details" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" " required />
        <label htmlFor="details" className="peer-focus:font-medium left-0 absolute text-sm text-gray-600  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Email</label>

      </div>

      <div className="relative z-0 w-full mb-5 group">
        <input type="tel" name="phone" value={formik.values.phone} onChange={formik.handleChange} 
        onBlur={formik.handleBlur} id="phone" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" " required />
        <label htmlFor="phone" className="peer-focus:font-medium left-0 absolute text-sm text-gray-600  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Phone</label>

      </div>
      <div className="relative z-0 w-full mb-5 group">
        <input type="text" name="city" value={formik.values.city} onChange={formik.handleChange} 
        onBlur={formik.handleBlur} id="city" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" " required />
        <label htmlFor="city" className="peer-focus:font-medium left-0 absolute text-sm text-gray-600  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your City</label>

      </div>

      
      <div className='flex gap-4 items-center'>
      <button type="submit" className="text-white bg-emerald-600 hover:bg-emborder-600 focus:ring-4 focus:outline-none focus:ring-emerald-600 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">
        Checkout     
      </button>
      
      </div>

      
    </form>
    </>
  )
}
