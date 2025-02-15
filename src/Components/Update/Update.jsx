import React, { useContext, useEffect, useState } from 'react'
import style from './Update.module.css';
import {useFormik} from 'formik';
import * as yup from 'yup'
import axios from 'axios'
import {Link, useNavigate} from 'react-router-dom'
import { UserContext } from '../../Context/userContext';
import { toast } from 'react-hot-toast';





export default function UpdateData() {

  const [data,setData] = useState('')
  const [isLoading,setisLoading] = useState(false)
  let navigate=useNavigate()
  let headers ={
    token: localStorage.getItem("userToken")
}

let {userLogin , setuserLogin}=useContext(UserContext)
function signout(){
  localStorage.removeItem("userToken")
  localStorage.removeItem("userEmail")
  setuserLogin(null)
  navigate("/login")
}

 async function handleUpdateData(values){
   
  setisLoading(true)
  setisLoading(true)
    axios.put(`https://ecommerce.routemisr.com/api/v1/users/updateMe/
    `, values,{headers})
    .then((res)=>{
      toast.success(" Update Data successfully! ")
      signout()
       navigate("/")
    })
    .catch((err)=>{
      toast.error(" Cannot Update Data! ")
      setisLoading(false)
    })
  }
 

  let formik = useFormik({
    initialValues:{
      name:"",
      email:"",
      phone:"",
      
    },
    
    onSubmit : handleUpdateData
  })


  return (
    <>


  

    <h1 className='text-emerald-600 p-5 font-bold text-3xl text-center mt-20 capitalize'>Change your Data </h1>
    <form onSubmit={formik.handleSubmit} className="max-w-md mx-auto">
      
      
      <div className="relative z-0 w-full my-5 group">
        <input type="text" name="name" value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur} id="name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" " required />
        <label htmlFor="name" className="peer-focus:font-medium left-0 absolute text-sm text-gray-600  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your name</label>
      </div>
      <div className="relative z-0 w-full my-5 group">
        <input type="email" name="email" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} id="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" " required />
        <label htmlFor="email" className="peer-focus:font-medium left-0 absolute text-sm text-gray-600  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your New email</label>
      </div>
      <div className="relative z-0 w-full my-5 group">
        <input type="tel" name="phone" value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur} id="phone" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" " required />
        <label htmlFor="phone" className="peer-focus:font-medium left-0 absolute text-sm text-gray-600  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your New Phone</label>
      </div>

      

      <div className='flex gap-4 items-center '>
      <button type='submit' className="hover:bg-gray-200 hover:text-emerald-500 text-white w bg-emerald-500 hover:bg-emborder-600 focus:ring-4 focus:outline-none focus:ring-emerald-600 font-medium rounded-lg text-sm w-full  px-5 py-2.5 text-center">
      {isLoading ? <i className="fas fa-spinner fa-spin"></i>:"Update"}
      </button>
      </div>
      

      
    </form>
    </>
  )
}
