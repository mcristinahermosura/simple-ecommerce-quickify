import React, { useCallback } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { alertPrompt } from "../utils/function";
import AdminDashboard from "../Pages/Admin/AdminDashboard";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import NotFound from "../Pages/NotFound";
import ViewSingleProduct from "../Pages/ViewSingleProduct";
import Products from "../Pages/Products";
import OrderHistory from "../Pages/Client/Order";
import Cart from "../Pages/Client/Cart";
import { useUserContext } from "../context/UserContext";

const ProtectedRoute = React.memo(({ isAuthorized, alert, children }) => {
    if (!isAuthorized) {
        alert();
        return null;
    }
    return children;
});

const Routers = () => {
  const { isAdmin, token } = useUserContext();
  const navigate = useNavigate();

  const handleAlert = useCallback(() => {
    let message = "";
    if (!isAdmin) {
      if (!token) {
        message = "You need to login to access this page.";
      } else {
        message = "Only Admin can access this page!";
      }
    } else {
      message = "Admin cannot access this page!";
    }

    alertPrompt(message).then((res) => {
      if (res.dismiss === "timer") {
        navigate(!token ? "/login" : -1);
      }
    });
  }, [isAdmin, token, navigate]);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signUp" element={<Register />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute
            isAuthorized={Boolean(isAdmin && token)}
            alert={handleAlert}
          >
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/cart"
        element={
          <ProtectedRoute
            isAuthorized={Boolean(!isAdmin && token)}
            alert={handleAlert}
          >
            <Cart />
          </ProtectedRoute>
        }
      />
      <Route
        path="/orders"
        element={
          <ProtectedRoute
            isAuthorized={Boolean(!isAdmin && token)}
            alert={handleAlert}
          >
            <OrderHistory />
          </ProtectedRoute>
        }
      />
      <Route path="/products" element={<Products />} />
      <Route path="/product/:id" element={<ViewSingleProduct />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Routers;
