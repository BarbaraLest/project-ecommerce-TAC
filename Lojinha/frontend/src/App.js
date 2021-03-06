import "./App.css";
import Header from "./component/layout/Header/Header.js";
import Footer from "./component/layout/Footer/Footer.js";
import Home from "./component/Home/Home.js";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProductDetails from "./component/Product/ProductDetails.js";
import Products from "./component/Product/Products";
import Search from "./component/Product/Search";
import LoginSignUp from "./component/User/LoginSignUp";
import UserOptions from "./component/layout/Header/UserOptions";
import { loadUser } from "./actions/userAction";
import store from "./store";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Profile from "./component/User/Profile";
import ProtectedRoute from "./component/Route/ProtectedRoute";
import ProtectedAdminRoute from "./component/Route/ProtectedAdminRoute";
import UpdateProfile from "./component/User/UpdateProfile";
import UpdatePassword from "./component/User/UpdatePassword";
import ForgotPassword from "./component/User/ForgotPassword";
import ResetPassword from "./component/User/ResetPassword";
import Cart from "./component/Cart/Cart";
import Shipping from "./component/Cart/Shipping";
import ConfirmOrder from "./component/Cart/ConfirmOrder";
import OrderSucess from "./component/Cart/OrderSuccess";
import axios from "axios";
import Wrapper from "./component/Cart/Payment";
import MyOrders from "./component/Order/MyOrders";
import OrderDetails from "./component/Order/OrderDetails";
import Dashboard from "./component/Admin/Dashboard";
import ProductList from "./component/Admin/ProductList";
import NewProduct from "./component/Admin/NewProduct";
import UpdateProduct from "./component/Admin/UpdateProduct";
import OrderList from "./component/Admin/OrderList";
import ProcessOrder from "./component/Admin/ProcessOrder";
import UsersList from "./component/Admin/UsersList";
import UpdateUser from "./component/Admin/UpdateUser";
import ProductReviews from "./component/Admin/ProductReviews";
import About from "./component/layout/About/About";

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <BrowserRouter>
      <Header />
      {isAuthenticated && <UserOptions user={user} />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:keyword" element={<Products />} />
        <Route path="/search" element={<Search />} />
        <Route path="/login" element={<LoginSignUp />} />
        <Route path="/about" element={<About />} />
        <Route path="/" element={<ProtectedRoute />}>
          <Route path="/perfil" user={user} element={<Profile />} />
          <Route path="/me/update" user={user} element={<UpdateProfile />} />
          <Route path="/senha/atualizar" element={<UpdatePassword />} />
          <Route path="/login/enviar" element={<Shipping />} />
          <Route path="/pedido/confirmacao" element={<ConfirmOrder />} />
          <Route path="/processamento/pagamento" element={<Wrapper />} />
          <Route path="/sucesso" element={<OrderSucess />} />
          <Route path="/pedidos" element={<MyOrders />} />
          <Route path="/order/:id" element={<OrderDetails />} />
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/" element={<ProtectedAdminRoute />}>
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/products" element={<ProductList />} />
            <Route path="/admin/product" element={<NewProduct />} />
            <Route path="/admin/product/:id" element={<UpdateProduct />} />
            <Route path="/admin/orders" element={<OrderList />} />
            <Route path="/admin/order/:id" element={<ProcessOrder />} />
            <Route path="/admin/users" element={<UsersList />} />
            <Route path="/admin/user/:id" element={<UpdateUser />} />
            <Route path="/admin/reviews" element={<ProductReviews />} />
          </Route>
        </Route>

        <Route path="/senha/esqueci" element={<ForgotPassword />} />
        <Route path="/senha/reset/:token" element={<ResetPassword />} />
        <Route path="/carrinho" element={<Cart />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
