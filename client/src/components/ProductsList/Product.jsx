import React from 'react';

const Product = (props) => {
    const {product}=props;
    const {title,price}=product;
    return (
        <article>
            <h2 >{title}</h2>
            <h2>{price} uah</h2>
        </article>
    );
}

export default Product;
