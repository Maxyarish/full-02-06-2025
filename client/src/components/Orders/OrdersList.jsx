import React from "react";
import OrderRow from "./OrderRow";

const OrdersList = ({ orders, setIdOrder }) => {
  const showOrderRow = (order) => (
    <OrderRow
      key={order._id}
      order={order}
      setIdOrder={setIdOrder} 
    />
  );

  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Date</th>
          <th>Items</th>
          <th>Total</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>{orders?.map(showOrderRow)}</tbody>
    </table>
  );
};

export default OrdersList;