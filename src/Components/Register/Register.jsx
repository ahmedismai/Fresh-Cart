import React, { useContext } from 'react'
import style from './Register.module.css';
import {useFormik} from 'formik';
import * as yup from 'yup'
import axios from 'axios'
import {Link, useNavigate} from 'react-router-dom'
import { useState } from 'react';
import { UserContext } from '../../Context/userContext';





export default function Register() {
  let {userLogin,setuserLogin}=useContext(UserContext);
  const [ApiError,setApiError] = useState('')
  const [isLoading,setisLoading] = useState(false)
  let navigate=useNavigate()

   function handleRegister(values){
    setisLoading(true)
    axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, values)
    .then((res)=>{
      if(res.data.message == "success"){
        localStorage.setItem("userToken",res.data.token)
        setuserLogin(res.data.token)
        navigate('/')
      }
    })
    .catch((res)=>{
      setApiError(res.response.data.message)
      setisLoading(false)
    })
  }


let validationSchema =yup.object().shape({
  name: yup.string().min(3 , 'min length is 3').max(14 , "max length 14").required("Name is required"),
  email: yup.string().email("Invalid email address").required("Email is required"),
  password: yup.string().min(6, "Password must be at least 6 characters long").required("Password is required"),
  rePassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match').required("Confirm Password is required"),
  phone: yup.string().matches(/^01[1025][0-9]{8}$/, 'Invalid phone number').required("Phone number is required")
 ,
})

  let formik = useFormik({
    initialValues:{
      name:"",
      email:"",
      password:"",
      rePassword:"",
      phone:"",
    },
    validationSchema:validationSchema,
    onSubmit : handleRegister
  })


  return (
    <>

      {ApiError &&  <div className='text-center w-1/3 mx-auto bg-red-600 text-white font-bold rounded-lg p-3 '>{ApiError}</div>
      }
    <h1 className='text-emerald-600 p-5 font-bold text-3xl text-center'>Register Now </h1>
    <form onSubmit={formik.handleSubmit} className="max-w-md mx-auto">
      <div className="relative z-0 w-full mb-5 group">
        <input type="text" name="name" value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur} id="name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" " required />
        <label htmlFor="name" className="peer-focus:font-medium left-0 absolute text-sm text-gray-600  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Name</label>

        {formik.errors.name && formik.touched.name ? (<div className='p-4 mb-4 text-sm text-red-800 rounded-lg' role='alert'>
          <span className='font-medium'>{formik.errors.name}</span>
        </div>) : null}
      </div>
      
      <div className="relative z-0 w-full mb-5 group">
        <input type="email" name="email" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} id="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" " required />
        <label htmlFor="email" className="peer-focus:font-medium left-0 absolute text-sm text-gray-600  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Email</label>

        {formik.errors.email && formik.touched.email ? (<div className='p-4 mb-4 text-sm text-red-800 rounded-lg' role='alert'>
          <span className='font-medium'>{formik.errors.email}</span>
        </div>) : null}
      </div>

      <div className="relative z-0 w-full mb-5 group">
        <input type="password" name="password" value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} id="password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" " required />
        <label htmlFor="password" className="peer-focus:font-medium left-0 absolute text-sm text-gray-600  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Password</label>

        {formik.errors.password && formik.touched.password ? (<div className='p-4 mb-4 text-sm text-red-800 rounded-lg' role='alert'>
          <span className='font-medium'>{formik.errors.password}</span>
        </div>) : null}
      </div>

      <div className="relative z-0 w-full mb-5 group">
        <input type="password" name="rePassword" value={formik.values.rePassword} onChange={formik.handleChange} onBlur={formik.handleBlur} id="rePassword" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" " required />
        <label htmlFor="rePassword" className="peer-focus:font-medium left-0 absolute text-sm text-gray-600  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your rePassword</label>

        {formik.errors.rePassword && formik.touched.rePassword ? (<div className='p-4 mb-4 text-sm text-red-800 rounded-lg' role='alert'>
          <span className='font-medium'>{formik.errors.rePassword}</span>
        </div>) : null}
      </div>
      <div className="relative z-0 w-full mb-5 group">
        <input type="tel" name="phone" value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur} id="phone" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" " required />
        <label htmlFor="phone" className="peer-focus:font-medium left-0 absolute text-sm text-gray-600  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Phone</label>

        {formik.errors.phone && formik.touched.phone ? (<div className='p-4 mb-4 text-sm text-red-800 rounded-lg' role='alert'>
          <span className='font-medium'>{formik.errors.phone}</span>
        </div>) : null}
      </div>

      <div className='flex gap-4 items-center'>
      <button type="submit" className="text-white bg-emerald-600 hover:bg-emborder-600 focus:ring-4 focus:outline-none focus:ring-emerald-600 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">
      {isLoading ? <i className="fas fa-spinner fa-spin"></i>:"Register"}
      </button>
      <Link to={"/login"}>
        <span className='text-blue-500 underline'>Do you have an account? Login Now</span>
      </Link>
      </div>
      
    </form>
    </>
  )
}
