"use client"
import React, { useContext, useEffect, useState } from 'react'
import style from './Navbar.module.css'
import logo from "../../assets/images/freshcart-logo.svg"
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { UserContext } from '../../Context/userContext'
import { CartContext } from '../../Context/cartContext'
import { jwtDecode } from 'jwt-decode'
import axios from 'axios'
import { Avatar, Dropdown, Navbar } from "flowbite-react";

export default function NavbarComponent() {

  let navigate = useNavigate()
  const[userName,setuserName]=useState()
  let {userLogin , setuserLogin}=useContext(UserContext)
  let {number , setnumber}=useContext(CartContext)
  function signout(){
    localStorage.removeItem("userToken")
    setuserLogin(null)
    navigate("/login")
  }

  

  let headers ={
    token: localStorage.getItem("userToken")
}

  async function VerifyToken(){
   if(userLogin)
      axios.get(`https://ecommerce.routemisr.com/api/v1/auth/verifyToken
      `,{headers})
      .then((res)=>{
        setuserName(res.data.decoded.name.split("").slice(0,1).join(""))
      })
      .catch((err)=>{
        console.log(err)
        
      })
    }
  
  useEffect(()=>{
    VerifyToken()
  },[userName])
  
  


  return(
    <>
      
        <Navbar fluid rounded className="p-4 shadow-xl">
          <Navbar.Brand className="xl:px-28" href="/">
            <img src={logo} width={"120px"} className="h-8 " alt="Logo" />
          </Navbar.Brand>
          
          <div className="flex md:order-2 justify-center items-center xl:px-28">
            <NavLink to="/wishlist" className={({ isActive }) => (isActive ? "px-2 text-emerald-500 font-bold" : "px-2 text-gray-700")}>
              Wishlist <i className="mx-2 fa-solid fa-heart"></i>
            </NavLink>
            <NavLink to="/cart" className={({ isActive }) => (isActive ? "px-2 text-emerald-500 font-bold" : "px-2 text-gray-700")}>
              <div className="inline-flex items-center border-r border-l px-2 py-2">
                Cart <i className="mx-2 fa-solid fa-cart-shopping text-xl"></i>
                {number !== 0 && userLogin ? (
                  <span className="bg-emerald-500 size-5 rounded-full flex justify-center items-center relative top-[-16px] left-[-15px] text-white">
                    {number}
                  </span>
                ):null}
              </div>
            </NavLink>
            {userLogin ? (<>
            <Dropdown
              arrowIcon={false}
              inline
              label={
                <div className="border size-8 border-emerald-500 rounded-full inline-flex items-center font-medium justify-center text-sm text-gray-900 cursor-pointer">
              {userName}
            </div>
              }
            >
              <Dropdown.Header>
                <NavLink to="/profile" className={({ isActive }) => (isActive ? "block text-emerald-500 font-bold my-2" : "block text-gray-700 my-2")}>
                  Profile
                </NavLink>
                <NavLink to="/allorders" className={({ isActive }) => (isActive ? "block text-emerald-500 font-bold" : "block text-gray-700")}>
                  All Orders
                </NavLink>
              </Dropdown.Header>
              <Dropdown.Item>
                <span onClick={signout}>Sign out</span>
              </Dropdown.Item>
            </Dropdown>
            <Navbar.Toggle />
          
          </>): (
            <>
            <div className="flex items-center md:order-2 space-x-1 md:space-x-0">
            <NavLink to="/login" className="py-2 px-3 text-black rounded-sm">
              Login
            </NavLink>
          </div>
            </>
          )}
          </div>
          <Navbar.Collapse>
            <NavLink to="/" className={({ isActive }) => (isActive ? "text-emerald-500 font-bold" : "text-gray-700")}>
              Home
            </NavLink>
            <NavLink to="/products" className={({ isActive }) => (isActive ? "text-emerald-500 font-bold" : "text-gray-700")}>
              Products
            </NavLink>
            <NavLink to="/categories" className={({ isActive }) => (isActive ? "text-emerald-500 font-bold" : "text-gray-700")}>
              Categories
            </NavLink>
            <NavLink to="/brands" className={({ isActive }) => (isActive ? "text-emerald-500 font-bold" : "text-gray-700")}>
              Brands
            </NavLink>
          </Navbar.Collapse>
        </Navbar>
      
    </>
  )
}




