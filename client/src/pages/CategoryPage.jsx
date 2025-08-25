import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getOneCategoryThunk } from "../store/categoriesSlice";
import ProductList from "../components/ProductsList/ProductList";
import styles from "./Pages.module.scss";
const CategoryPage = () => {
  const dispatch = useDispatch();
  const { idCategory } = useParams();
  const { selectedCategory, error, isLoading } = useSelector(
    (state) => state.categories
  );

  useEffect(() => {
    if (idCategory) {
      dispatch(getOneCategoryThunk(idCategory));
    }
  }, [dispatch, idCategory]);
  if (error) {
    return <p>error</p>;
  }
  if (isLoading) {
    return <p>Loading...</p>;
  }
  return (
    <div className={styles.category}>
      <h1 >{selectedCategory?.name}</h1>
      {selectedCategory?.products?.length > 0 ? (
        <ProductList products={selectedCategory?.products} />
      ) : (
        <p>empty</p>
      )}
    </div>
  );
};

export default CategoryPage;
