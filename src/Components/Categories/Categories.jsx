import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Categories() {
  const [categories, setCategories] = useState([]); 
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(false); 
  const [opacity, setOpacity] = useState("opacity-100"); 


  useEffect(() => {
    async function getCategories() {
      setLoading(true); 
      try {
        const res = await axios.get("https://ecommerce.routemisr.com/api/v1/categories");
        setCategories(res.data.data);
        setLoading(false); 
      } catch (error) {
        console.error("❌ Error fetching categories:", error);
      }
    }
    getCategories();
  }, []);

 
  async function getCategoryById(id) {
    setLoading(true); 
    try {
      const res = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${id}`);
      setSelectedCategory(res.data.data);
      setOpacity("opacity-50"); 
    } catch (error) {
      console.error("❌ Error fetching category:", error);
    } finally {
      setLoading(false); 
    }
  }

  

  return (
    <>
    <h1 className="text-emerald-500 text-3xl text-center font-bold mb-5 ">All Categories</h1>
      <div className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mb-20`}>
        {categories.map((category) => (
          <div key={category._id}>
            <div
              className="product  border hover:shadow-emerald-600 hover:shadow-lg cursor-pointer"
            >
              <Link to={`${category.name}/${category._id}`}>

              <img src={category.image} className="w-full h-[200px] object-cover" alt={category.name} />
              <h3 className="text-emerald-500 text-center bg-white p-6 font-bold text-xl">{category.name}</h3>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {loading && (
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

      
    </>
  );
}
