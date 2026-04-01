// src/modules/stok_in/stokInService.js
import api from "../../api/axios";

export const createStockIn = (data) => api.post("/stock-in", data);