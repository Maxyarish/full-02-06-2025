import React from 'react';
import { Link } from 'react-router-dom';

const CancelPge = () => {
    return (
        <section>
            <h2>payment canceled</h2>
            <Link to='/'>return to show</Link>
        </section>
    );
}

export default CancelPge;
