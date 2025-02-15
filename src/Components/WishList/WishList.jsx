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
      <h2 className="text-center text-emerald-500 text-3xl font-bold mb-8">
        My Wish List
      </h2>
      {wishListDetails?.length > 0 && (
        <section className="relative overflow-x-auto shadow-md sm:rounded-lg ">
          <div >
            {wishListDetails?.map((product) => (
              <div
                key={product.id}
                className="md:flex items-center md:justify-between p-4 bg-white rounded-lg shadow-lg border-b"
              >
                <img
                  src={product.imageCover}
                  className=" md:w-32 md:h-32 object-cover rounded-lg"
                  alt="Product"
                />
                <div className="flex-1 px-4 ">
                  <h3 className="font-semibold text-gray-900 dark:text-white pb-5">
                    {product.title}
                  </h3>
                  <p className="text-gray-500 dark:text-gray-300 pb-5">
                    ${product.price}
                  </p>
                </div>
                <button
                    type="button"
                    aria-label="Remove from wishlist"
                    onClick={() => {
                        removeFromWishList(product?.id);
                    }}
                    className={`cursor-pointer font-medium text-red-600 dark:text-red-500 ${
                      wishList.includes(product.id) ? "text-red-500" : "text-gray-400"
                    }`}
                  >
                    Remove
                  </button>
              </div>
            ))}
          </div>
        </section>
      )}
    </>
  );
  
}
