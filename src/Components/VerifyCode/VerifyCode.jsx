import React, { useContext, useState } from 'react'
import style from './VerifyCode.module.css';
import {useFormik} from 'formik';
import * as yup from 'yup'
import axios from 'axios'
import {Link, useNavigate} from 'react-router-dom'
import { UserContext } from '../../Context/userContext';



export default function VerifyCode() {

  const [data,setData] = useState('')
  const [isLoading,setisLoading] = useState(false)
  let navigate=useNavigate()

 async function handleForgetPassword(values){
   
  setisLoading(true)
  
    axios.post(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`, values)
    .then((res)=>{
      if(res.data.status=="Success"){
        navigate("/reset-passowrd")
      }
    })
    .catch((err)=>{
      console.log(err)
      setisLoading(false)
    })
  }




  let formik = useFormik({
    initialValues:{
      resetCode:"",
      
    },
    
    onSubmit : handleForgetPassword
  })


  return (
    <>


  

    <h1 className='text-emerald-600 p-5 font-bold text-3xl text-center mt-20 capitalize'>Account Recovery </h1>
    <form onSubmit={formik.handleSubmit} className="max-w-md mx-auto">
      
      
      <div className="relative z-0 w-full my-5 group">
        <input type="resetCode" name="resetCode" value={formik.values.resetCode} onChange={formik.handleChange} onBlur={formik.handleBlur} id="resetCode" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" " required />
        <label htmlFor="resetCode" className="peer-focus:font-medium left-0 absolute text-sm text-gray-600  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your resetCode</label>
      </div>

      

      
      <div className='flex gap-4 items-center'>
      <button type="submit" className="hover:bg-gray-200 hover:text-emerald-500 text-white  bg-emerald-600 hover:bg-emborder-600 focus:ring-4 focus:outline-none focus:ring-emerald-600 font-medium rounded-lg text-sm w-full  px-5 py-2.5 text-center">
      {isLoading ? <i className="fas fa-spinner fa-spin"></i>:"Confirm Reset Code"}
      </button>
      </div>
      

      
    </form>
    </>
  )
}
