// src/modules/produk/ProdukView.jsx
import { useEffect, useState } from "react";
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "./produkService";

export default function ProdukView() {
  const [data, setData] = useState([]);
  const [form, setForm] = useState({ name: "", sku: "" });
  const [editId, setEditId] = useState(null);

  const load = async () => {
    const res = await getProducts();
    setData(res.data);
  };

  const resetForm = () => {
    setForm({ name: "", sku: "" });
    setEditId(null);
  };

  const submit = async () => {
    if (!form.name || !form.sku) return alert("Isi semua field");

    if (editId) {
      await updateProduct(editId, form);
    } else {
      await createProduct(form);
    }

    resetForm();
    load();
  };

  const edit = (item) => {
    setForm({ name: item.name, sku: item.sku });
    setEditId(item.id);
  };

  const remove = async (id) => {
    if (!confirm("Yakin hapus?")) return;
    await deleteProduct(id);
    load();
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div>
      <h2>Produk</h2>

      {/* FORM */}
      <div style={{ marginBottom: "20px" }}>
        <input
          placeholder="Nama"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          placeholder="SKU"
          value={form.sku}
          onChange={(e) => setForm({ ...form, sku: e.target.value })}
        />
        <button onClick={submit}>
          {editId ? "Update" : "Tambah"}
        </button>

        {editId && (
          <button onClick={resetForm} style={{ marginLeft: "10px" }}>
            Batal
          </button>
        )}
      </div>

      {/* TABLE */}
      <table border="1" cellPadding="8" style={{ width: "100%" }}>
        <thead style={{ background: "#eee" }}>
          <tr>
            <th>ID</th>
            <th>Nama</th>
            <th>SKU</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.sku}</td>
              <td>
                <button onClick={() => edit(item)}>Edit</button>
                <button
                  onClick={() => remove(item.id)}
                  style={{ marginLeft: "5px" }}
                >
                  Hapus
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}