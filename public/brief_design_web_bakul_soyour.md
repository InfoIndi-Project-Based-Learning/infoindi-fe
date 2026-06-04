# Brief Design Website — Bakul Soyour

## 1. Gambaran Umum

**Bakul Soyour** adalah website katalog/informasi produk sayuran yang membantu pengunjung melihat jenis-jenis sayuran, informasi produk, harga, resep, serta kontak toko. Website ini juga memiliki fitur login menggunakan akun Google dan navigasi yang sederhana agar user mudah kembali ke halaman beranda maupun berpindah antar bagian.

Website dibuat dengan nuansa segar, bersih, ramah, dan natural sesuai karakter produk sayuran.

---

## 2. Tujuan Website

- Mengenalkan brand **Bakul Soyour** kepada pengunjung.
- Menampilkan informasi produk sayuran secara rapi dan mudah dicari.
- Memberikan detail produk seperti harga, informasi produk, dan resep.
- Memudahkan pengunjung menghubungi toko melalui Instagram, WhatsApp, dan Facebook.
- Menyediakan halaman/fitur login menggunakan akun Google.
- Menampilkan informasi toko dan cerita perjalanan brand.

---

## 3. Target Pengguna

- Pembeli sayuran harian.
- Ibu rumah tangga atau keluarga yang mencari bahan masakan.
- Pengguna yang ingin tahu harga dan informasi sayuran sebelum membeli.
- Pengguna yang mencari inspirasi resep berbasis sayuran.
- Calon pelanggan yang ingin menghubungi toko secara cepat.

---

## 4. Sitemap Website

```text
WEB BAKUL SOYOUR
├── Navigasi Bar
│   ├── Logo
│   │   └── Screen Pop Up Logo
│   │       └── Back to Beranda
│   ├── Login App
│   │   └── Login Asset by Google
│   ├── Beranda
│   │   └── Our Product
│   │       ├── Price
│   │       ├── Information Product
│   │       └── Recipe
│   ├── Fitur
│   ├── Layanan
│   │   └── Jenis-jenis Sayuran dan Informasi Sayuran
│   └── Kontak
│       └── Kontak Person
│           ├── Instagram
│           ├── WhatsApp
│           └── Facebook
│
├── Hero
│   ├── Tagline
│   ├── Hero Image
│   └── Logo
│
├── Layanan
│   └── Jenis-jenis Sayuran dan Informasi Sayuran
│
├── Searching Pad
│   └── Jenis-jenis Sayuran
│
├── Kontak
│   ├── Instagram
│   ├── WhatsApp
│   ├── Facebook
│   └── Alamat
│
└── Tentang Kami
    ├── Informasi Toko
    └── Story Perjalanan
```

---

## 5. Struktur Halaman

### 5.1 Beranda / Homepage

Halaman utama yang menjadi pintu masuk website.

**Konten utama:**

- Navbar dengan logo, menu, dan tombol login.
- Hero section berisi tagline, logo, dan gambar utama.
- Preview produk sayuran.
- Highlight layanan atau fitur utama.
- Section pencarian jenis sayuran.
- Section kontak singkat.
- Section tentang kami singkat.

**Tujuan desain:**

- Memberikan kesan segar, bersih, dan terpercaya.
- Pengunjung langsung paham bahwa website ini berisi informasi produk sayuran.
- Call-to-action diarahkan ke pencarian produk, kontak WhatsApp, atau katalog produk.

---

### 5.2 Navigasi Bar

Navbar harus selalu mudah diakses dan sederhana.

**Menu navbar:**

- Logo
- Beranda
- Fitur
- Layanan
- Kontak
- Login App

**Behavior:**

- Logo dapat diklik dan menampilkan screen pop-up logo.
- Di dalam pop-up logo terdapat tombol **Back to Beranda**.
- Menu Beranda mengarah ke halaman/section utama.
- Menu Layanan mengarah ke informasi jenis-jenis sayuran.
- Menu Kontak mengarah ke kontak person dan sosial media.
- Login menggunakan button dengan asset Google.

**Mobile behavior:**

- Navbar berubah menjadi hamburger menu.
- Menu muncul sebagai dropdown atau side drawer.
- Tombol login tetap mudah ditemukan.

---

### 5.3 Hero Section

Hero adalah bagian pertama yang dilihat user.

**Elemen:**

- Logo Bakul Soyour.
- Tagline singkat.
- Hero image bertema sayuran segar.

**Contoh tagline:**

> Sayur segar, informasi lengkap, belanja jadi lebih mudah.

