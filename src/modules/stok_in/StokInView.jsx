// src/modules/stok_in/StokInView.jsx
import { useEffect, useState } from "react";
import {
  getStockInList,
  createStockIn,
  finishStockIn,
  cancelStockIn,
} from "./stokInService";

export default function StokInView() {
  const [data, setData] = useState([]);
  const [form, setForm] = useState({
    supplier: "",
    items: [{ product_id: "", qty: "" }],
  });

  const load = async () => {
    const res = await getStockInList();
    setData(res.data);
  };

  useEffect(() => {
    load();
  }, []);

  // ======================
  // FORM HANDLER
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
    await createStockIn({
      ...form,
      items: form.items.map((i) => ({
        product_id: Number(i.product_id),
        qty: Number(i.qty),
      })),
    });

    alert("Stok masuk berhasil");

    setForm({
      supplier: "",
      items: [{ product_id: "", qty: "" }],
    });

    load();
  };

  // ======================
  // ACTION
  // ======================

  const handleFinish = async (id) => {
    await finishStockIn(id);
    load();
  };

  const handleCancel = async (id) => {
    await cancelStockIn(id);
    load();
  };

  return (
    <div>
      <h2>Stok Masuk</h2>

      {/* ======================
          FORM CREATE
      ====================== */}
      <div style={{ marginBottom: "20px" }}>
        <input
          placeholder="Supplier"
          value={form.supplier}
          onChange={(e) =>
            setForm({ ...form, supplier: e.target.value })
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
          TABLE LIST
      ====================== */}
      <table border="1" cellPadding="8" style={{ width: "100%" }}>
        <thead style={{ background: "#eee" }}>
          <tr>
            <th>ID</th>
            <th>Supplier</th>
            <th>Status</th>
            <th>Tanggal</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {data.map((d, i) => (
            <tr key={i}>
              <td>{d.id}</td>
              <td>{d.supplier}</td>
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