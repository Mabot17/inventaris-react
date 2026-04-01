// src/modules/stok_out/StokOutView.jsx
import { useState } from "react";
import { createStockOut } from "./stokOutService";

export default function StokOutView() {
  const [form, setForm] = useState({
    pelanggan: "",
    items: [{ product_id: "", qty: "" }]
  });

  const submit = async () => {
    await createStockOut({
      ...form,
      items: form.items.map(i => ({
        product_id: Number(i.product_id),
        qty: Number(i.qty)
      }))
    });
    alert("Stok keluar berhasil");
  };

  return (
    <div>
      <h2>Stok Keluar</h2>

      <input
        placeholder="Pelanggan"
        onChange={(e) => setForm({ ...form, pelanggan: e.target.value })}
      />

      <input
        placeholder="Product ID"
        onChange={(e) =>
          setForm({
            ...form,
            items: [{ ...form.items[0], product_id: e.target.value }]
          })
        }
      />

      <input
        placeholder="Qty"
        onChange={(e) =>
          setForm({
            ...form,
            items: [{ ...form.items[0], qty: e.target.value }]
          })
        }
      />

      <button onClick={submit}>Submit</button>
    </div>
  );
}