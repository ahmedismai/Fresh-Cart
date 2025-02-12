import React from 'react'
import style from './Notfound.module.css'
import { Link } from 'react-router-dom'

export default function Notfound() {
  return (
    <>
        <div className='container h-[100vh]'> 
     
      <div style={{ textAlign: "center", padding: "50px" }}>
      <h1>❌404 - Page Not Found ❌</h1>
      <p>Whoops! That page doesn’t exist. But do not fret, check out our other resources to get started.</p>
      <Link to="/" className='text-emerald-500' style={{ textDecoration: "none",  }}>Back to home Page</Link>
    </div>
      </div>
    </>
  )
}
