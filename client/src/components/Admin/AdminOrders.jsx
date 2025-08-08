import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrderForAdminThunk } from "../../store/orderSlice";
import AdminOrderRow from "./AdminOrderRow";

const AdminOrders = () => {
  const dispatch = useDispatch();
  const { orders } = useSelector((state) => state.orders);
  useEffect(() => {
    if (orders?.length === 0) {
      dispatch(getOrderForAdminThunk());
    }
  }, [dispatch, orders?.length]);
  const showOrderRow = (order) => (
    <AdminOrderRow key={order._id} order={order} />
  );
  return (
    <section>
      <h2>Admin Orders</h2>
      <table >
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