**Arahan visual:**

- Gunakan foto sayuran segar atau ilustrasi marketplace sayur.
- Warna dominan hijau, putih, dan aksen kuning/oranye.
- Layout hero bisa dibuat 2 kolom: teks di kiri, gambar di kanan.

**CTA yang disarankan:**

- Lihat Produk
- Cari Sayuran
- Hubungi Kami

---

### 5.4 Layanan

Section ini menjelaskan layanan utama website.

**Konten:**

- Jenis-jenis sayuran.
- Informasi setiap sayuran.
- Manfaat atau deskripsi singkat produk.

**Tampilan yang disarankan:**

- Card grid berisi daftar sayuran.
- Setiap card memiliki gambar, nama sayuran, deskripsi singkat, dan tombol detail.
- Gunakan icon sederhana untuk memperjelas kategori.

---

### 5.5 Searching Pad

Fitur pencarian untuk mencari jenis-jenis sayuran.

**Elemen:**

- Search input.
- Filter kategori opsional.
- Hasil pencarian berupa card/list.

**Behavior:**

- User dapat mengetik nama sayuran.
- Website menampilkan hasil yang sesuai.
- Jika data tidak ditemukan, tampilkan empty state yang ramah.

**Contoh empty state:**

> Sayuran yang kamu cari belum tersedia.

---

### 5.6 Our Product

Bagian ini dapat ditaruh di halaman Beranda atau menjadi halaman/section detail produk.

**Informasi produk:**

- Nama produk.
- Gambar produk.
- Harga.
- Informasi produk.
- Resep yang berhubungan dengan produk.

**Tampilan detail produk:**

```text
Nama Sayuran
Gambar Sayuran
Harga
Deskripsi / Informasi Produk
Rekomendasi Resep
Tombol Hubungi / Pesan via WhatsApp
```

**Catatan desain:**

- Harga harus mudah terlihat.
- Informasi produk jangan terlalu panjang di card; detail lengkap bisa ditampilkan di halaman detail/modal.
- Resep bisa ditampilkan sebagai badge, list kecil, atau tab tambahan.

---

### 5.7 Kontak

Section kontak harus cepat diakses karena website kemungkinan digunakan untuk mendorong user menghubungi toko.

**Konten:**

- Instagram
- WhatsApp
- Facebook
- Alamat

**Tampilan yang disarankan:**

- Card kontak atau list icon.
- Tombol WhatsApp dibuat paling menonjol.
- Alamat dapat dilengkapi embed map jika diperlukan.

**CTA:**

- Chat via WhatsApp
- Lihat Instagram
- Buka Facebook

---

### 5.8 Tentang Kami

Bagian ini menjelaskan identitas toko dan cerita brand.

**Konten:**

- Informasi toko.
- Story perjalanan Bakul Soyour.

**Tone copywriting:**

- Hangat.
- Ramah.
- Lokal dan dekat dengan pelanggan.
- Tidak terlalu formal.

**Contoh isi singkat:**

> Bakul Soyour hadir untuk memudahkan pelanggan mendapatkan informasi sayuran segar, lengkap dengan harga, manfaat, dan inspirasi resep harian.

---

### 5.9 Login App

Login menggunakan Google.

**Elemen:**

- Tombol login Google.
- Asset/logo Google.
- State setelah login.

**Behavior yang disarankan:**

- User klik tombol **Login with Google**.
- Sistem mengarahkan ke autentikasi Google.
- Setelah berhasil login, user diarahkan kembali ke Beranda atau Dashboard sederhana.

---

## 6. Arahan Visual Design

### 6.1 Mood & Feel

- Fresh
- Clean
- Friendly
- Natural
- Simple
- Easy to navigate

### 6.2 Warna Utama

| Elemen | Warna yang Disarankan |
|---|---|
| Primary | Hijau segar |
| Background | Putih / off-white |
| Accent | Kuning atau oranye lembut |
| Text utama | Abu gelap / hitam lembut |
| Card background | Putih dengan shadow halus |

### 6.3 Tipografi

Gunakan font yang mudah dibaca dan modern.

**Rekomendasi:**

- Poppins
- Inter
- Nunito
- Plus Jakarta Sans

### 6.4 Komponen UI

- Navbar sticky.
- Button rounded.
- Product card.
- Search input.
- Contact card.
- Modal/pop-up logo.
- Footer dengan sosial media.

---

## 7. Layout Rekomendasi

### Desktop

