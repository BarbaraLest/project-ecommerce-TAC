import React, { Fragment, useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import "./ProductDetails.css";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProductDetails } from "../../actions/productAction";
import Loader from "../layout/Loader/Loader";
import { Container } from "@mui/system";
import ReactStars from "react-rating-stars-component";
import ReviewCard from "./ReviewCard.js";
import MetaData from "../layout/MetaData";
import { useAlert } from "react-alert";
import { addItemsToCart } from "../../actions/cartAction";

const ProductDetails = ({ match }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const alert = useAlert();

  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );

  const [quantity, setQuantity] = useState(1);
  //  const [open, setOpen] = useState(false);
  //  const [rating, setRating] = useState(0);
  //  const [comment, setComment] = useState("");

  const increaseQuantity = () => {
    if (product.Stock <= quantity) return;

    const qty = quantity + 1;
    setQuantity(qty);
  };

  const decreaseQuantity = () => {
    if (1 >= quantity) return;

    const qty = quantity - 1;
    setQuantity(qty);
  };

  const addToCartHandler = () => {
    dispatch(addItemsToCart(id, quantity));
    alert.success("Item adicionado ao seu carrinho!");
  };

  // const submitReviewToggle = () => {
  //   open ? setOpen(false) : setOpen(true);
  // };

  // const reviewSubmitHandler = () => {
  //   const myForm = new FormData();

  //   myForm.set("rating", rating);
  //   myForm.set("comment", comment);
  //   myForm.set("productId", match.params.id);

  //   dispatch(newReview(myForm));

  //   setOpen(false);
  // };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    //  if (reviewError) {
    //    alert.error(reviewError);
    //    dispatch(clearErrors());
    //  }

    //  if (success) {
    //    alert.success("Review Submitted Successfully");
    //    dispatch({ type: NEW_REVIEW_RESET });
    //  }
    dispatch(getProductDetails(id));
  }, [dispatch, id, error, alert]);

  const options = {
    edit: false,
    color: "#e77899",
    activeColor: "#e77899",
    size: window.innerWidth < 600 ? 20 : 25,
    value: product.ratings,
    readOnly: true,
    isHalf: true,
  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={`${product.name}`} />
          <div className="ProductDetails">
            <div>
              <Container className="Container">
                <Carousel>
                  {product.images &&
                    product.images.map((item, i) => (
                      <img
                        className="CarouselImage"
                        key={i}
                        src={item.url}
                        alt={`${i} Slide`}
                      />
                    ))}
                </Carousel>
              </Container>
            </div>
            <div>
              <div className="detailsBlock-1">
                <h2>{product.name}</h2>
                <p>Código do produto: {product._id}</p>
              </div>
              <div className="detailsBlock-2">
                <ReactStars {...options} />
                <span className="detailsBlock-2-span">
                  {" "}
                  ({product.numOfReviews} Reviews)
                </span>
              </div>
              <div className="detailsBlock-3">
                <h1>{`R$ ${product.price},00`}</h1>
                <div className="detailsBlock-3-1">
                  <div className="detailsBlock-3-1-1">
                    <button onClick={decreaseQuantity}>-</button>
                    <input readOnly type="number" value={quantity} />
                    <button onClick={increaseQuantity}>+</button>
                  </div>
                  <button onClick={addToCartHandler}>
                    Adicionar ao carrinho
                  </button>
                </div>
                <p>
                  Status:{" "}
                  <b className={product.Stock < 1 ? "redColor" : "greenColor"}>
                    {product.Stock < 1 ? "Sem estoque" : "Em estoque"}
                  </b>
                </p>
              </div>
              <div className="detailsBlock-4">
                Descrição : <p>{product.description}</p>
              </div>
              <button className="submitReview">Enviar avaliação</button>
            </div>
          </div>

          <h3 className="reviewsHeading">AVALIAÇÕES</h3>
          {product.reviews && product.reviews[0] ? (
            <div className="reviews">
              {product.reviews &&
                product.reviews.map((review) => (
                  <ReviewCard key={review._id} review={review} />
                ))}
            </div>
          ) : (
            <p className="noReviews">
              Este produto ainda não possui avaliações.
            </p>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default ProductDetails;
