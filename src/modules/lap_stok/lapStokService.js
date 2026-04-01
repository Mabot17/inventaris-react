// src/modules/lap_stok/lapStokService.js
import api from "../../api/axios";

export const getLapStok = (params) =>
  api.get("/lap-stok", { params });

export const exportLapStok = (params) =>
  api.get("/lap-stok/export", {
    params,
    responseType: "blob", // 🔥 WAJIB
  });