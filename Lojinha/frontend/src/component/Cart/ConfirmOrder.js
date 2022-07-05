import React, { Fragment } from "react";
import CheckoutSteps from "../Cart/CheckoutSteps";
import { useSelector } from "react-redux";
import MetaData from "../layout/MetaData";
import "./ConfirmOrder.css";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";
import { useNavigate } from "react-router-dom";

const ConfirmOrder = ({ history }) => {
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  let navigate = useNavigate();

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  const shippingCharges = subtotal > 1000 ? 0 : 200;

  const tax = subtotal * 0.18;

  const totalPrice = subtotal + tax + shippingCharges;

  const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}, ${shippingInfo.country}`;

  const proceedToPayment = () => {
    const data = {
      subtotal,
      shippingCharges,
      tax,
      totalPrice,
    };

    sessionStorage.setItem("orderInfo", JSON.stringify(data));

    navigate("/processamento/pagamento");
  };

  return (
    <Fragment>
      <MetaData title="Confirmação Pedido" />
      <div className="space"></div>
      <CheckoutSteps activeStep={1} />
      <div className="confirmOrderPage">
        <div>
          <div className="confirmshippingArea">
            <Typography>Informações do Pedido</Typography>
            <div className="confirmshippingAreaBox">
              <div>
                <p>Nome:</p>
                <span>{user.name}</span>
              </div>
              <div>
                <p>Telefone:</p>
                <span>{shippingInfo.phoneNo}</span>
              </div>
              <div>
                <p>Endereço:</p>
                <span>{address}</span>
              </div>
            </div>
          </div>
          <div className="confirmCartItems">
            <Typography>Itens do pedido:</Typography>
            <div className="confirmCartItemsContainer">
              {cartItems &&
                cartItems.map((item) => (
                  <div key={item.product}>
                    <img src={item.image} alt="Product" />
                    <Link to={`/product/${item.product}`}>
                      {item.name}
                    </Link>{" "}
                    <span>
                      {item.quantity} x R${item.price},00 ={" "}
                      <b>R${item.price * item.quantity}</b>
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>
        {/*  */}
        <div>
          <div className="orderSummary">
            <Typography>Total</Typography>
            <div>
              <div>
                <p>Subtotal:</p>
                <span>R$ {subtotal},00</span>
              </div>
              <div>
                <p>Taxa de envio:</p>
                <span>R$ {shippingCharges},00</span>
              </div>
              <div>
                <p>Taxas:</p>
                <span>R$ {tax},00</span>
              </div>
            </div>

            <div className="orderSummaryTotal">
              <p>
                <b>Total:</b>
              </p>
              <span>R$ {totalPrice},00</span>
            </div>

            <button onClick={proceedToPayment}>Finalizar Compra</button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ConfirmOrder;
