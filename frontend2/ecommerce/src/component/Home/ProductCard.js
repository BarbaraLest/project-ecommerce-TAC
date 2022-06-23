import React from "react";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
// import { Rating } from "@material-ui/lab";

const ProductCard = ({ product }) => {
  const options = {
    // value: product.ratings,
    // readOnly: true,
    // precision: 0.5,
    edit: false,
    activeColor: "#7d344a",
    size: window.innerHeight < 600 ? 20 : 25,
    value: product.ratings,
    isHalf: true,
  };

  return (
    <Link className="productCard" to={`/product/${product._id}`}>
      <img src={product.images[0].url} alt={product.name} />
      <p>{product.name}</p>
      <div>
        <ReactStars {...options} />{" "}
        <span className="productCardSpan">
          {" "}
          ({product.numOfReviews} Reviews)
        </span>
      </div>
      <span>{`R$${product.price}`}</span>
    </Link>
  );
};

export default ProductCard;