```text
Navbar
Hero Section
Layanan / Kategori Sayuran
Searching Pad
Our Product / Produk Unggulan
Tentang Kami
Kontak
Footer
```

### Mobile

```text
Navbar Mobile
Hero Section
Search Sayuran
Kategori / Layanan
Produk
Tentang Kami
Kontak
Footer
```

---

## 8. Fitur Utama yang Perlu Dibuat

### Wajib

- Navbar responsive.
- Hero section.
- Section layanan.
- Search jenis sayuran.
- Product card.
- Detail produk berisi harga, informasi produk, dan resep.
- Kontak sosial media.
- Tentang kami.
- Login Google.
- Pop-up logo dengan tombol kembali ke Beranda.

### Opsional

- Filter kategori sayuran.
- Halaman detail produk.
- Embed Google Maps.
- Favorite product setelah login.
- Dashboard admin untuk mengelola produk.
- Animasi ringan saat scroll.

---

## 9. Copywriting Awal

### Headline Hero

> Temukan Sayuran Segar dengan Informasi Lengkap

### Subheadline

> Bakul Soyour membantu kamu mengenal jenis sayuran, melihat harga, membaca informasi produk, dan menemukan inspirasi resep harian.

### CTA

- Lihat Produk
- Cari Sayuran
- Hubungi Kami

### Section Layanan

> Kami menyediakan informasi berbagai jenis sayuran agar kamu lebih mudah memilih bahan terbaik untuk kebutuhan harian.

### Section Kontak

> Butuh informasi lebih lanjut? Hubungi Bakul Soyour melalui WhatsApp atau sosial media kami.

---

## 10. User Flow

### Flow Pengunjung Umum

```text
Masuk Website
→ Melihat Hero
→ Membuka Layanan / Produk
→ Mencari Jenis Sayuran
→ Melihat Detail Produk
→ Menghubungi Kontak / WhatsApp
```

### Flow Login

```text
Klik Login App
→ Login dengan Google
→ Berhasil Login
→ Kembali ke Beranda / Dashboard
```

### Flow Detail Produk

```text
Klik Produk
→ Melihat Harga
→ Membaca Informasi Produk
→ Melihat Resep
→ Hubungi / Pesan
```

---

## 11. Catatan UX

- Jangan membuat navigasi terlalu ramai.
- Pencarian sayuran sebaiknya terlihat jelas di halaman utama.
- WhatsApp harus mudah ditemukan karena kemungkinan menjadi channel utama transaksi.
- Gunakan gambar sayuran yang konsisten secara style.
- Card produk harus punya hierarchy jelas: gambar, nama, harga, deskripsi singkat, tombol detail.
- Untuk mobile, prioritaskan search dan kontak.

---

## 12. Deliverable Design

Desainer diharapkan membuat:

- Wireframe desktop.
- Wireframe mobile.
- High-fidelity design desktop.
- High-fidelity design mobile.
- UI component set:
  - Navbar
  - Button
  - Product card
  - Search input
  - Contact card
  - Modal logo
  - Footer
- Prototype flow:
  - Beranda ke detail produk
  - Search sayuran
  - Login Google
  - Pop-up logo back to Beranda

---

## 13. Referensi Struktur Konten per Section

### Navbar

```text
Logo | Beranda | Fitur | Layanan | Kontak | Login with Google
```

### Hero

```text
Logo
Headline
Subheadline
CTA
Hero Image
```

### Layanan

```text
Judul Section
Deskripsi Singkat
Card Jenis Sayuran
```

### Searching Pad

```text
Search Input
Filter Opsional
Hasil Pencarian
```

### Produk

```text
Product Card
- Gambar
- Nama
- Harga
- Informasi singkat
- Tombol detail
```

### Kontak

```text
Instagram
WhatsApp
Facebook
Alamat
```

### Tentang Kami

```text
Informasi Toko
Story Perjalanan
```

---

## 14. Prioritas Pengerjaan

1. Buat layout homepage terlebih dahulu.
2. Buat navbar dan hero section.
3. Buat card produk dan section layanan.
4. Buat searching pad.
5. Buat section kontak dan tentang kami.
6. Tambahkan login Google.
7. Tambahkan pop-up logo.
8. Rapikan responsive design mobile.

---

## 15. Ringkasan Konsep

Website **Bakul Soyour** adalah website informasi dan katalog sayuran yang sederhana, segar, dan mudah digunakan. Fokus utama desain adalah membantu user menemukan informasi sayuran, melihat harga, membaca detail produk, menemukan resep, dan menghubungi toko dengan cepat.
