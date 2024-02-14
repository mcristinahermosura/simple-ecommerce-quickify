import AppNavBar from "./components/AppNavBar";
import "./Pages/Layout.css";

import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import AdminDashboard from "./Pages/Admin/AdminDashboard.js";
import Cart from "./Pages/Client/Cart.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Products from "./Pages/Product/Products.js";
import ViewSingleProduct from "./Pages/Product/ViewSingleProduct.js";
import OrderHistory from "./Pages/Client/Order.js";
import NotFound from "./Pages/NotFound.js";
import { ProtectedRoute, alertPrompt } from "./utils/function.js";
import { useContext } from "react";
import { UserContext } from "./context/UserContext.js";

function App() {
  const { token, isAdmin } = useContext(UserContext);

  return (
    <BrowserRouter>
      <AppNavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={
            <ProtectedRoute
              // You will be able to access the login page only if you are not logged in
              isAuthorized={!token}
              alert={() => alertPrompt(-1)}
            >
              <Login />
            </ProtectedRoute>
          }
        />
        <Route
          path="/signUp"
          element={
            <ProtectedRoute
              // You will be able to access the resgister page only if you are not logged in
              isAuthorized={!token}
              alert={() => alertPrompt(-1)}
            >
              <Register />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute
              // You will be able to access the admin dashboard only if you are logged in as an admin
              isAuthorized={token && isAdmin}
              alert={() =>
                alertPrompt(-1, "You are not authorized to access this page!")
              }
            >
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cart"
          element={
            <ProtectedRoute
              isAuthorized={token && !isAdmin}
              alert={() =>
                alertPrompt(
                  token ? -1 : "/login",
                  token && isAdmin
                    ? "Admin cannot access this page!"
                    : "You need to login to access this page."
                )
              }
            >
              <Cart />
            </ProtectedRoute>
          }
        />
        <Route
          path="/orders"
          element={
            <ProtectedRoute
              isAuthorized={token && !isAdmin}
              alert={() =>
                alertPrompt(
                  token && isAdmin ? -1 : "/login",
                  token && isAdmin
                    ? "Admin cannot access this page!"
                    : "You need to login to access this page."
                )
              }
            >
              <OrderHistory />
            </ProtectedRoute>
          }
        />
        <Route path="/products" element={<Products />} />
        <Route path="/product/:id" element={<ViewSingleProduct />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
