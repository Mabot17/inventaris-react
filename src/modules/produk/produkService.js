// src/modules/produk/produkService.js
import api from "../../api/axios";

export const getProducts = () => api.get("/products");
export const createProduct = (data) => api.post("/products", data);