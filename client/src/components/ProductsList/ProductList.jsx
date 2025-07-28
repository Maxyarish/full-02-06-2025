import React from "react";
import ProductsItem from "./ProductItem";
import styles from "./ProductList.module.scss";
const ProductList = (props) => {
  const { products } = props;
  const showItem = (product) => (
    <ProductsItem key={product._id} product={product} />
  );
  return <section className={styles.products}>{products.map(showItem)}</section>;
};

export default ProductList;
