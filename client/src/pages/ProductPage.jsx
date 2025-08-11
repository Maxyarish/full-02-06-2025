import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getOneProductThunk } from "../store/productsSlice";
import Product from "../components/ProductsList/Product";
//dw
const ProductPage = () => {
  const { idProduct } = useParams();
  const { selectedProduct, isLoading, error } = useSelector(
    (state) => state.products
  );
  const dispatch = useDispatch();
  useEffect(() => {
    if (idProduct) {
      dispatch(getOneProductThunk(idProduct));
    }
  }, [dispatch, idProduct]);
  if(!selectedProduct){
    return <p>404</p>
  }
  return (
    <section>
        {isLoading && <p>Loading...</p>}
        {error && <p>{error}</p>}
      <Product product={selectedProduct} />
    </section>
  );
};

export default ProductPage;
