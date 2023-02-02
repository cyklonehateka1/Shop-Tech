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
import Checkout from "./pages/Checkout";
import Product from "./pages/Product";
import AwaitEmailConfirm from "./pages/AwaitEmailConfirm";
import ForgotPassword from "./pages/ForgotPassword";
import { useSelector } from "react-redux";
import Orders from "./pages/Orders";

function App() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/awaitEmailconfirm" element={<AwaitEmailConfirm />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/login"
            element={currentUser ? <Navigate to="/" /> : <Login />}
          />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/admin/orders" element={<Orders />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
