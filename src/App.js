import AppNavBar from "./components/AppNavBar";
import "./Pages/Layout.css";

import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import AdminDashboard from "./Pages/Admin/AdminDashboard.js";
import Cart from "./Pages/Client/Cart.js";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Products from "./Pages/Product/Products.js";
import ContextProvider from "./context/ContextProvider.js";
import ViewSingleProduct from "./Pages/Product/ViewSingleProduct.js";
import OrderHistory from "./Pages/Client/Order.js";
import NotFound from "./Pages/NotFound.js";

function App() {
  const token = JSON.parse(localStorage.getItem("token")) || null;
  return (
    <ContextProvider>
      <Router>
        <AppNavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          {!token && (
            <>
              <Route path="/login" element={<Login />} />
              <Route path="/signUp" element={<Register />} />
            </>
          )}
          <Route path="/products" element={<Products />} />
          <Route path="/dashboard" element={<AdminDashboard />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/orders" element={<OrderHistory />} />
          <Route path="/product/:id" element={<ViewSingleProduct />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </ContextProvider>
  );
}

export default App;
