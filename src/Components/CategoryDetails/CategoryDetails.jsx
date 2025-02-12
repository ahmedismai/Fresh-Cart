import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { CartContext } from '../../Context/cartContext';
import { WishListContext } from '../../Context/wishListContext';
import { toast } from 'react-hot-toast';
import { UserContext } from '../../Context/userContext';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

export default function CategoryDetails() {
  let {userLogin , setuserLogin}=useContext(UserContext)

  let { addProductToCart ,setnumber, number} = useContext(CartContext);
  let { addProductTowishList, deletewishListItem, wishList, setWishList } = useContext(WishListContext);
  let [loading, setLoading] = useState(false);
  let [currentId, setCurrentId] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const { categoryId, categories } = useParams();

  useEffect(() => {
    const savedWishList = JSON.parse(localStorage.getItem("wishList")) || [];
    setWishList(savedWishList);
  }, []);

  async function addToCart(id) {
    setLoading(true);
    setCurrentId(id);
    try {
      if(userLogin){
        let response = await addProductToCart(id);
      if (response.data.status === "success") {
        toast.success(response.data.message);
        setnumber(number+1)
      } else {
        toast.error(response.data.message);
      }
      }else{
        navigate('/login')
      }
    } catch (error) {
      toast.error("Error adding product to cart");
    }
    setLoading(false);
  }

  async function addToWishList(id) {
    setCurrentId(id);
    try {
      let response = await addProductTowishList(id);
      if (response.data.status === "success") {
        toast.success(response.data.message);
        setWishList((prevList) => {
          const updatedWishList = [...prevList, id];
          localStorage.setItem("wishList", JSON.stringify(updatedWishList));
          
          return updatedWishList;
        });
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Error adding product to wishlist");
    }
  }

  async function removeFromWishList(id) {
    setWishList((prevList) => {
      const updatedWishList = prevList.filter((productId) => productId !== id);
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
      toast.error("Error processing request");
    }
  }

  async function getAllProducts() {
    try {
      let res = await axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
      let related = res.data.data.filter((product) => product.category.name === categories);
      setRelatedProducts(related);
    } catch (error) {
      toast.error("Failed to fetch products");
    }
  }

  useEffect(() => {
    if (categories) {
      getAllProducts();
    }
  }, [categoryId, categories]);
  let navigate=useNavigate()
  function navi(){
    navigate("/login")
  }

  return (
    <>
      <div className="grid  grid-cols-2 md:grid-cols-4 lg:grid-cols-5 mb-10 ">
        {relatedProducts?.length > 0 ? (
          relatedProducts?.map((product) => (
            <div key={product?.id} className="my-4 product mx-4   hover:shadow-lg hover:shadow-emerald-500 relative">
              <Link to={`/productdetails/${product?.id}/${product?.category.name}`}>
                <img src={product?.imageCover} className="w-full h-[200px] object-cover" alt={product?.title} />
                <h3 className="text-emerald-500">{product?.category.name}</h3>
                <h3 className="font-bold mb-1">{product?.title.split(" ").slice(0, 2).join(" ")}</h3>
                <div className="flex justify-between p-3">
                  <span>{product?.price} EGP</span>
                  <span>
                    <i className="fas fa-star text-yellow-400"></i> {product?.ratingsAverage}
                  </span>
                </div>
              </Link>
              <i
                className={`fa-solid fa-heart absolute top-0 right-0 border border-gray-200 rounded-full p-2 bg-white text-3xl ${
                  wishList?.includes(product?.id) && userLogin ? 'text-red-500' : `text-gray-400 `
                }`}
                onClick={() => {
                  if(userLogin){
                    if (wishList?.includes(product?.id)) {
                      removeFromWishList(product?.id);
                    } else {
                      addToWishList(product?.id);
                    }
                  }else{
                    navi()
                    
                  }
                }}
              ></i>
              <button
                onClick={() => addToCart(product.id)}
                className="btn bg-emerald-500 text-white w-full p-2 rounded-lg"
              >
                {loading && currentId === product.id ? <i className="fas fa-spinner fa-spin"></i> : "Add to cart"}
              </button>
            </div>
          ))
        ) : (
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
        )}
      </div>
    </>
  );
}
