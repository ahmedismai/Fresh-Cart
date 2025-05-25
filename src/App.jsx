import { createBrowserRouter, RouterProvider } from "react-router-dom";
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

const reactQuery=new QueryClient();

const router = createBrowserRouter([
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

function App() {
  return (
    <QueryClientProvider client={reactQuery}>
      <UserContextProvider>
        <CartContextProvider>
          <WishListContextProvider>
            <RouterProvider router={router} />
            <Toaster />
          </WishListContextProvider>
        </CartContextProvider>
      </UserContextProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;
