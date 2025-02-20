# AutoMindMap Frontend

Aplikasi React & TypeScript yang mengubah teks menjadi mind map interaktif. Cocok untuk brainstorming, merangkum informasi, dan mempercepat pemahaman konten.

## Fitur
- **Input Teks & Ekstraksi**: Memasukkan teks secara langsung dan menampilkannya sebagai mind map.
- **Visualisasi Interaktif**: D3.js untuk drag, zoom, dan penyesuaian posisi node.
- **Struktur Modular**: React TypeScript dengan komponen yang terorganisir, memudahkan pengembangan dan pemeliharaan.

## Prasyarat
- Node.js (disarankan versi LTS)
- npm atau yarn (untuk instalasi dependensi)

## Instalasi
### Kloning repositori:
```bash
git clone https://github.com/username/AutoMindMap-FE.git
```

### Masuk ke direktori proyek:
```bash
cd AutoMindMap-FE
```

### Instal dependensi:
```bash
npm install
```
atau
```bash
yarn
```

## Konfigurasi
Secara default, aplikasi mengakses API di `http://localhost:8000/process`.

Jika Anda ingin mengubahnya, buka file `App.tsx` dan sesuaikan URL di `axios.post`.

## Menjalankan Aplikasi
### Jalankan server pengembangan:
```bash
npm start
```
atau
```bash
yarn start
```

Buka [http://localhost:3000](http://localhost:3000) di peramban untuk melihat aplikasi.

## Struktur Direktori
```
.
├── public/                # File statis (favicon, index.html)
├── src/
│   ├── components/
│   │   └── MindMap.tsx   # Komponen visualisasi mind map
│   ├── App.tsx           # Komponen utama (input teks, fetch data)
│   ├── index.tsx         # Entry point React
│   ├── types.d.ts        # Definisi tipe data TypeScript
│   └── ... (file lainnya)
├── package.json
└── tsconfig.json
```

## Penggunaan
1. Masukkan teks di kolom yang disediakan.
2. Klik "Proses Teks" untuk mengirimkan data ke backend dan mendapatkan struktur mind map.
3. Jelajahi mind map:
   - Drag node untuk memindahkan posisi.
   - Gunakan scroll (jika diimplementasikan zoom) untuk memperbesar/memperkecil tampilan.

## Pengembangan Lebih Lanjut
- **Kustomisasi Warna & Ukuran Node**: Sesuaikan di `MindMap.tsx`.
- **Tambah Fitur Zoom & Pan**: Gunakan `d3.zoom`.
- **Integrasi State Management**: Pilih Redux/Zustand jika dibutuhkan.

## Kontribusi
1. Fork repositori ini.
2. Buat branch baru untuk setiap fitur/perbaikan.
3. Lakukan pull request dengan deskripsi perubahan.

## Lisensi
Proyek ini dilisensikan di bawah **MIT License**. Silakan gunakan, modifikasi, dan bagikan sesuai ketentuan lisensi.

