import React, { createContext, useState } from 'react'
export let OrderContaxt = createContext();


export default function OrderContaxtProvider(props) {
    let [dataId,setDataId]=useState()
  return (
    <OrderContaxt.Provider value={{setDataId,dataId}}>
        {props.children}
    </OrderContaxt.Provider>
  )
}
