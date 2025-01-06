# Vue Sholatku

Vue Sholatku adalah frontend dari website [sholatku.my.id](https://sholatku.my.id), sebuah aplikasi yang bertujuan untuk memudahkan masyarakat Indonesia dalam mengecek jadwal sholat. Aplikasi ini dikembangkan menggunakan **Vue.js** dan **Bootstrap 5** oleh **Faqihuddin Habibi**, dengan lisensi **GNU GPL v3**.

## Fitur Utama
1. **Navigasi Intuitif**: Navbar dengan logo, pencarian lokasi, dan akses login/register.
2. **Jadwal Sholat**: Menampilkan jadwal sholat berdasarkan kota dan tanggal.
3. **Hitung Mundur**: Fitur hitung mundur untuk waktu sholat berikutnya.
4. **Autentikasi Pengguna**: Kemampuan untuk login dan menyimpan preferensi lokasi pengguna.
5. **Pemilihan Lokasi**: Dropdown untuk memilih provinsi dan kota yang diambil dari API `wilayah.id`.

## Teknologi yang Digunakan
### 1. **Vue.js**
Vue.js digunakan sebagai framework utama untuk membangun antarmuka pengguna yang interaktif dan responsif.

### 2. **Bootstrap 5**
Bootstrap 5 menyediakan komponen dan grid sistem untuk tata letak yang konsisten dan mobile-first.

### 3. **Axios**
Digunakan untuk melakukan komunikasi dengan API backend dan API `wilayah.id`.

### 4. **Vite**
Vite digunakan sebagai build tool dan server pengembangan untuk proyek ini.

### 5. **IziToast**
IziToast digunakan untuk menampilkan notifikasi toast yang interaktif.

### 6. **JS Cookie**
JS Cookie digunakan untuk mengelola cookie di aplikasi.

## Cara Menjalankan Proyek
1. Clone repository ini:
   ```bash
   git clone https://github.com/fhabibiii/vue-sholatku.git
   ```
2. Masuk ke direktori proyek:
   ```bash
   cd vue-sholatku
   ```
3. Instal dependensi:
   ```bash
   npm install
   ```
4. Jalankan server pengembangan:
   ```bash
   npm run dev
   ```
5. Akses aplikasi pada `http://localhost:5173`.

## Struktur Proyek
- `src/views/`: Halaman utama aplikasi.
- `src/router/`: Definisi routing aplikasi.
- `src/assets/`: Sumber daya statis seperti gambar dan stylesheet.
- `src/services/`: Konfigurasi API untuk komunikasi dengan backend
- `src/style.css`: Gaya kustom untuk aplikasi.

## Fitur dan Penggunaan
### 1. Navbar
Navbar mencakup:
- **Logo** di sisi kiri.
- **Dropdown pencarian lokasi** untuk memilih provinsi dan kota.
- **Tombol Login/Register** yang membuka modal autentikasi.

### 2. Jadwal Sholat
Menampilkan informasi berikut:
- Kota yang dipilih.
- Jadwal sholat lengkap (Shubuh, Dhuhur, Asharr, Maghrib, Isya).
- Hitung mundur ke waktu sholat berikutnya.

### 3. Autentikasi Pengguna
Pengguna dapat login untuk menyimpan data lokasi secara personal.

### 4. Responsif
Aplikasi dioptimalkan untuk berbagai ukuran layar, dari perangkat mobile hingga desktop.

## Lisensi
Program ini dilisensikan di bawah [GNU General Public License v3.0](https://www.gnu.org/licenses/gpl-3.0.html). Anda bebas untuk menggunakan, memodifikasi, dan mendistribusikan ulang program ini selama mengikuti ketentuan lisensi.

---
Dibuat dengan ❤ oleh **Faqihuddin Habibi** 🍉

