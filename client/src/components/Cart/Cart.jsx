import React from "react";
import { useDispatch, useSelector } from "react-redux";
import CartItem from "./CartItem";
import { clearCart } from "../../store/cartSlice";
import CartDeliveryForm from "./CartDeliveryForm";

const Cart = () => {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.cart);
    const { error } = useSelector((state) => state.orders);
  const total = items?.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const showItem = (item) => <CartItem key={item._id} item={item} />;
  const handleClear = () => {
    dispatch(clearCart());
  };
  return (
    <section>
               {error && <h3>{error}</h3>}
      {items?.length === 0 && <p>empty cart</p>}
      <ul>{items?.map(showItem)}</ul>
      {items?.length && <button onClick={handleClear}>clear cart</button>}
      <p>{`total:${total.toFixed(2)} грн`}</p>
      <CartDeliveryForm items={items}/>
    </section>
  );
};

export default Cart;
