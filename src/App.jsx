// src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";

import ProdukView from "./modules/produk/ProdukView";
import StokInView from "./modules/stok_in/StokInView";
import StokOutView from "./modules/stok_out/StokOutView";
import LapStokView from "./modules/lap_stok/LapStokView";

function Layout({ children }) {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div style={{ padding: "20px", flex: 1 }}>
        {children}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/produk" element={<ProdukView />} />
          <Route path="/stok-in" element={<StokInView />} />
          <Route path="/stok-out" element={<StokOutView />} />
          <Route path="/lap-stok" element={<LapStokView />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}