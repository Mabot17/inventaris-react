// src/modules/stok_out/stokOutService.js
import api from "../../api/axios";

export const createStockOut = (data) => api.post("/stock-out", data);