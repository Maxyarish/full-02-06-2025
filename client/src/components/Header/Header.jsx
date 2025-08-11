import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllCategoriesThunk } from "../../store/categoriesSlice";
import { NavLink, Link } from "react-router-dom";
import styles from "./Header.module.scss";
import { logoutUserThunk } from "../../store/authSlice";

const Header = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { categories } = useSelector((state) => state.categories);
  const { items, total } = useSelector((state) => state.cart);
  useEffect(() => {
    if (categories?.length === 0) {
      dispatch(getAllCategoriesThunk());
    }
  }, [dispatch, categories?.length]);

  const showCategory = (category) => (
    <li key={category._id}>
      <NavLink to={`/categories/${category._id}`}>{category.name}</NavLink>
    </li>
  );
  const logout = () => dispatch(logoutUserThunk());
  return (
    <header>
      <hr />
      <div className={styles["top-header"]}>
        {user ? (
          <>
            <span>Hi, {user?.name}</span>
            {user?.role === "admin" && (
              <Link to="admin-panel">Admin Panel</Link>
            )}
            <button onClick={logout}> Log out</button>
          </>
        ) : (
          <>
            <Link to="/login">Sign in</Link>
            <Link to="/register">Sign up</Link>
          </>
        )}
      </div>
      <hr />
      <div>
        <NavLink to="/">logo</NavLink>
        <NavLink to="/cart">
          cart
          {items.length > 0 && <span>{items.length}</span>}
          <span>{total?.toFixed(2)} items</span>
        </NavLink>
      </div>
      <nav>
        <ul className={styles["main-menu"]}>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          {categories?.map(showCategory)}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
