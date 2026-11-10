/* cerita.js - seluruh teks cerita JEDA, dipisah dari mekanik.
   Skrip biasa (bukan modul ES) supaya bisa dimuat lewat file://.
   Menempelkan ke window.JEDA_CERITA; harus dimuat SEBELUM skrip utama. */
window.JEDA_CERITA = {
  /* templat soal: satu angka hilang dari catatan (bukan soal sekolah) */
  STORY: [
    "Malam pertama <b>{a}</b> liter. Malam kedua <b>{b}</b> liter.<br>Di buku tertulis total <b>{t}</b> liter.",
    "Ada <b>{a}</b> kaleng, tiap kaleng <b>{b}</b> liter.<br>Di buku tertulis total <b>{t}</b> liter.",
    "<b>{a}</b> langkah ke ujung lorong, lalu <b>{b}</b> langkah lagi.<br>Di buku tertulis total <b>{t}</b> langkah."
  ],
  /* petunjuk singkat di bawah soal */
  ASK: ["isi angka yang hilang", "isi angka yang hilang", "isi angka yang hilang"],
  /* narasi tiap halaman catatan; tampil berurutan saat skor naik */
  CHAPTERS: [
    "Kamu guru piket. Jam sebelas lewat, lorong sekolah tinggal lampu darurat.",
    "Di kelas 3A papan tulis masih menulis namamu — padahal kau belum masuk.",
    "Loker 27 terbuka. Di dalamnya seragam basah, ukuran anak SMP.",
    "Langkah di ujung koridor berhenti tepat saat kau berhenti.",
    "Daftar absen kelas malam: tiga puluh satu nama. Muridnya tiga puluh.",
    "Di kaca jendela ada satu bayangan yang berdiri lebih dekat dari tadi.",
    "Kau hitung ubin: jumlahnya berkurang setiap kali kau berkedip.",
    "Dia tidak berjalan. Dia hanya sudah ada di tempat lain.",
    "Bel berbunyi. Listrik sudah mati sejak setengah jam lalu.",
    "Halaman terakhir kosong. Cuma satu baris: namamu, dan tanda tanganmu."
  ]
};
