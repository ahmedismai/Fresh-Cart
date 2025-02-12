import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import Slider from "react-slick";
import { toast } from 'react-hot-toast';
import { WishListContext } from '../../Context/wishListContext';
import { CartContext } from '../../Context/cartContext';
import { UserContext } from '../../Context/userContext';

export default function ProductDetails() {
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1000,
    arrows: false,
  };


  let {userLogin , setuserLogin}=useContext(UserContext)

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const { id, category } = useParams();
  let { addProductToCart, setnumber, number } = useContext(CartContext);
  let { addProductTowishList, deletewishListItem, wishList, setWishList } = useContext(WishListContext);
  let [loading, setLoading] = useState(false);
  let [currentId, setCurrentId] = useState(null);

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
    if (wishList.includes(id)) return; 

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
    setCurrentId(id);
    try {
      let response = await deletewishListItem(id);
      if (response.data.status === "success") {
        setWishList((prevList) => {
          const updatedWishList = prevList.filter((productId) => productId !== id);
          localStorage.setItem("wishList", JSON.stringify(updatedWishList));
          return updatedWishList;
        });
        toast.success("Product removed from wishlist");
      } else {
        toast.error("Error removing product from wishlist");
      }
    } catch (error) {
      toast.error("Error processing request");
    }
  }

  async function getProduct(id) {
    try {
      let res = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
      setProduct(res.data.data);
    } catch (err) {
      console.log(err);
    }
  }

  async function getAllProducts() {
    try {
      let res = await axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
      let related = res.data.data.filter((product) => product.category.name === category);
      setRelatedProducts(related);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getProduct(id);
    getAllProducts();
  }, [id, category]);

  let navigate=useNavigate()
  function navi(){
    navigate("/login")
  }

  return (
    <>
      <div className='flex flex-wrap items-center mb-5'>
        <div className='w-1/4'>
          <Slider {...settings}>
            {product?.images.map((src) => (
              <img src={src} alt='' className='w-full' key={src} />
            ))}
          </Slider>
        </div>
        <div className='w-3/4 p-4'>
          <h3 className='font-semibold capitalize text-2xl'>{product?.title}</h3>
          <h4 className='text-gray-500 my-4'>{product?.description}</h4>
          <h4 className='text-gray-500 font-bold my-4'>{product?.category.name}</h4>
          <div className='flex justify-between p-3'>
            <span>{product?.price} EGP</span>
            <span><i className='fas fa-star text-yellow-400'></i> {product?.ratingsAverage} </span>
          </div>
          <i
              className={`fa-solid fa-heart relative top-[100%] my-2 right-[-95%] border border-gray-200 rounded-full p-2 bg-white text-3xl ${
                wishList.includes(product?.id) ? 'text-red-500' : 'text-gray-400'
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
          <button onClick={() => addToCart(product?.id)} className='bg-emerald-500 text-white w-full p-2 rounded-lg'>{loading && currentId === product?.id ? <i className="fas fa-spinner fa-spin"></i> : "Add to cart"}</button>
        </div>
      </div>

      <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6'>
        {relatedProducts.length > 0 ? relatedProducts?.map((product) => (
          <div key={product?.id} className='my-2 product p-2 relative'>
            <Link to={`/productdetails/${product?.id}/${product?.category?.name}`}>
              <img src={product.imageCover} className='w-full' alt="" />
              <h3 className='text-emerald-500'>{product?.category?.name}</h3>
              <h3 className='font-bold mb-1'>{product?.title.split(" ").slice(0, 2).join(" ")}</h3>
              <div className='flex justify-between p-3'>
                <span>{product?.price} EGP</span>
                <span><i className='fas fa-star text-yellow-400'></i> {product?.ratingsAverage} </span>
              </div>
            </Link>

            <i
              className={`fa-solid fa-heart absolute top-0 right-0 border border-gray-200 rounded-full p-2 bg-white text-3xl ${
                wishList.includes(product?.id) && userLogin ? 'text-red-500' : 'text-gray-400'
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
              onClick={() => addToCart(product?.id)}
              className="btn bg-emerald-500 text-white w-full p-2 rounded-lg"
            >
              {loading && currentId === product?.id ? <i className="fas fa-spinner fa-spin"></i> : "Add to cart"}
            </button>
          </div>
        )) : (
          <div className="text-center text-emerald-500 font-bold text-2xl">Loading...</div>
        )}
      </div>
    </>
  );
}
