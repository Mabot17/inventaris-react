// src/modules/lap_stok/LapStokView.jsx
import { useEffect, useState } from "react";
import { getLapStok, exportLapStok } from "./lapStokService";

export default function LapStokView() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [filter, setFilter] = useState({
    product_name: "",
    start_date: "",
    end_date: "",
  });

  const mapData = (items) => {
    return items.map((d) => ({
      productName: d.ProductName,
      sumber: d.Sumber,
      masuk: d.Masuk,
      keluar: d.Keluar,
      saldo: d.Saldo,
      tanggal: new Date(d.Tanggal).toLocaleString(),
    }));
  };

  const load = async () => {
    try {
      setLoading(true);
      const res = await getLapStok(filter);
      setData(mapData(res.data));
    } catch (err) {
      alert("Gagal load data");
    } finally {
      setLoading(false);
    }
  };

  const handleExport = async () => {
    try {
      const res = await exportLapStok(filter);

      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");

      link.href = url;

      // nama file dinamis
      link.setAttribute(
        "download",
        `laporan_stok_${new Date().toISOString()}.xlsx`
      );

      document.body.appendChild(link);
      link.click();

      link.remove();
    } catch (err) {
      alert("Gagal export");
    }
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div>
      <h2>Laporan Stok</h2>

      {/* FILTER */}
      <div style={{ marginBottom: "20px" }}>
        <input
          placeholder="Nama Produk"
          value={filter.product_name}
          onChange={(e) =>
            setFilter({ ...filter, product_name: e.target.value })
          }
        />

        <input
          type="date"
          value={filter.start_date}
          onChange={(e) =>
            setFilter({ ...filter, start_date: e.target.value })
          }
        />

        <input
          type="date"
          value={filter.end_date}
          onChange={(e) =>
            setFilter({ ...filter, end_date: e.target.value })
          }
        />

        <button onClick={load} style={{ marginLeft: "10px" }}>
          Filter
        </button>

          <button
            onClick={handleExport}
            disabled={!data.length}
            style={{ marginLeft: "10px" }}
          >
            Export Excel
          </button>
      </div>

      {/* LOADING */}
      {loading && <p>Loading...</p>}

      {/* TABLE */}
      {!loading && (
        <table style={table}>
          <thead style={{ background: "#f4f4f4" }}>
            <tr>
              <th style={th}>Tanggal</th>
              <th style={th}>Produk</th>
              <th style={th}>Sumber</th>
              <th style={th}>Masuk</th>
              <th style={th}>Keluar</th>
              <th style={th}>Saldo</th>
            </tr>
          </thead>
          <tbody>
            {data.length === 0 && (
              <tr>
                <td colSpan="6" style={empty}>
                  Tidak ada data
                </td>
              </tr>
            )}

            {data.map((d, i) => (
              <tr key={i}>
                <td style={td}>{d.tanggal}</td>
                <td style={td}>{d.productName}</td>
                <td style={td}>{d.sumber}</td>
                <td style={td}>{d.masuk}</td>
                <td style={td}>{d.keluar}</td>
                <td style={td}>{d.saldo}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

const table = {
  width: "100%",
  borderCollapse: "collapse",
};

const th = {
  padding: "8px",
  border: "1px solid #ddd",
  textAlign: "left",
};

const td = {
  padding: "8px",
  border: "1px solid #ddd",
};

const empty = {
  textAlign: "center",
  padding: "10px",
};