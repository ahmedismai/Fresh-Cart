import React, { useContext, useState } from 'react'
import style from './ChangePassword.module.css';
import {useFormik} from 'formik';
import * as yup from 'yup'
import axios from 'axios'
import {Link, useNavigate} from 'react-router-dom'
import { UserContext } from '../../Context/userContext';
import { toast } from 'react-hot-toast';





export default function ChangePassword() {

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

 async function handleChangePassword(values){
   
  setisLoading(true)
    axios.put(`https://ecommerce.routemisr.com/api/v1/users/changeMyPassword
    `, values,{headers})
    .then((res)=>{
      toast.success("Password updated successfully! ")
       signout()
       navigate("/login")

    })
    .catch((err)=>{
      toast.error("Cannot Update Password! ")
    }).finally(
      setisLoading(false)
    )
    
  }




  let formik = useFormik({
    initialValues:{
      currentPassword:"",
      password:"",
      rePassword:"",
      
    },
    
    onSubmit : handleChangePassword
  })


  return (
    <>


  {isLoading && (
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
      )}

    <h1 className='text-emerald-600 p-5 font-bold text-3xl text-center mb-10 capitalize'>Change your password </h1>
    <form onSubmit={formik.handleSubmit} className="max-w-md mx-auto">
      
      
      <div className="relative z-0 w-full my-5 group">
        <input type="password" name="currentPassword" value={formik.values.currentPassword} onChange={formik.handleChange} onBlur={formik.handleBlur} id="currentPassword" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" " required />
        <label htmlFor="currentPassword" className="peer-focus:font-medium left-0 absolute text-sm text-gray-600  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your currentPassword</label>
      </div>
      <div className="relative z-0 w-full my-5 group">
        <input type="password" name="password" value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} id="password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" " required />
        <label htmlFor="password" className="peer-focus:font-medium left-0 absolute text-sm text-gray-600  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your New password</label>
      </div>
      <div className="relative z-0 w-full my-5 group">
        <input type="password" name="rePassword" value={formik.values.rePassword} onChange={formik.handleChange} onBlur={formik.handleBlur} id="rePassword" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" " required />
        <label htmlFor="rePassword" className="peer-focus:font-medium left-0 absolute text-sm text-gray-600  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your New Password</label>
      </div>

      

      <Link to='/forgetpassword' className='text-emerald-500'>Forget Password?</Link>
      <div className='flex gap-4 items-center py-2 my-2'>
      <button type='submit' className="hover:bg-gray-200 hover:text-emerald-500 text-white w bg-emerald-500 hover:bg-emborder-600 focus:ring-4 focus:outline-none focus:ring-emerald-600 font-medium rounded-lg text-sm w-full  px-5 py-2.5 text-center">
      {isLoading ? <i className="fas fa-spinner fa-spin"></i>:"Update"}
      </button>
      </div>
      

      
    </form>
    </>
  )
}
