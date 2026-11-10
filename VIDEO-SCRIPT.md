# Skrip video — 3 menit (JEDA)

Rekam layar 1280×720, tanpa suara permainan (game-nya sendiri sudah punya suara, tapi
juri sering menonton tanpa audio — jadi **semua poin penting harus ada di teks/tulisan**).
Narasi boleh dibacakan atau cukup jadi teks di layar. Rekam dalam 4 potongan, gabung belakangan.

Alat: Windows + Xbox Game Bar (`Win+G`) atau OBS. Simpan sebagai MP4, unggah ke YouTube
sebagai **Unlisted**, lalu tempel tautannya di form Devpost.

---

## Potongan 1 — 0:00–0:25 — apa ini

**Layar:** halaman intro JEDA, kursor bergerak pelan.

**Teks di layar / narasi:**
> Ini JEDA. Kamu guru piket malam di SMA tua. Ada enam halaman catatan yang harus
> diselesaikan sebelum pulang — dan ada sesuatu di ujung lorong.
>
> Yang membuatnya berbeda: kamu tidak mengendalikan karaktermu. Kamu mengendalikan
> dirimu sendiri. Kamu dihukum kalau **berkedip**.

**Yang harus terlihat:** judul "JEDA", panel kalibrasi kamera, tiga baris status
(`baseline: 0.xx`, `mata: terbuka`, `kedip: 0`).

---

## Potongan 2 — 0:25–1:05 — kalibrasi (bukti sensornya nyata)

**Layar:** klik "Izinkan kamera & mikrofon". Biarkan panel kalibrasi berjalan 3 detik.

**Teks:**
> Sebelum mulai, game mengukur matamu selama tiga detik untuk mendapat nilai dasar.
> Tanpa kalibrasi, ambang kedipnya jadi 0,72 × 0,22 — terlalu longgar, banyak kedip lolos.

**Lakukan di depan kamera:** buka mata lebar, lalu **kedip sekali**. Tunjukkan angka
`kedip: 1` naik. Itu bukti paling meyakinkan bahwa sensornya bekerja.

---

## Potongan 3 — 1:05–2:20 — permainan (bagian terpenting)

**Layar:** ronde berjalan. Ketik jawaban benar, lalu **sengaja kehilangan satu nyawa**.

**Teks:**
> Delapan nyawa. Denyut memakan satu tiap tujuh detik. Jawaban benar mengembalikan satu
> nyawa dan memberi jendela aman 1,2 detik.
>
> Perhatikan: monster tidak berjalan. Ia **menghilang lalu muncul lebih dekat**, dengan
> pose berbeda — berdiri, menggapai, mengaum. Empat lampu lorong padam satu per satu
> sebagai pengganti angka jarak.
>
> Jawab salah, atau berkedip, dan ia pindah.

**Yang harus terlihat (penting):**
1. Monster berdiri di ujung lorong saat nyawa masih penuh.
2. Satu lampu padam.
3. Monster pindah lebih dekat dengan pose berbeda.
4. HUD: `nyawa`, `catatan`, `kedip`.

Jangan buru-buru. Juri perlu melihat perpindahan monster minimal **dua kali**.

---

## Potongan 4 — 2:20–3:00 — akhir + bukti uji

**Layar:** habiskan nyawa sampai layar kalah muncul (monster membesar → hitam → teks).
Lalu buka tab baru: `index.html?test=1&sense=sim`.

**Teks:**
> Kalau nyawa habis, ia sampai.
>
> Game ini punya uji mandiri di dalamnya. Empat belas pemeriksaan, dijalankan lewat
> parameter, tanpa framework. Uji ini pernah menemukan bug nyata: dua puluh satu
> pengulangan pose berturut-turut, karena aturan tier-2 menimpa penjaga anti-ulang.
> Sudah diperbaiki.

**Yang harus terlihat:** `HASIL: 14 PASS, 0 FAIL` di layar.

---

## Judul video (untuk YouTube)

```
JEDA — a horror game where blinking costs a life (Kiroween 2026)
```

## Deskripsi video

```
JEDA is a single-file browser horror game. You are the night janitor-teacher in an old
school. Finish six ledger pages before the thing in the corridor reaches you.

You do not control a character. You control yourself: every blink costs a life,
measured from your webcam with MediaPipe FaceMesh (Eye Aspect Ratio), calibrated for
3 seconds before the round.

Built for Kiroween 2026 (Costume Contest). Specs, steering and task list live in /.kiro.
Repo: https://github.com/fdhil273/cinder
Self-test: add ?test=1&sense=sim — 14 checks, currently 14 PASS / 0 FAIL.
```
