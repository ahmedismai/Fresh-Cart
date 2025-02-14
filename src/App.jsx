import { HashRouter, Routes, Route } from "react-router-dom"; // ✅ استخدم HashRouter
import "./App.css";
import Categories from "./Components/Categories/Categories.jsx";
import Login from "./Components/Login/Login.jsx";
import Register from "./Components/Register/Register.jsx";
import Products from "./Components/Products/Products.jsx";
import Cart from "./Components/Cart/Cart.jsx";
import Brands from "./Components/Brands/Brands.jsx";
import Home from "./Components/Home/Home.jsx";
import Layout from "./Components/Layout/Layout.jsx";
import Notfound from "./Components/Notfound/Notfound.jsx";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute.jsx";
import ProductDetails from "./Components/ProductDetails/ProductDetails.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import CartContextProvider from "./Context/cartContext.jsx";
import { Toaster } from "react-hot-toast";
import Checkout from "./Components/Checkout/Checkout.jsx";
import Allorders from "./Components/Allorders/Allorders.jsx";
import WishListContextProvider from "./Context/wishListContext.jsx";
import Wishlist from "./Components/WishList/WishList.jsx";
import ForgetPassword from "./Components/ForgetPassword/ForgetPassword.jsx";
import VerifyCode from "./Components/VerifyCode/VerifyCode.jsx";
import ResetPassword from "./Components/ResetPassword/ResetPassword.jsx";
import Profile from "./Components/Profile/Profile.jsx";
import Update from "./Components/Update/Update.jsx";
import ChangePassword from "./Components/ChangePassword/ChangePassword.jsx";
import CategoryDetails from "./Components/CategoryDetails/CategoryDetails.jsx";
import AllordersDetails from "./Components/AllordersDetails/AllordersDetails.jsx";
import BrandDetails from "./Components/BrandDetails/BrandDetails.jsx";
import UserContextProvider from "./Context/userContext.jsx";
import HandleSign from "./Components/HandleSign/HandleSign";

let query = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={query}>
      <UserContextProvider>
        <CartContextProvider>
          <WishListContextProvider>
            <HashRouter> 
              <Routes>
                <Route path="/" element={<Layout />}>
                  <Route index element={<Home />} />
                  <Route path="categories" element={<Categories />} />
                  <Route path="cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
                  <Route path="brands" element={<Brands />} />
                  <Route path="brands/:name/:id" element={<BrandDetails />} />
                  <Route path="products" element={<Products />} />
                  <Route path="wishlist" element={<ProtectedRoute><Wishlist /></ProtectedRoute>} />
                  <Route path="checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
                  <Route path="allorders" element={<ProtectedRoute><Allorders /></ProtectedRoute>} />
                  <Route path="allorders/:id" element={<ProtectedRoute><AllordersDetails /></ProtectedRoute>} />
                  <Route path="profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                  <Route path="profile/change-password" element={<ProtectedRoute><ChangePassword /></ProtectedRoute>} />
                  <Route path="profile/update" element={<ProtectedRoute><Update /></ProtectedRoute>} />
                  <Route path="productdetails/:id/:category" element={<ProductDetails />} />
                  <Route path="categories/:categories/:categoryId" element={<CategoryDetails />} />
                  <Route path="forgetpassword" element={<HandleSign><ForgetPassword /></HandleSign>} />
                  <Route path="reset-password" element={<HandleSign><ResetPassword /></HandleSign>} />
                  <Route path="verify-code" element={<HandleSign><VerifyCode /></HandleSign>} />
                  <Route path="register" element={<HandleSign><Register /></HandleSign>} />
                  <Route path="login" element={<HandleSign><Login /></HandleSign>} />
                  <Route path="*" element={<Notfound />} />
                </Route>
              </Routes>
            </HashRouter>
            <Toaster />
          </WishListContextProvider>
        </CartContextProvider>
      </UserContextProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;
