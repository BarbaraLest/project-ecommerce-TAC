import React, { Fragment } from "react";
import Product from "./Product.js";
// import ProductCard from "./ProductCard.js";
// import MetaData from "../layout/MetaData";
// import { clearErrors, getProduct } from "../../actions/productAction";
// import { useSelector, useDispatch } from "react-redux";
// import Loader from "../layout/Loader/Loader";
// import { useAlert } from "react-alert";
import "./Home.css";

const Home = () => {
  const product = {
    name: "Calça Wide Leg",
    images: [
      {
        url: "https://photos.enjoei.com.br/calca-wide-leg-jeans-shein-48106039/1200xN/czM6Ly9waG90b3MuZW5qb2VpLmNvbS5ici9wcm9kdWN0cy84MzQ2MTYwLzI2YmQwZjJmZTI3MzhkOWY5MmFmMGM4NTgyZDYxYjVlLmpwZw",
      },
    ],
    price: "150",
    _id: "XYZ10",
  };
  // const alert = useAlert();
  // const dispatch = useDispatch();
  // const { loading, error, products } = useSelector((state) => state.products);

  // useEffect(() => {
  //   if (error) {
  //     alert.error(error);
  //     dispatch(clearErrors());
  //   }
  //   dispatch(getProduct());
  // }, [dispatch, error, alert]);

  return (
    <Fragment>
      <div className="banner">
        <h1>Essa é a Lojinha.</h1>
        <h1>Encontre os melhores produtos, pelos melhores preços</h1>

        <a href="#container">
          <button>Scroll</button>
        </a>
      </div>

      <h2 className="homeHeading">Featured Products</h2>

      <div className="container" id="container">
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
      </div>
    </Fragment>
  );
};

export default Home;
