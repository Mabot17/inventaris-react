// src/modules/stok_out/stokOutService.js
import api from "../../api/axios";

export const getStockOutList = () => api.get("/stock-out");
export const getStockOutDetail = (id) => api.get(`/stock-out/${id}`);

export const createStockOut = (data) =>
  api.post("/stock-out", data);

export const finishStockOut = (id) =>
  api.post(`/stock-out/${id}/finish`);

export const cancelStockOut = (id) =>
  api.post(`/stock-out/${id}/cancel`);