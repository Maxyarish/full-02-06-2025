import React from "react";
import { useDispatch } from "react-redux";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import CONSTANTS from "../../constants";
import styles from "./Product.module.scss";
import { addTocart } from "../../store/cartSlice";
import { Link } from "react-router-dom";

const Product = (props) => {
  const dispatch = useDispatch();
  const { product } = props;
  const { title, price, images, description, stockQty, category } = product;
  const handleAddToCart = () => {
    dispatch(addTocart(product));
  };
  const imaegesGallerry = images.map((img) => ({
    original: `${CONSTANTS.BASE_URL}/${CONSTANTS.UPLOAD_FOLDER}/${img}`,
    thumbnail: `${CONSTANTS.BASE_URL}/${CONSTANTS.UPLOAD_FOLDER}/${img}`,
  }));
  return (
    <article className={styles.product}>
      <div className={styles.images}>
        <ImageGallery
          items={imaegesGallerry}
          showPlayButton={false}
          showNav={false}
        />
      </div>

      <div className={styles.info}>
        <h2>{title}</h2>
        <p>
          category:{''}
          <Link to={`/categories/${category?._id}`}>{category.name}</Link>
        </p>
        <p>{price} uah</p>
        <p>{description} </p>
        <p>{stockQty} </p>
        <button onClick={handleAddToCart}>add to cart</button>
      </div>
    </article>
  );
};

export default Product;
