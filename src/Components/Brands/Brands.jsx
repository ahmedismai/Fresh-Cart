import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Brands() {
  const [Brands, setBrands] = useState([]); 
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [loading, setLoading] = useState(false); 
  const [opacity, setOpacity] = useState("opacity-100"); 


  useEffect(() => {
    async function getBrands() {
      setLoading(true); 
      try {
        const res = await axios.get("https://ecommerce.routemisr.com/api/v1/brands");
        setBrands(res.data.data);
        setLoading(false); 
      } catch (error) {
        console.error("❌ Error fetching Brands:", error);
      }
    }
    getBrands();
  }, []);

 let navigate=useNavigate()
  async function getBrandsById(id,name) {
    setLoading(true); 
    try {
      const res = await axios.get(`https://ecommerce.routemisr.com/api/v1/brands/${id}`);
      navigate(`/brands/${name}/${id}`)
    } catch (error) {
      console.error("❌ Error fetching Brand:", error);
    } finally {
      setLoading(false); 
    }
  }

  function closeBrand() {
    setSelectedBrand(null);
    setOpacity("opacity-100");
  }

  return (
    <>
        <h1 className="text-emerald-500 text-3xl text-center font-bold mb-5">All Brands</h1>

      <div className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mb-10`}>
        {Brands.map((Brand) => (
          <div key={Brand._id}>
            <div
              onClick={() => getBrandsById(Brand._id,Brand.name)}
              className="my-2 product p-2 border hover:shadow-emerald-600 hover:shadow-lg cursor-pointer"
            >
              <img src={Brand.image} className="w-full  object-cover" alt={Brand.name} />
              <h3 className="text-emerald-500 text-center bg-white p-6 font-bold text-3xl">{Brand.name}</h3>
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
