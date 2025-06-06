import { useEffect, useState } from "react";
import { createContext } from "react";
import React from 'react'


export let UserContext = createContext();

export default function UserContextProvider(props) {

    const [userLogin,setuserLogin] = useState(null)

    useEffect(()=>{
      
    {localStorage.getItem("userToken") && setuserLogin(localStorage.getItem("userToken"))}
    },[])
  return (
    <UserContext.Provider value={{userLogin , setuserLogin,}}>
        {props.children}
    </UserContext.Provider>
  )
}
