---

# ArayGala Image Processing Game

## Deskripsi Proyek
**ArayGala Image Processing Game** adalah sebuah permainan di mana pemain menebak urutan operasi pemrosesan gambar yang diterapkan pada sebuah gambar. Game ini dirancang untuk mengasah keterampilan visual pemain dalam mengenali efek dari berbagai operasi gambar, seperti **grayscale**, **invert**, **blur**, **sharpen**, dan lainnya.

Permainan terdiri dari beberapa level, di mana tingkat kesulitan akan meningkat seiring dengan bertambahnya level. Pemain harus menebak satu operasi di level awal dan dua operasi di level yang lebih tinggi. Pemain diberikan opsi untuk meminta petunjuk (hint) dan diberikan skor berdasarkan jawaban yang benar.

---

## Fitur Utama
- **Multiple image processing operations**: Game ini menggunakan operasi seperti **brightness**, **grayscale**, **invert**, **blur**, **sharpen**, **edge detection**, dan **emboss**.
- **Level up mechanics**: Pemain naik level setelah setiap tebakan yang benar, dan tingkat kesulitan meningkat dengan operasi yang lebih banyak diterapkan.
- **Hint system**: Pemain dapat meminta petunjuk untuk membantu menebak operasi yang diterapkan pada gambar.
- **Score system**: Pemain memperoleh poin untuk setiap jawaban yang benar.
- **Timer**: Setiap permainan memiliki batas waktu 60 detik. Permainan akan berakhir jika waktu habis.
- **Responsive design**: Tampilan game responsif untuk berbagai ukuran layar.

---

## Cara Memainkan
1. Tekan tombol "Start Game" untuk memulai permainan.
2. Sebuah gambar akan muncul pada area **Original Image** dan gambar yang telah diolah muncul di area **Processed Image**.
3. Pemain harus menebak operasi gambar yang telah diterapkan dengan memilih dari dropdown box yang muncul di bawah.
4. Pemain dapat meminta petunjuk dengan menekan tombol "Hint".
5. Setelah pemain memilih operasi gambar, tekan tombol **Submit Guess** untuk memeriksa jawaban.
6. Pemain memperoleh poin untuk setiap jawaban yang benar dan akan naik ke level selanjutnya.
7. Game berakhir ketika waktu habis atau pemain berhasil mencapai level tertinggi.

---

## Struktur Proyek
- **index.html**: File HTML utama yang memuat struktur dasar game, termasuk elemen-elemen UI seperti canvas, tombol, dan area feedback.
- **style.css**: File CSS yang mengatur tampilan visual game, seperti styling untuk canvas, tombol, dan elemen lainnya.
- **script.js**: Logika utama game yang mengelola rendering gambar, penerapan operasi gambar, dan kontrol permainan seperti skor, level, dan timer.
- **/images/**: Direktori yang berisi gambar-gambar yang digunakan dalam permainan.

---

## Instalasi dan Penggunaan

---
Link = https://yahyakhairani.github.io/ArayGala-Image-Processing-Game/
---

### 1. Clone Repository
Clone repository ini ke mesin lokal Anda:
```bash
git clone https://github.com/yahyakhairani/ArayGala-Image-Processing-Game.git
```

### 2. Persyaratan
Proyek ini tidak memerlukan backend khusus karena dapat dijalankan secara lokal menggunakan file statis (HTML, CSS, dan JS).

- Pastikan Anda memiliki koneksi internet untuk mengambil dependensi dari CDN (Bootstrap, Google Fonts).

### 3. Jalankan Secara Lokal
Buka file `index.html` di browser untuk memainkan game:
```bash
open index.html
```

### 4. Direktori Gambar
Pastikan folder **/images/** berisi gambar yang akan digunakan dalam game. Nama gambar diatur di dalam file `script.js` dalam array `imageFiles`:
```javascript
const imageFiles = ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg", "06.jpg", "07.jpg", "08.jpg"];
```

---

## Kontribusi
Jika ingin berkontribusi pada proyek ini:
1. Fork repository.
2. Buat branch fitur (`git checkout -b feature/AmazingFeature`).
3. Commit perubahan Anda (`git commit -m 'Add some AmazingFeature'`).
4. Push ke branch (`git push origin feature/AmazingFeature`).
5. Buat Pull Request.

---

Nikmati permainan dan asah kemampuan visual Anda di ArayGala Image Processing Game!

--- 
