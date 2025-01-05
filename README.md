# Vue Sholatku

Vue Sholatku adalah frontend dari website [sholatku.my.id](https://sholatku.my.id), sebuah aplikasi yang bertujuan untuk memudahkan masyarakat Indonesia dalam mengecek jadwal sholat. Aplikasi ini dikembangkan menggunakan **Vue.js** dan **Bootstrap 5** oleh **Faqihuddin Habibi**, dengan lisensi **GNU GPL v3**.

## Fitur Utama
1. **Navigasi Intuitif**: Navbar dengan logo, pencarian lokasi, dan akses login/register.
2. **Jadwal Sholat**: Menampilkan jadwal sholat berdasarkan kota dan tanggal.
3. **Hitung Mundur**: Fitur hitung mundur untuk waktu sholat berikutnya.
4. **Autentikasi Pengguna**: Kemampuan untuk login dan menyimpan preferensi lokasi pengguna.

## Teknologi yang Digunakan
### 1. **Vue.js**
Vue.js digunakan sebagai framework utama untuk membangun antarmuka pengguna yang interaktif dan responsif.

### 2. **Bootstrap 5**
Bootstrap 5 menyediakan komponen dan grid sistem untuk tata letak yang konsisten dan mobile-first.

### 3. **Axios**
Digunakan untuk melakukan komunikasi dengan API backend.

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
4. Pastikan backend sudah berjalan. Untuk menjalankan backend, ikuti petunjuk pada [repository Express Sholatku](https://github.com/fhabibiii/express-sholatku).
5. Jalankan server pengembangan:
   ```bash
   npm run serve
   ```
6. Akses aplikasi pada `http://localhost:8080`.

## Struktur Proyek
- `src/components/`: Komponen Vue yang dapat digunakan kembali.
- `src/views/`: Halaman utama aplikasi.
- `src/router/`: Definisi routing aplikasi.
- `src/assets/`: Sumber daya statis seperti gambar dan stylesheet.
- `src/store/`: State management menggunakan Vuex (jika digunakan).

## Fitur dan Penggunaan
### 1. Navbar
Navbar mencakup:
- **Logo** di sisi kiri.
- **Dropdown pencarian lokasi** untuk memilih kota atau distrik.
- **Tombol Login/Register** yang membuka modal autentikasi.

### 2. Jadwal Sholat
Menampilkan informasi berikut:
- Kota yang dipilih.
- Jadwal sholat lengkap (Shubuh, Dhuhur, Asharr, Maghrib, Isya).
- Hitung mundur ke waktu sholat berikutnya.

### 3. Autentikasi Pengguna
Pengguna dapat login untuk menyimpan data lokasi secara personal dan mengurangi permintaan API berulang.

### 4. Responsif
Aplikasi dioptimalkan untuk berbagai ukuran layar, dari perangkat mobile hingga desktop.

## Lisensi
Program ini dilisensikan di bawah [GNU General Public License v3.0](https://www.gnu.org/licenses/gpl-3.0.html). Anda bebas untuk menggunakan, memodifikasi, dan mendistribusikan ulang program ini selama mengikuti ketentuan lisensi.

---
Dibuat dengan ❤ oleh **Faqihuddin Habibi** 🍉