import React, { useState, useEffect } from "react";
import { deleteCategoryThunk, getAllCategoriesThunk } from "../../store/categoriesSlice";
import { useDispatch, useSelector } from "react-redux";
import AdminCategoriesForm from "./AdminCategoriesForm";

const CategoryRow = (props) => {
  const dispatch=useDispatch();
  const { category,handleUpdate } = props;
  const handleDelete=(id)=>{
    dispatch(deleteCategoryThunk(id))
  }
  return (
    <tr>
      <td>{category.name}</td>
      <td>
        <button onClick={() => {handleUpdate(category)}}>update</button>
      </td>
      <td>
        <button onClick={() => {handleDelete(category._id)}}>delete</button>
      </td>
    </tr>
  );
};

const AdminCategories = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const dispatch = useDispatch();
  const { categories,error } = useSelector((state) => state.categories);
  useEffect(() => {
    if (categories?.length === 0) {
      dispatch(getAllCategoriesThunk());
    }
  }, [dispatch, categories?.length]);
  const showCategory = (category) => (
    <CategoryRow
      key={category._id}
      category={category}
      handleUpdate={handleUpdate}
    />
  );
  const handleCreate = () => {
    setIsCreating(true);
  };
    
  const cancelForm = () => {
    setIsCreating(false);
  };
  const handleUpdate = (category) => {
    setIsCreating(true);
    setSelectedCategory(category);
  }

  return (
    <section>
      {error && error.includes('409') && <p>Error! Category has products</p>}
      <h1>Admin Categories</h1>
      <button onClick={handleCreate}>create new category</button>
      {isCreating && (
        <AdminCategoriesForm
          cancelForm={cancelForm}
          selectedCategory={selectedCategory}
        />
      )}
      <table>
        <tbody>{categories.map(showCategory)}</tbody>
      </table>
    </section>
  );
};

export default AdminCategories;
