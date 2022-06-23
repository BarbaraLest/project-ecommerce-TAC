import React, { Fragment, useEffect } from "react";
import Product from "./Product.js";
// import ProductCard from "./ProductCard.js";
import MetaData from "../layout/MetaData";
// import { clearErrors, getProduct } from "../../actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/Loader/Loader";
// import { useAlert } from "react-alert";
import "./Home.css";
import { getProduct } from "../../actions/productAction";

const Home = () => {
  // const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, error, products, productsCount } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    // if (error) {
    //  // alert.error(error);
    //   dispatch(clearErrors());
    // }
    dispatch(getProduct());
  }, [dispatch]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Lojinha." />
          <div className="banner">
            <h1>Essa é a Lojinha.</h1>
            <h1>Encontre os melhores produtos, pelos melhores preços</h1>

            <a href="#container">
              <button>Scroll</button>
            </a>
          </div>

          <h2 className="homeHeading">Featured Products</h2>

          <div className="container" id="container">
            {products &&
              products.map((product) => <Product product={product} />)}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;
