import AppNavBar from "./components/AppNavBar";
import "./App.css";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import ProductCreation from "./components/AddProduct.js";
import AdminDashboard from "./Pages/AdminDashboard.js";
import Cart from "./Pages/Cart.js";

// import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Products from "./Pages/Product/Products.js";
import ContextProvider from "./context/ContextProvider.js";

function App() {
  return (
    <ContextProvider>
      <Router>
        <AppNavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signUp" element={<Register />} />
          <Route path="/addProduct" element={<ProductCreation />} />
          <Route path="/products" element={<Products />} />
          <Route path="/dashboard" element={<AdminDashboard />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </Router>
    </ContextProvider>
  );
}

export default App;
