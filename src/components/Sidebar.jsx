// src/components/Sidebar.jsx
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div style={{
      width: "200px",
      background: "#f4f4f4",
      height: "100vh",
      padding: "20px"
    }}>
      <h3>Inventaris</h3>
      <ul style={{ listStyle: "none", padding: 0 }}>
        <li><Link to="/produk">Produk</Link></li>
        <li><Link to="/stok-in">Stok In</Link></li>
        <li><Link to="/stok-out">Stok Out</Link></li>
        <li><Link to="/lap-stok">Laporan</Link></li>
      </ul>
    </div>
  );
}