import axios from 'axios'
import { createContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

export let CartContext = createContext();


export default function CartContextProvider(props) {
  let [cartId,setcarId]=useState(null)
  let [number,setnumber]=useState(null)

  const {id}=useParams()
  
    let headers ={
        token: localStorage.getItem("userToken")
    }
    function addProductToCart(productId){

     return axios.post(`https://ecommerce.routemisr.com/api/v1/cart
     `,{productId:productId,},{headers}).then((res)=>res).catch((err)=>err)
    }


    function GetLoggedusercart(){

     return axios.get(`https://ecommerce.routemisr.com/api/v1/cart
     `,{headers}).then((res)=>
     {
      setcarId(res?.data?.data?._id)
      
      setnumber(res?.data.numOfCartItems)
       return res
     }
     )
     .catch((err)=>err)
    }


    function updatProductCart(productId,newCount){

     return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}
     `,{count:newCount},{headers}).then((res)=>res).catch((err)=>err)
    }


    function deleteCartItem(productId){

     return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}
     `,{headers}).then((res)=>res).catch((err)=>err)
    }


    function Checkout(cartId,url,formData){

     return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${url}
     `,{shippingAddress:formData},{headers}).then((res)=>{
      return res
      
     }).catch((err)=>err)
    }


    function deleteAllItem(){

     return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart
     `,{headers}).then((res)=>res).catch((err)=>err)
    }

  useEffect(()=>{
    GetLoggedusercart()
  },[])

  return (
    <CartContext.Provider value={ {addProductToCart,GetLoggedusercart,updatProductCart , deleteCartItem ,deleteAllItem,setcarId ,Checkout,cartId,number,setnumber} }>
       {props.children}
    </CartContext.Provider>
  )
}
