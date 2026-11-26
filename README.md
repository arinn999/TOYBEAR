# 🧸 BonekaKu - Website E-Commerce Toko Boneka

**BonekaKu** adalah aplikasi web toko online sederhana yang menjual berbagai jenis boneka lucu. Proyek ini dibangun menggunakan **HTML5**, **CSS3**, dan **Vanilla JavaScript** tanpa framework tambahan.

## ✨ Fitur Utama
- **Katalog Produk:** Menampilkan daftar boneka lengkap dengan gambar, deskripsi, dan harga dalam format Rupiah (IDR).
- **Sistem Autentikasi (Login & Logout):** Pengguna dapat masuk menggunakan nama pengguna dan kata sandi. Status login tersimpan otomatis di `localStorage`.
- **Keranjang Belanja Interaktif:**
  - Menambahkan produk ke keranjang.
  - Menambah atau mengurangi kuantitas (`+` / `-`) produk.
  - Menghapus produk dari keranjang.
  - Kalkulasi total harga secara *real-time*.
- **Validasi Pembelian (Checkout):** Pengguna wajib login sebelum dapat menyelesaikan transaksi pembelian.

## 📁 Struktur Proyek
```text
toko-boneka/
├── index.html   # Struktur halaman utama, modal login, dan modal keranjang
├── style.css    # Styling tampilan responsif, kartu produk, dan animasi
├── script.js    # Logika data produk, manajemen keranjang, login, dan checkout
└── README.md    # Dokumentasi proyek
