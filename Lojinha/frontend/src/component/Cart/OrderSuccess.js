import React from "react";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import "./OrderSuccess.css";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

const OrderSuccess = () => {
  return (
    <div className="orderSuccess">
      <CheckCircleIcon />

      <Typography>Parabéns! O seu pedido foi criado com sucesso </Typography>
      <Link to="/pedidos">Ver Pedidos</Link>
    </div>
  );
};

export default OrderSuccess;
