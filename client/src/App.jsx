import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAccountThunk } from "./store/authSlice";
import HomePage from "./pages/HomePage";
import Header from "./components/Header/Header";
import ErrorPage from "./pages/ErrorPage";
import LoginForm from "./components/Auth/LoginForm";
import RegisterForm from "./components/Auth/RegisterForm";
import AdminPage from "./pages/AdminPage";
import AdminCategories from "./components/Admin/AdminCategories";
import AdminProducts from "./components/Admin/AdminProducts";

function App() {
  const dispatch = useDispatch();
  const { user, isLoading, error } = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(getAccountThunk());
  }, [dispatch]);
  return (
    <>
      {error && <p>Error: {error}</p>}
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route
            path="/admin-panel"
            element={
              user?.role === "admin" ? <AdminPage /> : <Navigate to="/" />
            }
          >
            <Route
              path="/admin-panel/categories"
              element={
                user?.role === "admin" ? (
                  <AdminCategories />
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route
              path="/admin-panel/products"
              element={
                user?.role === "admin" ? <AdminProducts /> : <Navigate to="/" />
              }
            />
          
          </Route>

          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
