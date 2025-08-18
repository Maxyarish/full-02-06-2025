import React from "react";

const OrderRow = (props) => {
  const { order, setIdOrder } = props;
  const { _id, createdAt, products, totalSumma, status } = order;

  const handleClick = () => {
    setIdOrder(_id);
  };

  return (
    <tr onClick={handleClick} style={{ cursor: "pointer" }}>
      <td>{_id}</td>
  
      <td>{createdAt?.slice(0, 10)}</td>
      <td>{products?.length}</td>
      <td>{totalSumma?.toFixed(2)}</td>
      <td>{status}</td>
    </tr>
  );
};

export default OrderRow;