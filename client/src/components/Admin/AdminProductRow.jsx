import React from "react";
import CONSTANTS from "../../constants";
import { useDispatch } from "react-redux";
import { deleteProductThunk } from "../../store/productsSlice";


const AdminProductRow = (props) => {
   const dispatch=useDispatch()
    const {product,handleUpdate}=props;
    const {_id,title,description,price,stockQty,category,isSale,images}=product;
     const showImages=(img,i)=><img key={i} src={`${CONSTANTS.BASE_URL}/${CONSTANTS.UPLOAD_FOLDER}/${img}`} alt={title}/>
     const handleDelete=(id)=>{
        dispatch(deleteProductThunk(id))
     }
  return (
   
    <tr>
      <td>{title}</td>
      <td>{description}</td>
      <td>{price}</td>
      <td>{stockQty}</td>
      <td>{category?.name}</td>
      <td>{isSale?'yes':'no'}</td>
      <td>{images.map(showImages)}</td>
       <td><button onClick={()=>{handleUpdate(product)}}> Update</button></td>
       <td><button onClick={()=>{handleDelete(_id)}}>Delete</button></td>
     
    </tr>
   
  );
};

export default AdminProductRow;
