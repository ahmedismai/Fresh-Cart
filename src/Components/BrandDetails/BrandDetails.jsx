import React, { useContext, useEffect, useState } from 'react'
import style from './BrandDetails.module.css'
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { CartContext } from '../../Context/cartContext';
import { WishListContext } from '../../Context/wishListContext';
import { UserContext } from '../../Context/userContext';



export default function BrandDetails() {

  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  let {userLogin , setuserLogin}=useContext(UserContext)
  let { addProductToCart, setnumber, number } = useContext(CartContext);
  let { addProductTowishList, deletewishListItem,wishList, setWishList } = useContext(WishListContext);
  let [loading, setloading] = useState(false);
  let [currentId, setcurrentId] = useState(0);
  

  useEffect(() => {
    const savedWishList = JSON.parse(localStorage.getItem("wishList"));
    if (savedWishList) {
      setWishList(savedWishList);
    }
  }, []);

  async function addToCart(id) {
    setloading(true);
    setcurrentId(id);
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
  }

  async function addTowishList(id) {
    setcurrentId(id); 
    let response = await addProductTowishList(id);
    if (response.data.status == "success") {
      toast.success(response.data.message);

      setWishList((prevList) => {
        const updatedWishList = [...prevList, id];
        localStorage.setItem("wishList", JSON.stringify(updatedWishList)); 
        return updatedWishList;
      });
    } else {
      toast.error(response.data.message);
    }
  }

  async function removeFromWishList(id) {
    const updatedWishList = wishList.filter((productId) => productId !== id);
    setWishList(updatedWishList);
    localStorage.setItem("wishList", JSON.stringify(updatedWishList)); 

    toast.success("Product removed from wishlist");

    let response = await deletewishListItem(id);
    if (response.data.status != "success") {
      toast.error("Error removing product from wishlist");
    }
  }

  let{id,name}=useParams()

  useEffect(() => {
    
    async function fetchProducts() {
      setloading(true)
      try {
        const response = await axios.get(
          `https://ecommerce.routemisr.com/api/v1/products?brand=${id}`
        );
        setProducts(response.data.data);
        console.log(response.data.data)
      } catch (err) {
        setError(' Failed to load products. Please try again.');
      } finally {
        setloading(false);
      }
    }
    fetchProducts();
  }, [id,name]);
  
  let navigate=useNavigate()
  function navi(){
    navigate("/login")
  }
  return (
    
    <>
      {loading &&
        
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
      }
      
    <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 mb-10 '>
      {products?.map((product) => (
        <div key={product.id}>
          <div className='my-2 product p-2 hover:shadow-lg hover:shadow-emerald-500 relative'>
            <Link to={`/productdetails/${product.id}/${product.category.name}`}>
              <img src={product.imageCover} className='w-full h-[200px] object-cover' alt={product.title} />
              <h3 className='text-emerald-500'>{product.category.name}</h3>
              <h3 className='font-bold mb-1'>{product.title.split(" ").slice(0, 2).join(" ")}</h3>
              <div className='flex justify-between p-3'>
                <span>{product.price} EGP</span>
                <span><i className='fas fa-star text-yellow-400'></i> {product.ratingsAverage} </span>
              </div>
            </Link>
            <i
              className={`fa-solid fa-heart  absolute top-[0px] right-[0px] border border-gray-200 rounded-full p-2 bg-white text-3xl ${wishList.includes(product.id) && userLogin? 'text-red-500' : 'text-gray-400'}`}
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
              className='btn bg-emerald-500 text-white w-full p-2 rounded-lg'>
              {loading && currentId === product.id ? <i className='fas fa-spinner fa-spin'></i> : "Add to cart"}
            </button>
          </div>
        </div>
      ))}
    </div>
  </>
  );
}


