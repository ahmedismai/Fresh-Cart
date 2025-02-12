import React, { useContext, useState } from 'react'
import style from './ForgetPassword.module.css';
import {useFormik} from 'formik';
import * as yup from 'yup'
import axios from 'axios'
import {Link, useNavigate} from 'react-router-dom'
import { UserContext } from '../../Context/userContext';



export default function ForgetPassword() {

  const [data,setData] = useState('')
  const [isLoading,setisLoading] = useState(false)
  let navigate=useNavigate()

 async function handleForgetPassword(values){
   
  setisLoading(true)
    axios.post(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`, values)
    .then((res)=>{
      if(res.data.statusMsg == "success"){
        setData(res.data.message)
        navigate("/verify-code")
        setisLoading(false)
      }
    })
    .catch((err)=>{
      console.log(err)
      setisLoading(false)
    })
  }




  let formik = useFormik({
    initialValues:{
      email:"",
      
    },
    
    onSubmit : handleForgetPassword
  })

  if (isLoading) {
    return (
      <div className="sk-circle">
        <div className="sk-circle1 sk-child"></div>
        <div className="sk-circle2 sk-child"></div>
        <div className="sk-circle3 sk-child"></div>
        <div className="sk-circle4 sk-child"></div>
        <div className="sk-circle5 sk-child"></div>
        <div className="sk-circle6 sk-child"></div>
        <div className="sk-circle7 sk-child"></div>
        <div className="sk-circle8 sk-child"></div>
        <div className="sk-circle9 sk-child"></div>
        <div className="sk-circle10 sk-child"></div>
        <div className="sk-circle11 sk-child"></div>
        <div className="sk-circle12 sk-child"></div>
      </div>
    );
  }
  
  return (
    <>


  

    <h1 className='text-emerald-600 p-5 font-bold text-3xl text-center mb-10 capitalize'>reset your account password </h1>
    <form onSubmit={formik.handleSubmit} className="max-w-md mx-auto">
      
      
      <div className="relative z-0 w-full my-5 group">
        <input type="email" name="email" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} id="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" " required />
        <label htmlFor="email" className="peer-focus:font-medium left-0 absolute text-sm text-gray-600  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Email</label>
      </div>

      

      
      <div className='flex gap-4 items-center'>
      <button type="submit" className="hover:bg-gray-200 hover:text-emerald-500 text-white  bg-emerald-600 hover:bg-emborder-600 focus:ring-4 focus:outline-none focus:ring-emerald-600 font-medium rounded-lg text-sm w-full  px-5 py-2.5 text-center">
      {isLoading ? <i className="fas fa-spinner fa-spin"></i>:"Send Reset Code"}
      </button>
      </div>
      

      
    </form>
    </>
  )
}
