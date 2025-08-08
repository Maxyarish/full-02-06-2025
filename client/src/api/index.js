import axios from "axios";
import CONSTANTS from "../constants";

const apiClient = axios.create({
  baseURL: CONSTANTS.BASE_URL,
});
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const createOrder = (values) => apiClient.post("/orders", values);
export const createCheckoutSession = (id, products) =>
  apiClient.post("/orders/create-checkout-session", { id, products });
export const updateOrderStatus = (id, status) =>
  apiClient.patch(`/orders/${id}`, { status });
export const getOrderForAdmin=()=>apiClient.get('/orders')
export const registerUser = (values) =>
  apiClient.post("/users/register", values);
export const loginUser = (values) => apiClient.post("/users/login", values);
export const getAccount = () => apiClient.get("/users/account");
export const getAllCategories = () => apiClient.get("/categories");
export const createCategory = (values) => apiClient.post("/categories", values);
export const updateCategory = (id, values) =>
  apiClient.patch(`/categories/${id}`, values);
export const deleteCategory = (id) => apiClient.delete(`/categories/${id}`);
export const getAllProducts = () => apiClient.get("/products");
export const getOneProduct=(id)=>apiClient.get(`/products/${id}`)
export const createProduct = (values) => apiClient.post("/products", values);
export const updateProduct = (id, values) =>
  apiClient.patch(`/products/${id}`, values);
export const deleteProduct = (id) => apiClient.delete(`/products/${id}`);
