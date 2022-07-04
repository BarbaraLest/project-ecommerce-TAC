import React from "react";
import "./sidebar.css";
import logo from "../../images/logo.png";
import { Link } from "react-router-dom";
import { TreeView, TreeItem } from "@material-ui/lab";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import PostAddIcon from "@material-ui/icons/PostAdd";
import AddIcon from "@material-ui/icons/Add";
import ImportExportIcon from "@material-ui/icons/ImportExport";
import ListAltIcon from "@material-ui/icons/ListAlt";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PeopleIcon from "@material-ui/icons/People";
import RateReviewIcon from "@material-ui/icons/RateReview";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <Link to="/">
        <img src={logo} alt="Ecommerce" />
      </Link>
      <Link to="/admin/dashboard">
        <p>
          <DashboardIcon /> Dashboard
        </p>
      </Link>

      <Link to="/admin/products">
        <p>
          <PostAddIcon />
          Todos os Produto
        </p>
      </Link>

      <Link to="/admin/product">
        <p>
          <AddIcon />
          Criar Produto
        </p>
      </Link>

      <Link to="/admin/orders">
        <p>
          <ListAltIcon />
          Pedidos
        </p>
      </Link>
      <Link to="/admin/users">
        <p>
          <PeopleIcon /> Usuários
        </p>
      </Link>
      <Link to="/admin/reviews">
        <p>
          <RateReviewIcon />
          Avaliações
        </p>
      </Link>
    </div>
  );
};

export default Sidebar;