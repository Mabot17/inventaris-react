# 🎨 inventaris-web (Frontend)

Frontend untuk sistem inventaris berbasis **React + Vite + Yarn**.
Berfungsi sebagai antarmuka interaktif untuk mengelola produk, stok masuk, stok keluar, dan laporan.

---

## 🧠 Konsep Dasar

Frontend ini dibangun dengan prinsip:

* **Modular View** → 1 modul = 1 view + 1 service
* **Separation UI & API** → logic API dipisah di service
* **Simple but scalable** → ringan tapi siap berkembang

---

## 📁 Struktur Project

```bash
src/
│
├── api/
│   └── axios.js          # konfigurasi base API
│
├── components/
│   └── Sidebar.jsx       # navigasi utama
│
├── modules/
│   ├── produk/
│   │   ├── ProdukView.jsx
│   │   └── produkService.js
│   │
│   ├── stok_in/
│   │   ├── StokInView.jsx
│   │   └── stokInService.js
│   │
│   ├── stok_out/
│   │   ├── StokOutView.jsx
│   │   └── stokOutService.js
│   │
│   ├── lap_stok/
│   │   ├── LapStokView.jsx
│   │   └── lapStokService.js
│
├── App.jsx               # routing utama
├── main.jsx              # entry point
└── styles.css           # global styling
```

---

## ⚙️ Instalasi & Menjalankan

### 1. Install dependency

```bash
yarn
```

### 2. Jalankan project

```bash
yarn dev
```

### 3. Akses di browser

```bash
http://localhost:5173
```

---

## 🔌 Konfigurasi API

File:

```bash
src/api/axios.js
```

Contoh:

```js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8002/api",
});

export default api;
```

---

## 📦 Modul Utama

### 📦 Produk

* CRUD produk
* Input nama & SKU
* Tabel data produk

---

### 📥 Stok Masuk

* Create transaksi dengan multi item
* Finish / Cancel transaksi
* List transaksi

---

### 📤 Stok Keluar

* Create (reserve stok)
* Finish (kurangi stok)
* Cancel (rollback)
* Multi item support

---

### 📊 Laporan Stok

* Filter berdasarkan produk & tanggal
* Tabel laporan
* Export ke Excel

---

## 🧭 Navigasi

Sidebar sebagai pusat navigasi:

```text
Produk → Stok Masuk → Stok Keluar → Laporan
```

---

## 🎨 Styling

* Global style di `styles.css`
* Warna cerah & clean
* Table sudah dioptimasi readability
* Sidebar aktif & hover effect

---

## 🔥 Fitur Utama

* Multi item input (stok in/out)
* Status transaksi (CREATED, DONE, CANCEL)
* Table interaktif
* Export laporan
* Modular architecture

---

## ⚠️ Catatan Penting

* Pastikan backend berjalan di:

```bash
http://localhost:8002
```

* Jika terkena CORS:

  * gunakan proxy Vite
  * atau aktifkan CORS di backend

---

## 🔄 Flow Sistem

```text
Produk → Stok Masuk → Stok Keluar → Laporan
```

Frontend ini bertugas sebagai:

* 🧭 navigator sistem
* 👁️ visualisasi data
* 🎛️ kontrol interaksi user

---

## 🌿 Filosofi

Frontend ini bukan hanya UI…

tetapi:

> cara manusia memahami aliran data dalam sistem

* Input → aksi
* Table → observasi
* Laporan → refleksi

---

## 🚀 Next Improvement

* Dropdown produk (tidak pakai ID manual)
* Validasi stok realtime
* Dashboard (chart + statistik)
* Dark / Light mode toggle
* Pagination & search

---

## 🤝 Penutup

Project ini dirancang untuk berkembang:

dari UI sederhana → menjadi **dashboard operasional nyata**

---

**inventaris-web — wajah dari aliran sistem yang kamu bangun.**
