import React, { useContext, useEffect, useState } from 'react'
import style from './Profile.module.css'
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import { UserContext } from '../../Context/userContext';
import { Link, useNavigate } from 'react-router-dom';

export default function Profile() {
  const [Users,setUsers]=useState()
  const getUserIdFromToken = () => {
    const token = localStorage.getItem("userToken");
    if (!token) return null;
    
    try {
      return jwtDecode(token).id;
    } catch (error) {
      console.error("❌ Error decoding token:", error);
      return null;
    }
  };
  async function GetProfileDetails() {
    if (!userId) return;

    try {
      const response = await axios.get(`https://ecommerce.routemisr.com/api/v1/users/${userId}`);
      setUsers(response.data.data);
    } catch (error) {
      console.log( error);
    }
  };
  
 
   useEffect(()=>{
    GetProfileDetails()
  },[])
  const userId = getUserIdFromToken();

  const navigate=useNavigate()
  function ChangePassword(){
    navigate('change-password')
  }
  
  function UpdateData(){
    navigate('update')
  }
  
 
  return (
    <>


  

    <h1 className='text-emerald-600 p-5 font-bold text-3xl text-center mt-5 capitalize'>My Profile </h1>
    <div className="max-w-md mx-auto">
      
      
      <div className="relative z-0 w-full my-5 group">
        <input disabled type="text" name="userName"  id="userName" className="block py-2.5 my-12  text-black px-2 w-full text-md border  border-emerald-500 placeholder:text-black" placeholder={Users?.name}  />
        <label htmlFor="userName" className=" left-0px absolute top-[-33px] text-xl text-black   ">Username:</label>
      </div>
      <div className="relative z-0 w-full my-5 group">
        <input disabled type="email" name="email"  id="email" className="block py-2.5 px-2 w-full text-md text-gray-900   border border-emerald-500 placeholder:text-black " placeholder={Users?.email}  />
        <label htmlFor="email" className=" left-[0px] absolute text-xl text-black top-[-33px]">User Email:</label>
      </div>
      <div className="relative z-0 w-full mt-10 mb-5 group">
        <input disabled type="tel" name="phone"  id="phone" className="block py-2.5 px-2  w-full text-md text-gray-900   border border-emerald-500 placeholder:text-black " placeholder={Users?.phone}  />
        <label htmlFor="phone" className=" left-[0px] absolute text-xl text-black top-[-33px]">User phone:</label>
      </div>
      

      

      
      <div className='flex gap-4 items-center'>
      <button onClick={UpdateData} className="hover:bg-gray-200 hover:text-emerald-500 text-white  bg-emerald-500 hover:bg-emborder-600 focus:ring-4 focus:outline-none focus:ring-emerald-600 font-medium rounded-lg text-sm w-1/2  px-5 py-2.5 text-center">
        Update Data
      </button>
      <button onClick={ChangePassword} className="hover:bg-gray-200 hover:text-emerald-500 text-white  bg-emerald-500 hover:bg-emborder-600 focus:ring-4 focus:outline-none focus:ring-emerald-600 font-medium rounded-lg text-sm w-1/2  px-5 py-2.5 text-center">
        Change Password
      </button>
      </div>
      

      
    </div>
    </>
  )
}
