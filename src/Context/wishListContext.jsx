import axios from 'axios'
import { createContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';



export let WishListContext=createContext()

export default function WishListContextProvider(props){
    let [cartId,setcarId]=useState(null)
    let [wishListId,setwishListId]=useState(null)
    let [number,setnumber]=useState(null)
    let [wishList, setWishList] = useState([]);
  
    const {id}=useParams()
    
      let headers ={
          token: localStorage.getItem("userToken")
      }
      function addProductTowishList(productId){
  
       return axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist
       `,{productId:productId,},{headers}).then((res)=>res).catch((err)=>err)
      }
  
  
      function GetLoggeduserwishList(){
  
       return axios.get(`https://ecommerce.routemisr.com/api/v1/wishList
       `,{headers}).then((res)=>
       {
        setcarId(res?.data?.data?._id)
        
        setnumber(res?.data.numOfwishListItems)
         return res
       }
       )
       .catch((err)=>err)
      }
  
  
      
  
  
      function deletewishListItem(productId){
  
       return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishList/${productId}
       `,{headers}).then((res)=>res).catch((err)=>err)
      }
  
  
  
     
  
    useEffect(()=>{
      GetLoggeduserwishList()
    },[])

    return (
        <WishListContext.Provider value={{addProductTowishList,GetLoggeduserwishList,deletewishListItem,setWishList,wishList}}>
            {props.children}
        </WishListContext.Provider>
    )
}