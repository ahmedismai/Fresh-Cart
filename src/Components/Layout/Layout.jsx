import React, { useEffect } from 'react'
import style from './Layout.module.css'
import { Outlet } from 'react-router-dom';
import Footer from './../Footer/Footer';
import NavbarComponent from './../Navbar/Navbar';

export default function Layout() {
  
  return (
    <>
        <NavbarComponent />

        <div className='container mb-10 py-20 lg:py-12 w-[85%] mx-auto'>
          <Outlet/>
        </div>
        <Footer/>
        
    </>
  )
}
