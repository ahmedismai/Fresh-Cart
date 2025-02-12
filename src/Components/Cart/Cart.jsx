import React, { useContext, useEffect, useState } from 'react'
import style from './Cart.module.css'
import { CartContext } from '../../Context/cartContext'
import { toast } from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'


export default function Cart() {
  let {GetLoggedusercart,updatProductCart ,deleteCartItem,deleteAllItem ,setnumber,number ,setcarId} =useContext(CartContext)
  const [CartDetails,setCartDetails]= useState(null)

  async function getCartItem(){
     let response = await GetLoggedusercart();
     if(response.data.status=="success")
     {
      setCartDetails(response?.data?.data)
      
     }
  }
  
  async function updatProduct(id,count){
     let response = await updatProductCart(id,count);
     if(response.data.status=="success")
     {
      setCartDetails(response?.data?.data)
      toast.success("Product Updated Successfully")
     }
     else{
      toast.error("Error")
     }
  }


  async function deleteProduct(id){
     let response = await deleteCartItem(id);
     if(response.data.status=="success")
     {
      
      setnumber(number-1)
      setCartDetails(response?.data?.data)
      toast.success("Product Removed Successfully")
     }
     else{
      toast.error("Error")
     }
  }


  async function deleteAll(){
     let response = await deleteAllItem();
     if(response.data.message=="success")
     {
      setnumber(0)
      setCartDetails(response?.data?.data)
      toast.success("All Product Removed Successfully")
     }
     else{
      toast.error("Error")
     }
  }

  const navigate = useNavigate()
  function goToPageCheckOut(){
    navigate('/checkout')
  }

  useEffect(()=>{
    getCartItem()
  },[])

  
  return (
    <>
       <div className="container mx-auto px-6 mb-10">
      {CartDetails?.products.length > 0 ? (
        <>
        <h1 className='font-bold text-3xl my-2'>My Cart</h1>
          <h2 className='mb-5'>
            <span className=" font-medium text-xl ">Total Price:</span> <span className='text-lg text-emerald-500'>{CartDetails?.totalCartPrice} EGP</span>
          </h2>

          <div className="grid grid-cols-1  gap-6 ">
            {CartDetails?.products.map((product) => (
              <div key={product?.product?.id} className="bg-white p-4 rounded-xl shadow-md md:flex items-center gap-4">
                <img src={product.product.imageCover} className="w-50 md:w-20 object-cover rounded" alt={product.product.title} />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">{product.product.title}</h3>
                  <p className="text-gray-600">Price: {product.price * product.count} EGP</p>
                  
                <button onClick={() => deleteProduct(product.product.id)} className="text-emerald-500 hover:text-red-700">Remove</button>
                </div>
                <div className="flex items-center mt-2">
                    <button onClick={() => updatProduct(product?.product?.id, product?.count - 1)} className="px-3 py-1 bg-transparent border border-emerald-500 text-gray-800 rounded-l">-</button>
                    <span className="px-4 py-1 bg-transparent">{product.count}</span>
                    <button onClick={() => updatProduct(product?.product?.id, product?.count + 1)} className="px-3 py-1 bg-transparent border border-emerald-500 text-gray-800 rounded-r">+</button>
                  </div>
              </div>
            ))}
          </div>

          <div className="flex justify-between mt-6">
            <button onClick={goToPageCheckOut} className="bg-green-500 text-white py-2 px-6 rounded-xl w-[49%]">Checkout</button>
            <button onClick={deleteAll} className="bg-red-500 text-white py-2 px-6 rounded-xl w-[49%]">Clear All Items</button>
          </div>
        </>
      ) : (
        <h2 className="text-center text-red-800 text-3xl font-bold my-8">There Is No Item To Show</h2>
      )}
    </div>
  



    </>
  )
}
