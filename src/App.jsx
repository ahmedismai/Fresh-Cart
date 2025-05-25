// src/router.jsx
import { createBrowserRouter } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import Home from "./Components/Home/Home";
import Categories from "./Components/Categories/Categories";
import Cart from "./Components/Cart/Cart";
import Brands from "./Components/Brands/Brands";
import BrandDetails from "./Components/BrandDetails/BrandDetails";
import Products from "./Components/Products/Products";
import Wishlist from "./Components/WishList/WishList";
import Checkout from "./Components/Checkout/Checkout";
import Allorders from "./Components/Allorders/Allorders";
import AllordersDetails from "./Components/AllordersDetails/AllordersDetails";
import Profile from "./Components/Profile/Profile";
import ChangePassword from "./Components/ChangePassword/ChangePassword";
import Update from "./Components/Update/Update";
import ProductDetails from "./Components/ProductDetails/ProductDetails";
import CategoryDetails from "./Components/CategoryDetails/CategoryDetails";
import ForgetPassword from "./Components/ForgetPassword/ForgetPassword";
import ResetPassword from "./Components/ResetPassword/ResetPassword";
import VerifyCode from "./Components/VerifyCode/VerifyCode";
import Register from "./Components/Register/Register";
import Login from "./Components/Login/Login";
import Notfound from "./Components/Notfound/Notfound";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "categories", element: <Categories /> },
      { path: "cart", element: <ProtectedRoute><Cart /></ProtectedRoute> },
      { path: "brands", element: <Brands /> },
      { path: "brands/:name/:id", element: <BrandDetails /> },
      { path: "products", element: <Products /> },
      { path: "wishlist", element: <ProtectedRoute><Wishlist /></ProtectedRoute> },
      { path: "checkout", element: <Checkout /> },
      { path: "allorders", element: <Allorders /> },
      { path: "allorders/:id", element: <AllordersDetails /> },
      { path: "profile", element: <Profile /> },
      { path: "profile/change-password", element: <ChangePassword /> },
      { path: "profile/update", element: <Update /> },
      { path: "productdetails/:id/:category", element: <ProductDetails /> },
      { path: "categories/:categories/:categoryId", element: <CategoryDetails /> },
      { path: "forgetpassword", element: <ForgetPassword /> },
      { path: "reset-password", element: <ResetPassword /> },
      { path: "verify-code", element: <VerifyCode /> },
      { path: "register", element: <Register /> },
      { path: "login", element: <Login /> },
      { path: "*", element: <Notfound /> },
    ]
  }
]);
