# Tasks — JEDA

6 tugas; `[ ]` belum dikerjakan, `[x]` selesai.
Tiap tugas menunjuk satu berkas sasaran. Komentar dalam Bahasa Indonesia.

- [ ] **1. Pindahkan seluruh sistem suara ke sfx.js** — `sfx.js` (modul ES, tanpa DOM) — selesai bila `sfx.js` berisi 9 fungsi (audioInit, thump, scrape, growl, chomp, ding, + pengontrol gain/mute) dan `index.html` memanggil modul itu, bukan mendefinisikan sendiri.
- [ ] **2. Layar kalibrasi kamera + ukur EAR** — `index.html` — selesai bila sebelum ronde ada preview wajah, baseline EAR diukur 3 detik, label mata terbuka/tertutup dan penghitung kedip tampil, dan tombol Mulai baru aktif setelah baseline terukur.
- [x] **3. Hukuman kedip + setel tempo** — `index.html` — selesai bila kedip memakan satu nyawa dengan cooldown 1500 ms, PAGES = 6, CLOCK_MS = 7000, dan berpaling hanya dipakai bila kamera mati.
- [x] **4. Pindahkan teks cerita ke cerita.js** — `cerita.js` — selesai bila larik CHAPTERS dan seluruh teks cerita pindah ke `cerita.js` sebagai skrip biasa yang menempelkan `window.JEDA_CERITA`, dimuat lewat `<script src="cerita.js">` sebelum skrip utama, dan tidak ada teks cerita tersisa di index.html.
- [x] **5. Tambah mode uji mandiri `?test=1`** — `index.html` — selesai bila membuka `index.html?test=1&sense=sim` menjalankan minimal 12 assert (P1 nyawa di 0..8, P2 safeUntil setelah jawaban benar, P3 pose tidak pernah berulang, P4 jumlah lampu padam tidak turun), menulis hasil PASS/FAIL ke elemen `#TESTOUT`, dan tidak mengubah perilaku apa pun tanpa parameter itu.
- [ ] **6. Suara masuk bertahap** — `index.html` — selesai bila 20 detik pertama tanpa ambience, denyut berbunyi setelah itu, dan volume naik mengikuti turunnya nyawa.
