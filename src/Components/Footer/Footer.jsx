import React from 'react'
import style from './Footer.module.css'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <>
        <footer className="bg-gray-50 border-top border-bottom p-4 fixed bottom-[0] left-0 right-0">
          <div className='container'>
            <div className="flex justify-evenly items-center py-2 flex-wrap">
              <h2 className='text-xl'>Made By <span className='text-emerald-500'>Ahmed Ismail</span></h2>
              <div >
              <Link to={`https://github.com/ahmedismai`} target="_blank"><i className="fa-brands fa-github mx-2 text-xl hover:text-emerald-500"></i></Link>
              <Link to={`https://www.facebook.com/profile.php?id=100015580123329`} target="_blank"><i className="fa-brands fa-facebook mx-2 text-xl hover:text-emerald-500"></i></Link>
              <Link to={`https://www.instagram.com/ahmed_ismail198/`} target="_blank"><i className="fa-brands fa-square-instagram mx-2 text-xl hover:text-emerald-500"></i></Link>
              <Link to={`https://mail.google.com/mail/u/0/?to=ahmedismailamer@gmail.com&fs=1&tf=cm`} target="_blank"><i className="fa-solid fa-envelope mx-2 text-xl hover:text-emerald-500"></i></Link>
              </div>
            </div>
          </div>
        </footer>
    </>
  )
}
