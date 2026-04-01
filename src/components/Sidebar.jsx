// src/components/Sidebar.jsx
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const menus = [
    { name: "Produk", path: "/produk", icon: "📦" },
    { name: "Stok Masuk", path: "/stok-in", icon: "📥" },
    { name: "Stok Keluar", path: "/stok-out", icon: "📤" },
    { name: "Laporan", path: "/lap-stok", icon: "📊" },
  ];

  return (
    <div className="sidebar">
      <h2 className="sidebar-title">Inventaris</h2>

      <div className="sidebar-menu">
        {menus.map((m, i) => (
          <NavLink
            key={i}
            to={m.path}
            className={({ isActive }) =>
              isActive ? "menu-item active" : "menu-item"
            }
          >
            <span className="icon">{m.icon}</span>
            <span>{m.name}</span>
          </NavLink>
        ))}
      </div>
    </div>
  );
}