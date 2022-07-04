import React, { useEffect } from "react";
import Sidebar from "./Sidebar.js";
import "./dashboard.css";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

import { Doughnut } from "react-chartjs-2";

import { useSelector, useDispatch } from "react-redux";
import { getAdminProduct, getProduct } from "../../actions/productAction";
import { getAllOrders } from "../../actions/orderAction.js";
import { getAllUsers } from "../../actions/userAction.js";
import MetaData from "../layout/MetaData";

const Dashboard = () => {
  const dispatch = useDispatch();

  const { products } = useSelector((state) => state.products);

  const { orders } = useSelector((state) => state.allOrders);

  const { users } = useSelector((state) => state.allUsers);

  let outOfStock = 0;

  products &&
    products.forEach((item) => {
      if (item.Stock === 0) {
        outOfStock += 1;
      }
    });

  useEffect(() => {
    dispatch(getAdminProduct());
    dispatch(getAllOrders());
    dispatch(getAllUsers());
  }, [dispatch]);

  let totalAmount = 0;
  orders &&
    orders.forEach((item) => {
      totalAmount += item.totalPrice;
    });

  const lineState = {
    labels: ["Quantidade inicial", "Valor ganho"],
    datasets: [
      {
        label: "Quantidade inicial",

        borderWidth: 1,
        backgroundColor: ["#e77899", "#6800B4"],
        hoverBackgroundColor: ["#4B5000", "#35014F"],
        data: [100, totalAmount],
      },
    ],
  };

  const doughnutState = {
    labels: ["Fora de estoque", "Em estoque"],
    datasets: [
      {
        backgroundColor: ["#00A6B4", "#6800B4"],
        hoverBackgroundColor: ["#4B5000", "#35014F"],
        data: [outOfStock, products.length - outOfStock],
      },
    ],
  };

  return (
    <div className="dashboard">
      <MetaData title="Dashboard - Admin Panel" />
      <Sidebar />

      <div className="dashboardContainer">
        <Typography component="h1">Dashboard</Typography>

        <div className="dashboardSummary">
          <div>
            <p>Saldo Total Vendido R$ {totalAmount},00</p>
          </div>
          <div className="dashboardSummaryBox2">
            <Link to="/admin/products">
              <p>Produtos</p>
              <p>{products && products.length}</p>
            </Link>
            <Link to="/admin/orders">
              <p>Pedidos</p>
              <p>{orders && orders.length}</p>
            </Link>
            <Link to="/admin/users">
              <p>Usuários</p>
              <p>{users && users.length}</p>
            </Link>
          </div>
        </div>

        {/* <Doughnut data={lineState} /> */}

        {/* <div className="dashboardSummary">
          <div className="dashboardSummaryBox2">
            <div className="doughnutChart">
              <Doughnut data={doughnutState} />

              <Doughnut data={lineState} />
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Dashboard;
