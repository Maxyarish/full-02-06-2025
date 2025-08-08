import React from 'react';
import styles from './Cart.module.scss';
import { useDispatch } from 'react-redux';
import {decrementQuantite, incrementQuantite, removeFromCart} from '../../store/cartSlice'
const CartItem = (props) => {
    const dispatch=useDispatch()
    const {item}=props
    const handleDelete=()=>{
        dispatch(removeFromCart(item._id))
    };
    const handleDecrement=()=>{
dispatch(decrementQuantite(item._id))
}  ;
const handleIncrement=()=>{
    dispatch(incrementQuantite(item._id))
} 
 return (
      <li className={styles['cart-item']}>
      <h3>{item.title}</h3>
      <p>{item.price}</p>
      <div>
 
        <button onClick={handleIncrement}>+</button>
         <span >{item.quantity}</span>
        <button onClick={handleDecrement}>-</button>
      </div>
      <button onClick={handleDelete}>delete from cart</button>
      </li>
    );
}

export default CartItem;
