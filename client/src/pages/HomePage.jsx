import React,{ useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProductsThunk } from '../store/productsSlice';
import ProductList from '../components/ProductsList/ProductList';

const HomePage = () => {
    const dispatch = useDispatch();
    const {products,error,isLoading} = useSelector((state) => state.products);
    useEffect(()=>{
        dispatch(getAllProductsThunk())
    },[dispatch])
    return (
        <div>
            <h1>Shop</h1>
            {error && <p>Error: {error}</p>}
            {isLoading && <p>Loading, please wait</p>}
            <ProductList products={products}/>
        </div>
    );
}

export default HomePage;
