import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrderForAdminThunk, getOrdersAmountThunk } from "../../store/orderSlice";
import AdminOrderRow from "./AdminOrderRow";
import Pagination from "../Pagination/Pagination";
import CONSTANTS from "../../constants";
import styles from "./Admin.module.scss"
const AdminOrders = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const { orders, totalOrders } = useSelector((state) => state.orders);
  const [amount, setAmount] = useState(CONSTANTS.ORDER_AMOUNT[0]);
  useEffect(() => {
    dispatch(getOrdersAmountThunk());
  }, [dispatch]);
  useEffect(() => {
    dispatch(getOrderForAdminThunk({ page, amount }));
  }, [dispatch, page, amount]);

  const showOrderRow = (order) => (
    <AdminOrderRow key={order._id} order={order} />
  );

  return (
    <section className={styles['main-order-border']}>
      <h1>Admin Orders</h1>
      <div>
        <h2>Total Orders: {totalOrders}</h2>
        <Pagination page={page} setPage={setPage} amount={amount} total={totalOrders} setAmount={setAmount}/>
      </div>

      <table>
        <thead>
          <tr>
            <th rowSpan={2}>user email</th>
            <th colSpan={4}>shipping</th>
            <th>products</th>
            <th rowSpan={2}>total</th>
            <th rowSpan={2}>status</th>
            <th rowSpan={2}>update status</th>
          </tr>
          <tr>
            <th>phone</th>
            <th>method</th>
            <th>address</th>
            <th>price</th>
            <th>
              <table>
                <thead>
                  <tr>
                    <th>title</th>
                    <th>price</th>
                    <th>quantity</th>
                  </tr>
                </thead>
              </table>
            </th>
          </tr>
        </thead>
        <tbody>{orders.map(showOrderRow)}</tbody>
      </table>
    </section>
  );
};

export default AdminOrders;
