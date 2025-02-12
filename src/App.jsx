import { HashRouter, Routes, Route } from "react-router-dom"; // ✅ استخدم HashRouter
import "./App.css";
import Categories from "./Components/Categories/Categories";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import Products from "./Components/Products/Products";
import Cart from "./Components/Cart/Cart";
import Brands from "./Components/Brands/Brands";
import Home from "./Components/Home/Home";
import Layout from "./Components/Layout/Layout";
import Notfound from "./Components/Notfound/Notfound";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import ProductDetails from "./Components/ProductDetails/ProductDetails";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import CartContextProvider from "./Context/cartContext";
import { Toaster } from "react-hot-toast";
import Checkout from "./Components/Checkout/Checkout";
import Allorders from "./Components/Allorders/Allorders";
import WishListContextProvider from "./Context/wishListContext";
import Wishlist from "./Components/WishList/WishList";
import ForgetPassword from "./Components/ForgetPassword/ForgetPassword";
import VerifyCode from "./Components/VerifyCode/VerifyCode";
import ResetPassword from "./Components/ResetPassword/ResetPassword";
import Profile from "./Components/Profile/Profile";
import Update from "./Components/Update/Update";
import ChangePassword from "./Components/ChangePassword/ChangePassword";
import CategoryDetails from "./Components/CategoryDetails/CategoryDetails";
import AllordersDetails from "./Components/AllordersDetails/AllordersDetails";
import BrandDetails from "./Components/BrandDetails/BrandDetails";
import UserContextProvider from "./Context/userContext";

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
                  <Route path="checkout" element={<Checkout />} />
                  <Route path="allorders" element={<Allorders />} />
                  <Route path="allorders/:id" element={<AllordersDetails />} />
                  <Route path="profile" element={<Profile />} />
                  <Route path="profile/change-password" element={<ChangePassword />} />
                  <Route path="profile/update" element={<Update />} />
                  <Route path="productdetails/:id/:category" element={<ProductDetails />} />
                  <Route path="categories/:categories/:categoryId" element={<CategoryDetails />} />
                  <Route path="forgetpassword" element={<ForgetPassword />} />
                  <Route path="reset-password" element={<ResetPassword />} />
                  <Route path="verify-code" element={<VerifyCode />} />
                  <Route path="register" element={<Register />} />
                  <Route path="login" element={<Login />} />
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
