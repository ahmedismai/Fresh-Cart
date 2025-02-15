import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

export default function AllOrdersDetails() {
  let { id } = useParams();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  

  async function GetOrdersByID() {
    setLoading(true);
    try {
      const response = await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${id}`);
      setOrders(response.data); 
      
    } catch (error) {
      setError("⚠️ An error occurred while loading orders.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (id ) {
      
      
      GetOrdersByID();
    }
  }, [id]); 

  return (
    <>
      <h1 className="text-center text-2xl font-bold text-emerald-600 my-10">
        All Orders Details
      </h1>

      {loading ? (
        <div className="text-center">Loading...</div>
      ) : error ? (
        <p className="text-red-500 text-center mt-4">{error}</p>
      ) : orders.length === 0 ? (
        <p className="text-center text-gray-600">🚀 No orders available</p>
      ) : (
        <div className="bg-gray-50 shadow-xl rounded-3xl p-8 mb-5 ">
          {orders.map((order) => (
            <div key={order._id} className="border-b pb-5 mb-5 ">
              <div className='grid lg:grid-cols-3 gap-3 mb-8'>
                {/* معلومات الطلب */}
              <div className="p-6 h-[150px] bg-white shadow-md rounded-lg">
                <h2 className="text-lg font-semibold text-emerald-600">
                  Order ID: <span className="text-emerald-500">#{order.id}</span>
                </h2>
                <p className="text-gray-700">
                  <span>Total Payment Price:</span>{" "}
                  <span className="text-emerald-500">{order.totalOrderPrice} EGP</span>
                </p>
                <p>
                  <span>Payment Method:</span>{" "}
                  <span className="bg-emerald-500 text-white px-2 rounded-lg">
                    {order.paymentMethodType}
                  </span>
                </p>
                <p className="text-gray-400">{new Date(order.createdAt).toDateString()}</p>
              </div>

              <div >
              <div className="p-6 h-[150px] bg-white shadow-md rounded-lg">
                  <h2 className="text-lg font-semibold text-emerald-600">Address Info</h2>
                  <p className="text-gray-700">
                    <span>Details:</span> {order.shippingAddress.details}
                  </p>
                  <p className="text-gray-700">
                    <span>City:</span> {order.shippingAddress.city}
                  </p>
                  <p className="text-gray-700">
                    <span>Phone:</span> {order.shippingAddress.phone}
                  </p>
                </div>
              </div>
              {/* معلومات العنوان والعميل */}
              <div >
                <div className="p-6 h-[150px]  bg-white shadow-md rounded-lg">
                  <h2 className="text-lg font-semibold text-emerald-600">Customer Info</h2>
                  <p className="text-gray-700">
                    <span>Name:</span> {order.user.name}
                  </p>
                  <p className="text-gray-700">
                    <span>Email:</span> {order.user.email}
                  </p>
                  <p className="text-gray-700">
                    <span>Phone:</span> {order.user.phone}
                  </p>
                </div>
              </div>
              </div>

              {/* جدول المنتجات */}
              <div className="overflow-x-auto shadow-md rounded-lg bg-white my-6 text-center">
                <table className="w-full table-auto border-collapse">
                  <thead className="bg-gray-100 text-gray-700">
                    <tr>
                      <th className="px-4 py-2 border">Product</th>
                      <th className="px-4 py-2 border">Price</th>
                      <th className="px-4 py-2 border">Quantity</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.cartItems.map((item, index) => (
                      <tr key={`${order._id}-${index}`} className="border-b hover:bg-gray-50">
                        <td className="py-2 flex justify-center items-center ">
                          <Link
                            className="flex justify-center items-center"
                            to={`/productdetails/${item.product._id}/${item.product.category.name}`}
                          >
                            <img
                              src={item?.product?.imageCover}
                              alt={item?.product?.title}
                              className="w-16 h-16 object-cover rounded-lg "
                            />
                            <span className="ml-2">{item?.product?.category?.name}</span>
                          </Link>
                        </td>
                        <td className="px-4 py-2 text-gray-500">{item.price} EGP</td>
                        <td className="px-4 py-2">{item.count}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
