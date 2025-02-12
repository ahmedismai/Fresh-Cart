import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { WishListContext } from '../../Context/wishListContext'

export default function Wishlist() {
  let { GetLoggeduserwishList, deletewishListItem, deleteAllItem,setWishList,wishList } = useContext(WishListContext)
  const [wishListDetails, setwishListDetails] = useState(null)



  

  async function getwishListItem() {
    let response = await GetLoggeduserwishList()
    if (response.data.status == "success") {
      setwishListDetails(response?.data?.data)
    }
  }


  async function removeFromWishList(id) {
  
    const updatedWishList = wishList.filter((productId) => productId !== id);
    setWishList(updatedWishList);
    localStorage.setItem("wishList", JSON.stringify(updatedWishList));
    const DataWishList = wishListDetails.filter((product) => product.id !== id)
      setwishListDetails(DataWishList) 


    toast.success("Product removed from wishlist");


    let response = await deletewishListItem(id);
    if (response.data.status != "success") {
      toast.error("Error removing product from wishlist");
    }
  }

  
  
  useEffect(() => {
    getwishListItem()
    const savedWishList = JSON.parse(localStorage.getItem("wishList"));
    if (savedWishList) {
      setWishList(savedWishList);
    }
  }, [])

  return (
    <>
    <h2 className="text-center text-emerald-500 text-3xl font-bold mb-8">My Wish List</h2>
      {wishListDetails?.length > 0 && (
        <>
          

          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-16 py-3">
                    <span>Image</span>
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Product
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Price
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {wishListDetails?.map((product) => (
                  <tr
                    key={product.id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <td className="p-4">
                      <img
                        src={product.imageCover}
                        className="w-16 md:w-32 max-w-full max-h-full"
                        alt="Product"
                      />
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                      {product.title}
                    </td>

                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                      {product.price}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        onClick={() => {
                          if (wishList.includes(product.id)) {
                            removeFromWishList(product.id);
                          } 
                        }}
                        className={`cursor-pointer font-medium text-red-600 dark:text-red-500 ${wishList.includes(product.id) ? 'text-red-500' : 'text-gray-400'}`}
                        
                      >
                        Remove
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
         
        </>
      )  
        
      }
    </>
  )
}
