import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

export default function AllOrdersDetails() {
  let { id } = useParams();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function GetOrdersByID() {
    setLoading(true)
    try {
      const response = await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${id}`);
      setOrders(response.data);
      setLoading(false)
      console.log(response.data)
    } catch (error) {
      setError("⚠️ An error occurred while loading orders.");
      } finally {
        setLoading(false);
      }
  }

  useEffect(() => {
    if (id) {
      GetOrdersByID();
    }
  }, [id]); // ✅ إضافة `id` في dependencies

  return (
    <>
      <h1 className="text-center text-2xl font-bold text-emerald-600 my-10">All Orders Details</h1>
      {loading ? (
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
    
      ) : error ? (
        <p className="text-red-500 text-center mt-4">{error}</p>
      ) : orders.length === 0 ? (
        <p className="text-center mt-4">🚀 No orders available</p>
      ) : <>
      {orders.length > 0 ? <>
      <div className='bg-gray-50 shadow-xl rounded-3xl p-8 mb-5 '>
        <div className='grid md:grid-cols-2 lg:grid-cols-3   '>
          <div className="max-w-3xl mx-auto p-2">
          {orders.map((order, index) => (
            <div key={index} className="  my-1 ">
              <h2 ><span className="text-lg font-semibold ">Order ID:</span> <span className='text-emerald-500'>#{order.id}</span></h2>
              <p><span className='text-lg font-semibold'>Total Payment Price:</span><span className='text-emerald-500'> {order?.totalOrderPrice} EGP</span> </p>
              <p><span className='text-lg font-semibold'>Payment Method: </span><span className='bg-emerald-500 px-1  w-fit text-white rounded-lg'>{order?.paymentMethodType}</span> </p>
              <p><span className=' text-gray-400 rounded-lg text-lg '>{new Date(order.createdAt).toDateString()}</span> </p>
            </div>
          ))}
        </div>
          <div className="max-w-3xl mx-auto p-2">
          {orders.map((order, index) => (
            <div key={index} className="  my-1 ">
              <h2 ><span className="text-lg font-semibold ">Address Info</span></h2>
              <p><span className='text-gray-400  text-lg'>Address Details:</span><span> {order?.shippingAddress.details}</span></p>
              <p><span className='text-gray-400  text-lg'>City:</span><span> {order?.shippingAddress.city}</span></p>
              <p><span className='text-gray-400  text-lg'>Phone:</span><span> {order?.shippingAddress.phone}</span></p>
              
            </div>
          ))}
        </div>
          <div className="max-w-3xl mx-auto p-2">
          {orders.map((order, index) => (
            <div key={index} className="  my-1 ">
              <h2 ><span className="text-lg font-semibold ">Customer Info</span></h2>
              <p><span className='text-gray-400  text-lg'>Name:</span><span> {order?.user.name}</span></p>
              <p><span className='text-gray-400  text-lg'>Email:</span><span> {order?.user.email}</span></p>
              <p><span className='text-gray-400  text-lg'>Phone:</span><span> {order?.user.phone}</span></p>
              
            </div>
          ))}
        </div>
        
        </div>
        <div className="overflow-x-auto shadow-md rounded-lg  bg-white my-6 text-center ">
          <table className="w-full table-auto border-collapse  ">
            <thead className="bg-gray-100 text-gray-700 ">
              <tr>
                <th className="px-4 py-2 border">Product</th>
                <th className="px-4 py-2 border">Price</th>
                <th className="px-4 py-2 border">Quantity</th>
              </tr>
            </thead>
            <tbody >
            {orders.map((order) => 
              order.cartItems.map((item, index) => (
                <tr key={`${order.id}-${index}`} className="border-b hover:bg-gray-50 ">
                  <td className=" py-2  flex justify-center items-center ">
                    <Link className='flex justify-center items-center' to={`/productdetails/${item.product._id}/${item.product.category.name}`}>
                    <img src={item?.product?.imageCover} alt={item?.product?.title} className="w-16 h-16 object-cover rounded-lg" />
                    <span className="ml-2">{item?.product?.category?.name}</span>
                    </Link>
                  </td>
                  <td className="px-4 py-2 text-gray-500">{item.price} EGP</td>
                  <td className="px-4 py-2">{item.count}</td>
                </tr>
              ))
            )}
            </tbody>
          </table>
        </div>
        </div>

            

      </> : (
        <p className="text-center text-gray-600">No orders found.</p>
      )}</>}
    </>
  );
}
