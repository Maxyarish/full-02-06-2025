import React,{ useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProductsThunk } from '../store/productsSlice';
import ProductList from '../components/ProductsList/ProductList';
import styles from './Pages.module.scss';
const HomePage = () => {
    const dispatch = useDispatch();
    const {products,error,isLoading} = useSelector((state) => state.products);
    useEffect(()=>{
        dispatch(getAllProductsThunk())
    },[dispatch])
    return (
        <div className={styles['home-page']}>
            <h1>Shop</h1>
            {error && <p>Error: {error}</p>}
            {isLoading && <p>Loading, please wait</p>}
            <ProductList products={products}/>
        </div>
    );
}

export default HomePage;
