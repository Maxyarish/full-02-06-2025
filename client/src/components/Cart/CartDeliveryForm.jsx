import React from "react";
import { ErrorMessage, Form, Formik, Field } from "formik";
import CONSTANTS from "../../constants";
import { orderDeliverySchema } from "../../validation/order.validation";
import { useDispatch, useSelector } from "react-redux";
import { loadStripe } from "@stripe/stripe-js";
import { createOrderThunk } from "../../store/orderSlice";
import { clearCart } from "../../store/cartSlice";
import { createCheckoutSession } from "../../api";

const stripePromise = loadStripe(CONSTANTS.STRIPE_SECRET_KEY);

const CartDeliveryForm = (props) => {
  const { items } = props;
  const dispatch = useDispatch();
  const onSubmit = async (values) => {
    try {
      const sprite = await stripePromise;
      const orderValues = {
        products: items.map((item) => ({
          productId: item._id,
          quantity: item.quantity,
        })),
        ...values,
        shippingPrice: CONSTANTS.SHIPPING_PRICE[values.shippingMethod],
      };
      const order = await dispatch(createOrderThunk(orderValues)).unwrap();
      const stripeProducts = items.map((item) => ({
        title: item.title,
        productPrice: item.price,
        quantity: item.quantity,
      }));
      const response = await createCheckoutSession(order._id, stripeProducts);
      await sprite.redirectToCheckout({ sessionId: response.data.id });

      dispatch(clearCart());
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Formik
      initialValues={{
        shippingPhone: "",
        shippingMethod: CONSTANTS.SHIPPING_METHODS[0],
        shippingAdress: "",
        shippingPrice: 0,
      }}
      validationSchema={orderDeliverySchema}
      onSubmit={onSubmit}
    >
      {() => {
        return (
          <Form>
            <label>
              <span>phone</span>
              <Field name="shippingPhone" type="tel" />
              <ErrorMessage name="shippingPhone" />
            </label>
            <label>
              <span>method</span>
              <Field name="shippingMethod" as="select">
                {CONSTANTS.SHIPPING_METHODS.map((method) => (
                  <option key={method} value={method}>
                    {method}
                  </option>
                ))}
              </Field>
              <ErrorMessage name="shippingMethod" />
            </label>
            <label>
              <span>adress</span>
              <Field name="shippingAdress" type="text" />
              <ErrorMessage name="shippingAdress" />
            </label>
            <button type="submit">create order and payment</button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default CartDeliveryForm;
