// src/modules/stok_in/StokInView.jsx
import { useState } from "react";
import { createStockIn } from "./stokInService";

export default function StokInView() {
  const [form, setForm] = useState({
    supplier: "",
    items: [{ product_id: "", qty: "" }]
  });

  const submit = async () => {
    await createStockIn({
      ...form,
      items: form.items.map(i => ({
        product_id: Number(i.product_id),
        qty: Number(i.qty)
      }))
    });
    alert("Stok masuk berhasil");
  };

  return (
    <div>
      <h2>Stok Masuk</h2>

      <input
        placeholder="Supplier"
        onChange={(e) => setForm({ ...form, supplier: e.target.value })}
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