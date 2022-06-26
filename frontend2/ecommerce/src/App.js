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
import store from './store';
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";




function App() {

  const { isAuthenticated, user } = useSelector((state) => state.user);


  useEffect(() => {
   

    store.dispatch(loadUser());

   // getStripeApiKey();
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
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
