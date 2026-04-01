// src/modules/lap_stok/LapStokView.jsx
import { useState } from "react";
import { getLapStok } from "./lapStokService";

export default function LapStokView() {
  const [data, setData] = useState([]);

  const load = async () => {
    const res = await getLapStok({});
    setData(res.data);
  };

  return (
    <div>
      <h2>Laporan Stok</h2>
      <button onClick={load}>Load</button>

      <table border="1">
        <thead>
          <tr>
            <th>Produk</th>
            <th>Masuk</th>
            <th>Keluar</th>
            <th>Saldo</th>
          </tr>
        </thead>
        <tbody>
          {data.map((d, i) => (
            <tr key={i}>
              <td>{d.productName}</td>
              <td>{d.masuk}</td>
              <td>{d.keluar}</td>
              <td>{d.saldo}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}