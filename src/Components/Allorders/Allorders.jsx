import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { data, useNavigate } from 'react-router-dom';
  
export default function AllOrders() {
  const [userId, setUserId] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function verifyToken() {
      try {
        const headers = { token: localStorage.getItem("userToken") };
        const res = await axios.get("https://ecommerce.routemisr.com/api/v1/auth/verifyToken", { headers });
        setUserId(res.data.decoded.id);
      } catch (err) {
        console.log( err);
        setError("Unable to verify user.");
      }
    }
    verifyToken();
  }, []);

  useEffect(() => {
    if (!userId) return;

    async function fetchOrders() {
      setLoading(true);
      try {
        const response = await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`);
        setOrders(response.data);
        console.log(response.data)
      } catch (err) {
        setError("⚠️ An error occurred while loading orders.");
      } finally {
        setLoading(false);
      }
    }
    
    fetchOrders();
    
  }, [userId]);
  let navigate=useNavigate()


  function Click(){
    navigate(`/allorders/${userId}`)
  }

  return (
    <div className="container mx-auto my-10 ">
      <h1 className="text-3xl font-semibold text-center mb-6">
        <i className="fa-solid fa-cart-shopping"></i> My Orders
      </h1>
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
      ) : (
        <div className="omd:verflow-x-auto shadow-md rounded-lg mb-5 ">
          <button onClick={()=>Click()} className='bg-emerald-500 rounded-md px-3 py-2 text-white w-full'>Show All Details</button>
          <table className="w-full table-auto border-collapse text-center">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="px-4 py-2 border">Order ID</th>
                <th className="px-4 py-2 border">Order Price</th>
                <th className="px-4 py-2 border">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-b hover:bg-gray-50 ">
                  <td className="px-4 py-2">{`#${order.id}`}</td>
                  <td className="px-4 py-2 text-gray-500">{order.totalOrderPrice} EGP</td>
                  
                  <td className="px-4 py-2 ">
                  <div className='flex flex-col w-fit justify-center items-center text-center mx-auto '>
                    {order.isPaid && <span className='text-white bg-emerald-600 px-2 rounded-md my-2'>isPaid</span>}
                  {!order.isDelivered && <span className='text-white bg-red-600 px-2 rounded-md '>isDelivered</span>}
                  </div>
                  </td>
                  
                </tr>
              ))}
            </tbody>
          </table>

        </div>
      )}
    </div>
  );
}
