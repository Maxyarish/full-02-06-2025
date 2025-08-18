import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAccountThunk } from "../store/authSlice";
import styles from "./Pages.module.scss";
import { useNavigate } from "react-router-dom";
import { getAccountOrdersThunk } from "../store/orderSlice";
import OrdersList from "../components/Orders/OrdersList";
import OrderDetails from "../components/Orders/OrderDetails";
import UpdateUserForm from "../components/Auth/UpdateUserForm";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const [idOrder, setIdOrder] = useState("");
    const [isUpdate, setIsUpdate] = useState(false);
  const navigate = useNavigate();
  const { user, error } = useSelector((state) => state.auth);
  const {
    ordersAccount,
    error: errorOrders,
    isLoading,
  } = useSelector((state) => state.orders);
  useEffect(() => {
    if (!user) {
      dispatch(getAccountThunk());
    }
  }, [dispatch, user]);
  useEffect(() => {
    if (ordersAccount.length === 0) {
      dispatch(getAccountOrdersThunk());
    }
  }, [dispatch, ordersAccount?.length]);

  const handleChange=()=>{
    setIsUpdate(true)
  }
  if (error) {
    navigate("/");
  }


  return (
    <section className={styles.wrapper}>
      <div className={styles["flex-box"]}>
        <article className={styles["personal-info"]}>
          {isUpdate ? (
            <UpdateUserForm setIsUpdate={setIsUpdate}/>
          ) : (
            <div >
              <h2>Name: {user?.name}</h2>
              <h2>Email: {user?.email}</h2>
              <h2>Role: {user?.role}</h2>
              <button onClick={handleChange}>update personal info</button>
            </div>
          )}
        </article>
      </div>

      <div>{idOrder && <OrderDetails idOrder={idOrder} />}</div>
          <hr />
      <div>
        {isLoading && <p>Loading</p>}
        {errorOrders && <p>{errorOrders}</p>}
        {ordersAccount?.length > 0 ? (
          <OrdersList orders={ordersAccount} setIdOrder={setIdOrder} />
        ) : (
          <p>empty order list</p>
        )}
      </div>
    </section>
  );
};

export default ProfilePage;
