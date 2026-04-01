// src/modules/stok_in/stokInService.js
import api from "../../api/axios";

export const getStockInList = () => api.get("/stock-in");
export const getStockInDetail = (id) => api.get(`/stock-in/${id}`);
export const createStockIn = (data) => api.post("/stock-in", data);
export const finishStockIn = (id) => api.post(`/stock-in/${id}/finish`);
export const cancelStockIn = (id) => api.post(`/stock-in/${id}/cancel`);