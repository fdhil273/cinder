# JEDA

Game horor satu berkas HTML. Kamu guru piket malam di SMA tua. Ada sosok di ujung lorong,
dan ia tidak berjalan — ia sudah ada di tempat lain.

Dibuat untuk [Kiroween 2026](https://kiroween.devpost.com/) — kategori Costume Contest.

## Jalankan

Kamera butuh `localhost`, bukan `file://`:

```bash
python -m http.server 8080
# buka http://localhost:8080
```

## Cara main

Selesaikan **6 halaman catatan** sebelum nyawamu habis.

- **8 nyawa**. Denyut memakan satu nyawa tiap **7 detik**.
- **Kedip** memakan satu nyawa (cooldown 1,5 detik). Kamera mengukur mata lewat EAR,
  karena itu ada layar kalibrasi sebelum ronde — tanpa baseline, deteksi kedip tidak akurat.
- **Suara** di atas ambang memakan satu nyawa (cooldown 0,9 detik).
- Jawaban benar: +1 nyawa dan **jendela aman 1,2 detik** (semua sensor diam).
- Jawaban salah: −1 nyawa dan monster berpindah lebih dekat.
- Semua sensor berjalan di perangkat. Tidak ada gambar atau suara yang dikirim keluar.

Tombol **"Main tanpa sensor"** memulai ronde tanpa kamera/mikrofon — hanya denyut dan hitungan.

## Parameter

| Parameter | Guna |
|---|---|
| `?test=1&sense=sim` | uji mandiri 14 pemeriksaan (P1–P4), hasil di `<pre id="TESTOUT">` |
| `?play=1&lives=N` | langsung mulai tanpa sensor, untuk tangkapan layar |
| `?sense=sim` | sensor disimulasikan (`window.__sim`) |

## Uji

Buka `index.html?test=1&sense=sim`. Empat properti yang diperiksa:

| Properti | Isi |
|---|---|
| P1 | nyawa selalu 0..8 — awal 8, naik 7→8, cap di 8, turun 1→0, tampilan tidak negatif |
| P2 | setelah jawaban benar, `state().safe` benar dan `safeUntil > performance.now()` |
| P3 | 200 pemilihan pose lintas tier, tidak ada dua berurutan yang sama |
| P4 | nyawa 8→0, jumlah lampu padam monoton naik, 0 saat nyawa 8, 4 saat nyawa 0 |

Status: **14 PASS, 0 FAIL** lewat `file://` maupun `http://`.

## Struktur

```
index.html          permainan (HTML + CSS + JS, satu berkas)
cerita.js           seluruh teks cerita (window.JEDA_CERITA)
assets/hall.jpg     latar lorong sekolah
assets/monster/     7 sprite monster (6 pose + 1 close-up wajah)
.kiro/              spec, steering, daftar tugas
```

## Aset

- Monster: model di-render dengan Blender (Cycles, 40 sampel, latar transparan),
  tiga pose × dua jarak. Siluet dipangkas agar kaki menapak; simetri siluet 0,95–0,99.
- Latar: foto lorong sekolah, lisensi CC0.
- Semua suara dibuat dengan Web Audio — tidak ada berkas audio.

## Dibangun dengan Kiro

Spec, steering, dan daftar tugas ada di [`/.kiro`](./.kiro).
Mulai dari `.kiro/specs/jeda/requirements.md`, lalu `tasks.md` — 3 dari 6 tugas sudah
dikerjakan Kiro, dan tiap commit-nya menyebut nomor tugas.

## Lisensi

MIT. Lihat `LICENSE`.
