import React, { useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { useDispatch, useSelector } from "react-redux";
import { getOrderByIdThunk } from "../../store/orderSlice";
import { createCheckoutSession } from "../../api";
import CONSTANTS from "../../constants";


const stripePromise = loadStripe(CONSTANTS.STRIPE_SECRET_KEY);

const OrderDetails = (props) => {
  const { idOrder } = props;
  const { selectedOrder, isLoading } = useSelector((state) => state.orders);
  const dispatch = useDispatch();

  useEffect(() => {
    if (idOrder) {
      dispatch(getOrderByIdThunk(idOrder));
    }
  }, [dispatch, idOrder]);

  const handlePayment = async () => {
    const stripe = await stripePromise;
    const stripeProducts = selectedOrder.products.map((product)=>({
      title:product.productId.title,
      productPrice:product.productPrice,
      quantity:product.quantity,
    }));
    const response = await createCheckoutSession(
      selectedOrder._id,
      stripeProducts
    );
    await stripe.redirectToCheckout({ sessionId: response.data.id });
  };
  return (
    <div>
      {isLoading && <p>Loading</p>}
      <h3>
        Order {selectedOrder?._id.slice(-4)}:{" "}
        {selectedOrder?.createdAt.slice(0, 10)}
        {selectedOrder?.products.length} items
      </h3>
      <p>
        {selectedOrder?.status === "new" ? (
          <button onClick={handlePayment}>payment</button>
        ) : (
          <span>{selectedOrder?.status}</span>
        )}
      </p>
      <div>
        <h4>shipping</h4>
        <p>Phone: {selectedOrder?.shippingPhone}</p>
        <p>Method: {selectedOrder?.shippingMethod}</p>
        <p>Address: {selectedOrder?.shippingAddress}</p>
        <p>Price: {selectedOrder?.shippingPrice?.toFixed(2)}</p>
      </div>

      <table>
        <thead>
          <tr>
            <th>title</th>
            <th>price</th>
            <th>quantity</th>
            <th>total</th>
          </tr>
        </thead>
        <tbody>
          {selectedOrder?.products.map((product) => (
            <tr key={product._id}>
              <td>{product.productId?.title}</td>
              <td>{product.productPrice?.toFixed(2)}</td>
              <td>{product.quantity}</td>
              <td>{(product.productPrice * product.quantity).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h4>Total: {selectedOrder?.totalSumma?.toFixed(2)}</h4>
      <p>Status: {selectedOrder?.status}</p>
    </div>
  );
};

export default OrderDetails;
