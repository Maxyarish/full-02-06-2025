import React from "react";
import {  mdiSale ,mdiCartArrowDown} from "@mdi/js";
import { addTocart } from "../../store/cartSlice";
import { useDispatch } from 'react-redux';
import Icon from "@mdi/react";
import styles from "./ProductList.module.scss";
import CONSTANTS from "../../constants";
import { useNavigate } from "react-router-dom";

const ProductList = (props) => {
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const {product}=props;
  const {
    product: { title, price, stockQty, isSale, images,category },
  } = props;
  const handleAddToCart=(event)=>{
    event.stopPropagation()
dispatch(addTocart(product))
  }
  const navigateProduct=()=>{navigate(`/products/${product._id}`)}
  return (
    <article className={styles.product} onClick={navigateProduct}>
   { isSale && <Icon path={mdiSale}/>}
   {isSale && <p>sale</p>}
      <div className={styles.pic}>
        <img
          src={`${CONSTANTS.BASE_URL}/${CONSTANTS.UPLOAD_FOLDER}/${images[0]}`}
          alt={title}
        />
      </div>
      <h3>{title}</h3>
      <p>price:{price}</p>
      <p>{category?.name}</p>
      <p>{stockQty > 0 ? "Available" : "Not Available"}</p>
      <Icon path={mdiCartArrowDown} size={1} onClick={handleAddToCart}/>
    </article>
  );
};

export default ProductList;
