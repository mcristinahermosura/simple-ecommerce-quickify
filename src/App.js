import AppNavBar from "./components/AppNavBar";
import "./App.css";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import ProductCreation from "./Pages/AddProduct.js";
import AdminDashboard from "./Pages/AdminDashboard.js";

// import { useState, useEffect } from "react";
import { UserProvider } from "./UserContext.js";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Products from "./Pages/Products.js";

function App() {
  return (
    <UserProvider>
      <Router>
        <AppNavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signUp" element={<Register />} />
          <Route path="/addProduct" element={<ProductCreation />} />
          <Route path="/products" element={<Products />} />

          <Route path="/dashboard" element={<AdminDashboard />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
