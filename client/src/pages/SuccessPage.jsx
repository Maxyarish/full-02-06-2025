import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link,useParams } from 'react-router-dom';
import { updateOrderStatusThunk } from '../store/orderSlice';

const SuccessPage = () => {
    const {idOrder}=useParams()
const dispatch=useDispatch()
useEffect(() => {
  dispatch(updateOrderStatusThunk({id:idOrder,status:'paid'}))
}, [dispatch,idOrder]);
    return (
        <section>
            <h2>Thanks!</h2>
            <Link to='/'>return to show</Link>
        </section>

    );
}

export default SuccessPage;
