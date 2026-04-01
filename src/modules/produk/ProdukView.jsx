// src/modules/produk/ProdukView.jsx
import { useEffect, useState } from "react";
import { getProducts, createProduct } from "./produkService";

export default function ProdukView() {
  const [data, setData] = useState([]);
  const [form, setForm] = useState({ name: "", sku: "" });

  const load = async () => {
    const res = await getProducts();
    setData(res.data);
  };

  const submit = async () => {
    await createProduct(form);
    setForm({ name: "", sku: "" });
    load();
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div>
      <h2>Produk</h2>

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
      <button onClick={submit}>Tambah</button>

      <ul>
        {data.map((item) => (
          <li key={item.id}>
            {item.name} - {item.sku}
          </li>
        ))}
      </ul>
    </div>
  );
}