// src/modules/stok_out/StokOutView.jsx
import { useEffect, useState } from "react";
import {
  getStockOutList,
  createStockOut,
  finishStockOut,
  cancelStockOut,
} from "./stokOutService";

export default function StokOutView() {
  const [data, setData] = useState([]);

  const [form, setForm] = useState({
    pelanggan: "",
    items: [{ product_id: "", qty: "" }],
  });

  const load = async () => {
    const res = await getStockOutList();
    setData(res.data);
  };

  useEffect(() => {
    load();
  }, []);

  // ======================
  // FORM
  // ======================

  const addItem = () => {
    setForm({
      ...form,
      items: [...form.items, { product_id: "", qty: "" }],
    });
  };

  const removeItem = (index) => {
    const items = [...form.items];
    items.splice(index, 1);
    setForm({ ...form, items });
  };

  const updateItem = (index, field, value) => {
    const items = [...form.items];
    items[index][field] = value;
    setForm({ ...form, items });
  };

  const submit = async () => {
    await createStockOut({
      ...form,
      items: form.items.map((i) => ({
        product_id: Number(i.product_id),
        qty: Number(i.qty),
      })),
    });

    alert("Stok keluar berhasil");

    setForm({
      pelanggan: "",
      items: [{ product_id: "", qty: "" }],
    });

    load();
  };

  // ======================
  // ACTION
  // ======================

  const handleFinish = async (id) => {
    await finishStockOut(id);
    load();
  };

  const handleCancel = async (id) => {
    await cancelStockOut(id);
    load();
  };

  return (
    <div>
      <h2>Stok Keluar</h2>

      {/* ======================
          FORM
      ====================== */}
      <div style={{ marginBottom: "20px" }}>
        <input
          placeholder="Pelanggan"
          value={form.pelanggan}
          onChange={(e) =>
            setForm({ ...form, pelanggan: e.target.value })
          }
        />

        <h4>Items</h4>

        {form.items.map((item, i) => (
          <div key={i} style={{ marginBottom: "5px" }}>
            <input
              placeholder="Product ID"
              value={item.product_id}
              onChange={(e) =>
                updateItem(i, "product_id", e.target.value)
              }
            />

            <input
              placeholder="Qty"
              value={item.qty}
              onChange={(e) =>
                updateItem(i, "qty", e.target.value)
              }
            />

            <button onClick={() => removeItem(i)}>X</button>
          </div>
        ))}

        <button onClick={addItem}>+ Tambah Item</button>

        <br /><br />

        <button onClick={submit}>Submit</button>
      </div>

      {/* ======================
          TABLE
      ====================== */}
      <table border="1" cellPadding="8" style={{ width: "100%" }}>
        <thead style={{ background: "#eee" }}>
          <tr>
            <th>ID</th>
            <th>Pelanggan</th>
            <th>Status</th>
            <th>Tanggal</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {data.map((d, i) => (
            <tr key={i}>
              <td>{d.id}</td>
              <td>{d.pelanggan}</td>
              <td>{d.status}</td>
              <td>{d.created_at}</td>
              <td>
                {d.status === "CREATED" && (
                  <>
                    <button onClick={() => handleFinish(d.id)}>
                      Finish
                    </button>

                    <button
                      onClick={() => handleCancel(d.id)}
                      style={{ marginLeft: "5px" }}
                    >
                      Cancel
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}