import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { CartContext } from '../../Context/cartContext';
import { WishListContext } from '../../Context/wishListContext';
import useProducts from '../../Hooks/useProducts';
import { UserContext } from '../../Context/userContext';

export default function RecentProducts() {
  let { addProductToCart, setnumber, number } = useContext(CartContext);
  let { addProductTowishList, deletewishListItem, wishList, setWishList } = useContext(WishListContext);
  let { userLogin } = useContext(UserContext) || {}; 
  let [loading, setloading] = useState(false);
  let [currentId, setcurrentId] = useState(null);

  let navigate = useNavigate();

  useEffect(() => {
    const savedWishList = JSON.parse(localStorage.getItem("wishList")) || [];
    setWishList(savedWishList);
  }, []);

  async function addToCart(id) {
    setloading(true);
    setcurrentId(id);

    try {
      let response = await addProductToCart(id);
      if(userLogin)
      if (response.data.status === "success") {
        toast.success(response.data.message);
        setnumber(prev => prev + 1);
      } else {
        toast.error(response.data.message);
      }
      else{
        navigate("/login")
        return
      }
    } catch (error) {
      toast.error("Failed to add product to cart");
    } 
    finally {
      setloading(false);
    }
    
  }

  async function handleWishlistClick(id) {
    if (!userLogin) {
      navigate("/login");
      return;
    }

    if (wishList?.includes(id)) {
      removeFromWishList(id);
    } else {
      addTowishList(id);
    }
  }

  async function addTowishList(id) {
    setcurrentId(id);
    try {
      let response = await addProductTowishList(id);
      if (response.data.status === "success") {
        toast.success(response.data.message);
        setWishList(prevList => {
          const updatedWishList = [...prevList, id];
          localStorage.setItem("wishList", JSON.stringify(updatedWishList));
          return updatedWishList;
        });
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Failed to add product to wishlist");
    }
  }

  async function removeFromWishList(id) {
    setWishList(prevList => {
      const updatedWishList = prevList.filter(productId => productId !== id);
      localStorage.setItem("wishList", JSON.stringify(updatedWishList));
      return updatedWishList;
    });

    toast.success("Product removed from wishlist");

    try {
      let response = await deletewishListItem(id);
      if (response.data.status !== "success") {
        toast.error("Error removing product from wishlist");
      }
    } catch (error) {
      toast.error("Failed to remove product from wishlist");
    }
  }

  let { data, error, isError, isLoading } = useProducts();

  if (isError) {
    return <h2 className="text-red-500 text-center">Error: {error.message}</h2>;
  }

  if (isLoading) {
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
          </div>  }

  return (
    <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 '>
      {data?.map((product) => (
        <div key={product.id} className='my-2 product p-2 hover:shadow-lg hover:shadow-emerald-500 relative'>
          <Link to={`/productdetails/${product.id}/${product.category.name}`}>
            <img src={product.imageCover} className='w-full h-[200px]' alt={product.title} />
            <h3 className='text-emerald-500'>{product.category.name}</h3>
            <h3 className='font-bold mb-1'>{product.title.split(" ").slice(0, 2).join(" ")}</h3>
            <div className='flex justify-between p-3'>
              <span>{product.price} EGP</span>
              <span><i className='fas fa-star text-yellow-400'></i> {product.ratingsAverage} </span>
            </div>
          </Link>

          {/* زر Wishlist */}
          <i 
            className={`fa-solid fa-heart absolute top-0 right-0 border border-gray-200 rounded-full p-2 bg-white text-3xl 
            ${wishList?.includes(product.id) && userLogin ? 'text-red-500' : 'text-gray-400'}`}
            onClick={() => handleWishlistClick(product.id)}
          ></i>

          {/* زر Add to cart */}
          <button
            onClick={() => addToCart(product.id)}
            className='btn bg-emerald-500 text-white w-full p-2 rounded-lg'
            disabled={loading && currentId === product.id}
          >
            {loading && currentId === product.id  ? <i className='fas fa-spinner fa-spin'></i> : `Add to cart`}
          </button>
        </div>
      ))}
    </div>
  );
}
