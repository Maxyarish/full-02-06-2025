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
       <h1>{title}</h1>
      <div className={styles.pic}>
        <img
          src={`${CONSTANTS.BASE_URL}/${CONSTANTS.UPLOAD_FOLDER}/${images[0]}`} />
      </div>
      <h2>price:{price} uah</h2>
      <h2>category: {category?.name}</h2>
      <h2 style={{color:stockQty>0?'#4CAF50':'#d32f2f'}}> {stockQty > 0 ? "Available" : "Not Available"}</h2>
      <Icon path={mdiCartArrowDown} size={1} onClick={handleAddToCart}/>
         { isSale && <Icon path={mdiSale} width={25} color={'red'}/>}
    </article>
  );
};

export default ProductList;
