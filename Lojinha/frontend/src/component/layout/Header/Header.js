import React from "react";
import { ReactNavbar } from "overlay-navbar";
import logo from "../../../images/logo.png";

const options = {
  burgerColorHover: "#e77899",
  logo,
  logoWidth: "20vmax",
  navColor1: "white",
  logoHoverSize: "10px",
  logoHoverColor: "#e77899",
  link1Text: "Home",
  link2Text: "Produtos",
  link3Text: "Login",
  link4Text: "Pesquisar",
  link5Text: "Login",

  link1Url: "/",
  link2Url: "/products",
  link3Url: "/login",
  link4Url: "/search",
  link5Url: "/login",

  link1Size: "1.3vmax",
  link1Color: "rgba(35, 35, 35,0.8)",
  nav1justifyContent: "flex-end",
  nav2justifyContent: "flex-end",
  nav3justifyContent: "flex-start",

  link1ColorHover: "#e77899",
  link1Margin: "1vmax",
};

const Header = () => {
  return <ReactNavbar {...options} />;
};

export default Header;
