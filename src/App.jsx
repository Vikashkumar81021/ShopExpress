import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";

import Home from "./pages/home/Home";
import Order from "./pages/order/Order";
import Cart from "./pages/cart/Cart";
import Dashboard from "./pages/admin/dashboard/Dashboard";
import NoPage from "./pages/nopage/Nopage";
import MyState from "./context/data/myState";
import Login from "./pages/registeration/Login";
import Signup from "./pages/registeration/Signup";
import ProductInfo from "./pages/productInfo/ProductInfo";
import AddProduct from "./pages/admin/page/AddProuct";
import UpdateProduct from "./pages/admin/page/UpdateProduct";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Allproducts  from './pages/allProducts/Allproducts'

function App() {
  return (
    <MyState>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
           <Route path="/allproducts" element={<Allproducts />} /> 
          <Route path="/order" element={
            <protectedRoute>
              <Order />
            </protectedRoute>
          } />
          <Route path="/cart" element={<Cart />} />
          <Route path="/dashboard" element={
           <protectedRoutefromadmin>
            <Dashboard />
           </protectedRoutefromadmin>
          } />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/addproduct" element={
            <protectedRoutefromadmin>
              <AddProduct />
            </protectedRoutefromadmin>
          } />
          <Route path="/updateproduct" element={
            <protectedRoutefromadmin>
              <UpdateProduct />
            </protectedRoutefromadmin>
          } />
          <Route path="/productinfo/:id" element={<ProductInfo />} />
          <Route path="/*" element={<NoPage />} />
        </Routes>
      </Router>
      <ToastContainer />
    </MyState>
  );
}

export default App;

//USER
//USER
//USER
export const protectedRoute = ({ children }) => {
  const user = localStorage.getItem('currentUser'); // Use the correct key
  if (user) {
    return children;
  } else {
    return <Navigate to={'/login'} />;
  }
}

//ADMIN
const protectedRoutefromadmin = ({ children }) => {
  const admin = JSON.parse(localStorage.getItem('currentUser')); // Use the correct key
  if (admin && admin.user.email === 'kumarrohit93334@gmail.com') {
    return children;
  } else {
    return <Navigate to={'/login'} />;
  }
}



