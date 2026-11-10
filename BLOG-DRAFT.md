# Draf blog — JEDA (Kiroween 2026)

Target ~700 kata, bahasa Indonesia, gaya orang yang benar-benar mengerjakan (bukan siaran pers).
Ganti bagian bertanda `[ ]` dengan datamu sendiri. Judul bebas.

**Wajib ada** (syarat bonus blog): kalimat bahwa tulisan ini dibuat sebagai bagian dari
Kiroween 2026, dan tautan ke repo.

---

## Judul

> Game horor yang menghukum kedipan matamu — dan angka yang saya ukur untuk membuatnya

## Paragraf pembuka

Saya siswa SMK, dan saya membuat game horor untuk Kiroween 2026. Bukan game besar:
satu berkas HTML, tanpa framework, tanpa build. Tapi ada satu hal yang saya kejar —
pemain harus merasa diawasi oleh tubuhnya sendiri, bukan oleh tombol.

Tulisan ini dibuat sebagai bagian dari Kiroween 2026.

## Bagian 1 — ide yang saya buang

Awalnya saya mau menggabungkan dua proyek lama: aplikasi keuangan dan aplikasi kebiasaan.
Hasilnya akan jadi "aplikasi budget dengan jumpscare". Saya batalkan karena dua alasan.
Pertama, aturan lomba melarang membawa kode lama. Kedua, menggabungkan dua aplikasi
tidak otomatis jadi karya baru — itu cuma dua aplikasi yang ditempel.

Yang saya simpan cuma satu: monster yang bergerak tiap kali kamu berbuat salah.

## Bagian 2 — membedah game pembanding

Saya memilih satu pembanding: *Type to Death*. Saya tidak menyalin kodenya; saya mengukur
perilakunya. Dari rekaman 118 detik, saya potong 39 frame dan menghitung volume audionya
per setengah detik. Yang keluar:

- 58 detik pertama **sunyi total** (−120 dB). Suara baru masuk saat gameplay.
- Di 16 detik terakhir, audio naik dari −22 dB ke −13 dB (sekitar 2,8× lebih keras).
- Terang area tengah layar 4–5 saat monster jauh, 24,6 saat monster dekat — monsternya
  sendiri yang jadi sumber cahaya.
- Sebelum ronde ada **layar kalibrasi kamera**, dan penghitung kedip berjalan di HUD.

Angka-angka itu yang saya tiru, bukan tampilannya.

## Bagian 3 — mekanik yang akhirnya dipakai

Delapan nyawa. Tujuh detik per denyut. Enam halaman. Kedip memakan satu nyawa.
Suara di atas ambang memakan satu nyawa. Jawaban benar mengembalikan satu nyawa dan
memberi jendela aman 1,2 detik.

Yang paling penting: **monster tidak berjalan**. Ia menghilang 110 ms lalu muncul lebih
dekat, dengan pose berbeda. Kalau ia berjalan, pemain bisa menghitung; kalau ia melompat,
pemain tidak bisa.

Kedip diukur dengan Eye Aspect Ratio dari MediaPipe FaceMesh:

```
EAR = (|p2−p6| + |p3−p5|) / (2 × |p1−p4|)
```

Ambangnya 0,72 × baseline. Baseline diukur 3 detik sebelum ronde, karena ambang angka mati
(0,22) terlalu longgar — banyak kedip lolos dan game jadi tidak menakutkan.

## Bagian 4 — uji yang menemukan bug nyata

Saya menaruh uji mandiri di dalam game, dijalankan lewat parameter `?test=1&sense=sim`.
Empat belas pemeriksaan, tanpa framework.

Uji itu menemukan bug yang tidak saya lihat: **21 pengulangan pose berturut-turut**.
Penyebabnya urutan aturan di `pickPose` — penjaga anti-ulang dijalankan lebih dulu,
lalu ditimpa aturan lain yang mengembalikan pose ke nilai sebelumnya. Diperbaiki dengan
membalik urutan. Sekarang 14 PASS, 0 FAIL.

Menurut saya ini bagian paling penting dari proyek ini: uji itu tidak saya tulis untuk
dipamerkan, tapi untuk membuktikan pada diri sendiri bahwa yang saya klaim benar.

## Bagian 5 — bagaimana Kiro dipakai (jujur)

Saya pakai Kiro untuk **spec-driven**: ia menulis `requirements.md` (10 requirement format
EARS), `design.md` (tabel konstanta, state, efek samping tiap fungsi, 4 properti yang bisa
diuji), dan `tasks.md`. Dari daftar tugas itu, Kiro mengerjakan tiga: mode uji `?test=1`,
memindahkan teks cerita ke `cerita.js`, dan hukuman kedip berbasis EAR.

Yang **tidak** dikerjakan Kiro: model monster dan render Blender, latar, pengukuran
perbandingan, serta keputusan desain seperti kapan monster pindah dan berapa lama layar
hitam. Itu saya kerjakan dengan skrip sendiri.

Bagian yang saya kagumi dari Kiro: ketika saya minta memindahkan teks cerita, ia sempat
mengubah tanda pisah panjang (`—`) menjadi tanda hubung biasa. Ia sadar sendiri bahwa itu
berarti mengubah isi, bukan memindahkan, lalu memperbaikinya. Ia juga **mencabut centang
tugasnya sendiri** karena tidak bisa menjalankan browser untuk membuktikan ujinya lulus.

## Bagian 6 — kesalahan yang saya temukan saat memeriksa hasil

Dua hal lolos dan hampir masuk repo:

1. Berkas sementara uji sintaks ikut ter-commit.
2. Folder `assets/` **tidak pernah ikut** — jadi versi di GitHub akan tampil tanpa monster.

Dua-duanya ketemu karena saya memeriksa ulang, bukan karena percaya laporan "selesai".
Pelajaran yang saya ambil: alat otomatis bagus untuk menulis, tapi pemeriksaan akhir
tetap harus dari orang yang tahu apa yang seharusnya ada.

## Penutup

Repo: https://github.com/fdhil273/cinder

Coba sendiri: buka game, izinkan kamera, dan coba selesaikan enam halaman tanpa berkedip.
Kalau gagal di halaman ketiga, itu memang tujuannya.

---

## Catatan untuk penerbitan

- Judul dan nama penulis sesuai akun media sosialmu.
- Sebut "Kiroween 2026" di paragraf pertama (sudah ada di paragraf pembuka).
- Tempel tautan repo dan tautan video.
- Jangan tulis klaim yang tidak bisa kamu buktikan; semua angka di atas bisa diperiksa
  dari repo dan dari `?test=1`.
