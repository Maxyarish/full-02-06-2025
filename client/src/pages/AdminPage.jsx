import React from "react";
import { Link, Outlet } from "react-router-dom";
import styles from "./Pages.module.scss";
const AdminPage = () => {
  return (
    <div className={styles['admin-panel']}>
      <h1>Admin Page</h1>
      <ul>
        <li>
          <Link to="/admin-panel/categories">Categories</Link>
        </li>
        <li>
          <Link to="/admin-panel/products">Products</Link>
        </li>
        <li>
          <Link to="/admin-panel/orders">Orders</Link>
        </li>
      </ul>
      <Outlet />
    </div>
  );
};

export default AdminPage;
