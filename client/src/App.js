import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import Product from "./pages/Product";
import AwaitEmailConfirm from "./pages/AwaitEmailConfirm";
import ForgotPassword from "./pages/ForgotPassword";
import { useSelector } from "react-redux";
import AdminProducts from "./admin/pages/AdminProducts";
import AdminAddProduct from "./admin/pages/AdminAddProduct";
import Orders from "./admin/pages/AdminOrders";
import Products from "./pages/Products";
import ConfirmEmail from "./pages/ConfirmEmail";
import AdminDashboard from "./admin/pages/AdminDashboard";

import { AccessAwaitEmailContext } from "./context/accessAwaitEmailContext";
import { useContext } from "react";
import Categories from "./pages/Categories";

function App() {
  const { currentUser } = useSelector((state) => state.user);
  const { checkInfo } = useContext(AccessAwaitEmailContext);
  const accessAwaitEmail =
    currentUser || localStorage.getItem("temporalInfo") !== null;
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/products" element={<Products />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/product/:id" element={<Product />} />
          <Route
            path="/awaitEmailconfirm"
            element={
              accessAwaitEmail ? (
                <AwaitEmailConfirm />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route path="/register" element={<Register />} />
          <Route
            path="/login"
            element={currentUser ? <Navigate to="/" /> : <Login />}
          />
          <Route
            path="/auth/verifyemail/user/:userId/verify/:token"
            element={<ConfirmEmail />}
          />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/admin/products" element={<AdminProducts />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/addproduct" element={<AdminAddProduct />} />
          <Route path="/admin/orders" element={<Orders />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
