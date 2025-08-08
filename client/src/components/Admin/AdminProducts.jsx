import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductsThunk } from "../../store/productsSlice";
import AdminProductRow from "./AdminProductRow";
import AdminProductsForm from "./AdminProductsForm";

const AdminProducts = () => {
  const dispatch = useDispatch();
  const { products, error } = useSelector((state) => state.products);
  const [isCreating, setIsCreating] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    if (products.length === 0) {
      dispatch(getAllProductsThunk);
    }
  }, [dispatch, products.length]);
  const handleCreate = () => {
    setIsCreating(true);
    setSelectedProduct(null);
  };
  const cancelForm = () => {
    setIsCreating(false);
  };
  const handleUpdate=(product)=>{
    setIsCreating(true);
    setSelectedProduct(product)
  }
  const showProducts = (product) => (
    <AdminProductRow key={product._id} product={product} handleUpdate={handleUpdate} />
  );
  return (
    <section>
      <h2>Products</h2>
      {error && <p>{error}</p>}
      <table>
        <thead>
          <tr>
            <td>title</td>
            <td>description</td>
            <td>price</td>
            <td>stockQty</td>
            <td>category</td>
            <td>isSale</td>
            <td>images</td>
            <th>Update</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>{products.map(showProducts)}</tbody>
      </table>
      <div>
        <button onClick={handleCreate}>create new product</button>
      </div>

      {isCreating && <AdminProductsForm selectedProduct={selectedProduct} cancelForm={cancelForm}/>}
    </section>
  );
};

export default AdminProducts;
