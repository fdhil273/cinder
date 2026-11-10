# SPESIFIKASI — Cinder (Kiroween 2026)

Nama: **Cinder** — tagline: *"The budget that burns."*
Pitch satu kalimat: **"A daily survival game where your budget is your health bar."**
(Dulu: gabungan ide RIVIO + Lockin.)
Kategori: **Costume Contest** — "build any app but show us a haunting UI that's polished and unforgettable"
Bonus: **Best Student Project: Costume Contest** ($1.500 + Kiro Pro Max 1 tahun), **Bonus Blog** (100 pemenang), **Social Blitz** (5 pemenang)
Deadline: **4 Des 2026 14:00 PST = 5 Des 05:00 WIB**

Stack: **Next.js + TypeScript, state di localStorage, tanpa database, tanpa login.** Deploy Vercel.

---

## 1. Fitur inti

> Catat pengeluaran. Lihat sisa jatah harianmu menyusut seperti lilin meleleh.

Bukan tabungan. Tabungan saldonya naik. Ini jatah harian yang turun sampai nol.

```
cinder.transactions: [{ id, amount, title, cat, ts }]
cinder.settings:     { daily, midnightHour, oath: { until, levelBefore } | null }
cinder.export:       JSON unduhan (bukan key, cuma bentuk file)
```

`sisa = daily - sum(amount where ts hari ini)`. Tanpa cron, tanpa server. Reset harian dihitung dari tanggal — `hariAktif = tanggal(now - midnightHour jam)`.

Tengah malam: default **00:00** waktu lokal. Satu konstanta, mudah diubah ke 03:00 kalau perlu.

---

## 2. Satu kamar, lima tingkat nyala

Bukan tombol ganti tema. Satu ruangan tradisional yang **turun derajat** otomatis mengikuti sisa jatah.

| Sisa jatah | Kamar | Peti | Teks & kertas |
|---|---|---|---|
| 100–76% | terang, cahaya jendela pagi | tertutup rapat | hitam di kertas terang |
| 75–51% | lampu redup, warna hangat kusam | celah terbuka sedikit | jelas |
| 50–26% | cuma lilin, sudut menghitam | kepala keluar dari celah | jelas, dasar hangat |
| 25–1% | hampir gelap, asap di lantai | separuh badan + mata | jelas, menyala di area lilin |
| 0% | gelap, satu titik bara | penuh memenuhi layar | jelas, satu baris peringatan |

Dua variabel untuk seluruh animasi:
- `nyala` = sisa / jatah (0–1, kontinu) → opacity, blur, tinggi api, jumlah asap, gerak monster.
- `tier` = 0–4 (diskret dari tabel) → tahap peti dan monster.

**Latar gelap, teks tidak.** HUD dan kertas selalu seperti disorot lilin, kontras ≥ 4.5:1 di semua tingkat.

### Benda di kamar

| Benda | Fungsi | Bisa diklik |
|---|---|---|
| Kamar (gebyok, jendela, kelambu) | latar, ikut meredup | tidak |
| **Lilin** | nyawa. Tinggi api = sisa jatah. Mati = 0% | tidak |
| **Buku** (di atas meja) | satu-satunya input. Halaman depan: catat. Halaman belakang: riwayat 7 hari | **ya** |
| **Peti** | rumah monster: tertutup → celah → kepala → separuh → penuh | tidak |
| Meja, asap, debu | dekorasi | tidak |

Aturan: **hanya buku dan jimat yang bisa diklik.** Kalau semua benda bisa disentuh, user menyentuh semuanya dan lupa mencatat.

Layer SVG dari belakang: `dinding → jendela → kelambu → meja → buku → lilin+api → peti → monster → asap/debu`. Delapan layer, semuanya CSS transform, tanpa canvas, tanpa 3D.

---

## 2b. Buku = kertas input

Kertas sebagai tempat input, bukan modal. Modal memutus ilusi kamar.

```
kamar: buku kas di atas meja, sedikit terbuka
 → tap buku → kamera maju 200ms, kertas memenuhi 90% layar
 → numpad besar → 3 tombol kategori → [Simpan]
 → kertas terlipat, kamera mundur, api lilin bergetar
```

Satu objek dipakai dua kali:
- **Halaman depan:** catat pengeluaran.
- **Halaman belakang:** riwayat 7 hari, tap satu baris → hapus.

Buku juga dipakai saat pertama kali buka, untuk mengisi jatah harian. Satu komponen, tiga pemakaian.

Syarat kertas:
- **Bukan font tulisan tangan** untuk angka. Font bersih, warna tinta, kertas hanya tekstur latar.
- **Kertas tetap terang walaupun kamar gelap.** Bukan bagian dari efek `nyala`. Justru di tier 4 user paling sering mencatat.
- Input maksimal 3 tap.

---

## 2c. Jimat — satu fungsi: tobat

Bukan perisai. Perisai = tombol curang; juri akan tanya "kenapa tidak dipakai terus?".

> Muncul saat `tier` ≥ 3. Ambil jimat, lalu berjanji puasa jajan **1 / 3 / 7 hari**. Kamar naik satu tingkat terang, monster mundur satu tingkat.

Harganya nyata:
- Selama masa puasa, setiap pencatatan pengeluaran = pelanggaran.
- Dilanggar: monster balik **satu tingkat lebih dekat** dari posisi sebelum jimat. Getar 200 ms + *"janjimu batal — dan dia tahu."*
- Puasa selesai penuh: kamar naik satu tingkat, jimat hilang sampai tengah malam berikutnya.

Satu mekanik, dua fungsi: cerita (jimat) + perilaku (commitment device).

---

## 3. Aturan yang tidak boleh dilanggar

Kalau salah satu dilanggar, fiturnya dibatalkan — bukan dikompromikan.

1. **Teks tidak pernah hilang, rusak, atau tak terbaca.** Kontras ≥ 4.5:1 di semua tingkat. Efek membusuk hanya di dekorasi, tidak di huruf dan tidak di kertas input.
2. **Jumpscare maksimal sekali per ambang**, ada tombol tutup, tidak memblokir input, selalu diikuti pesan nyata ("kamu sudah pakai 80% jatah hari ini, sisa Rp 12.000").
3. **Monster tidak muncul tiba-tiba.** Posisinya fungsi dari `tier`. Bisa diprediksi, jadi user tidak merasa dicurangi.
4. **Hormati `prefers-reduced-motion`.** Getar/kedip/meleleh diganti perubahan warna diam.
5. **User bisa keluar kapan saja.** Tidak ada modal mengunci layar, audio bisa dimatikan. Satu tombol "matikan semua efek".

Batasan teknis:
- Audio **tidak bisa** autoplay. Bunyi hanya setelah klik. Jangan taruh informasi penting di suara.
- Video demo sering ditonton **tanpa suara**. Yang penting harus kelihatan.

---

## 4. Rencana pakai Kiro (20% skor, bisa gugur kalau tipis)

```
/.kiro
  /specs
    spec-01-ledger.md        # catat, hapus, sisa, reset harian, riwayat 7 hari, ekspor/impor
    spec-02-room.md          # kamar 5 tingkat: nyala + tier + 8 layer SVG + buku
    spec-03-oath.md          # jimat, puasa, pelanggaran, konsekuensi
  /steering
    product.md               # untuk siapa, masalah apa, bahasa apa
    horror-rules.md          # 5 aturan di atas = batas keras
    tech.md                  # Next.js, localStorage, tanpa server, tanpa auth
  /hooks
    on-save-format.md        # auto-format + lint saat simpan
    on-spec-change-pbt.md    # jalankan property-based test
```

Wajib benar-benar dipakai dan diceritakan di write-up:
- **Spec-driven**: tulis spec dulu, minta Kiro implement, review. Bandingkan dengan vibe coding.
- **Steering**: `horror-rules.md` dipakai menolak saran Kiro yang melanggar keterbacaan. Cerita bagus: "steering menyelamatkan saya dari diri sendiri".
- **Hooks**: satu format, satu test.
- **PBT** (`fast-check`): sisa = jatah − total; sisa tak pernah negatif; catat lalu hapus mengembalikan angka semula; tier tidak pernah naik saat pengeluaran bertambah; ekspor lalu impor mengembalikan data identik.
- **MCP atau Kiro Crew**: pilih satu, jangan dua-duanya.

---

## 5. Kerangka video 3 menit

| Waktu | Isi |
|---|---|
| 0:00–0:20 | Masalah: "uang saku habis sebelum Jumat, dan kamu tidak sadar kapan habisnya." Kamar terang, satu lilin, buku di meja. |
| 0:20–1:00 | Buka buku, isi jatah, catat 3 pengeluaran. Kamar meredup tiap ambang. Kertas tetap terang. |
| 1:00–1:40 | Catat pengeluaran besar. Peti terbuka, monster keluar. Kamar hampir gelap, angka tetap terbaca. |
| 1:40–2:10 | Ambil jimat, janji puasa 3 hari. Kamar mengangar, monster mundur. Catat lagi → monster balik lebih dekat + getar. |
| 2:10–2:45 | Buka `/.kiro`: spec yang kamu tulis, steering yang menolak saran Kiro, hook + PBT jalan di terminal. |
| 2:45–3:00 | Satu kalimat penutup + link repo. |

Rekam OBS, 1080p, tanpa musik berhak cipta.

---

## 6. Userflow

### A. Pertama kali buka (≤ 30 detik)
```
buka link → kamar gelap, 1 lilin menyala, buku di meja sedikit terbuka
 → tap buku → kertas terbuka
 → "Berapa jatah harianmu?" [Rp ___]
 → simpan → kertas terlipat, kamera mundur
 → kamar terang penuh (nyala = 1, tier = 0)
```

### B. Alur harian (10 detik)
```
buka app
 → kalau hariAktif berganti: lilin menyala ulang, sisa = jatah, tier = 0 (animasi subuh 600ms)
 → tap buku → numpad besar → kategori → [Simpan]
 → kamar meredup kalau lewat ambang (800ms), api bergetar
 → angka besar diperbarui
```

### C. Alur kritis (tier ≥ 3)
```
monster separuh keluar, satu tombol: [Ambil jimat]
 → pilih puasa 1 / 3 / 7 hari
 → "kamu berjanji. dia mendengar."
 → kamar naik 1 tingkat, monster mundur 1 tingkat
 → di bawah angka: "janji: 3 hari lagi"
```

### D. Alur pelanggaran
```
masa puasa → catat pengeluaran
 → getar 200ms, layar meredup mendadak
 → "janjimu batal — dan dia tahu."
 → tier = levelBefore + 1
 → jimat hilang sampai besok
```

### E. Alur habis (0%)
```
kamar gelap, monster penuh
 → "Hari ini habis. Lilin menyala lagi jam 00:00."
 → tidak ada tombol. hukuman = menunggu.
 → 00:00 → Alur B (subuh)
```

### F. Riwayat & perbaikan
```
tap buku → balik halaman (tombol [Riwayat] di kertas)
 → 7 hari terakhir, dikelompokkan per tanggal
 → tap baris → [Hapus] → kamar bisa naik lagi satu tingkat
```

### G. Ekspor / impor (opsional, murah)
```
halaman belakang → [Ekspor] → unduh cinder-YYYY-MM-DD.json
                 → [Impor] → pilih file → gabung, buang duplikat by id
```

### Layar (3 + 2 modal)
1. Kamar (utama)
2. Buku halaman depan (catat)
3. Buku halaman belakang (riwayat 7 hari)
4. Modal Jimat
5. Modal konfirmasi (hapus / impor)

### Aturan tepi
- `sisa < 0` → tampil 0, tier = 4.
- Hapus transaksi = satu-satunya cara naik tingkat selain jimat dan tengah malam.
- Zona waktu: lokal perangkat, bukan UTC.
- Lewat tengah malam saat app terbuka → cek saat window fokus + interval 60 detik.
- Tidak ada edit transaksi. Hapus lalu catat ulang.

---

## 7. Checklist biar tidak gugur

- [ ] Repo **baru** `cinder`, publik, ada `LICENSE` (MIT) terlihat di About.
- [ ] `/.kiro` ada di root, **tidak** di `.gitignore`.
- [ ] Tidak ada kode dari `UKL-RIVIO` atau `dbs-lockin-mvp` yang ditempel.
- [ ] Satu baris jujur di form: "Earlier I built RIVIO (PHP) and Lockin (Next.js). This is a ground-up rebuild; no code carried over."
- [ ] Video < 3 menit, publik di YouTube, tanpa materi berhak cipta.
- [ ] Di form: "no login needed, data stays in your browser".
- [ ] **Minta 4.000 kredit Kiro sebelum 1 Des 12:00 PT.**
- [ ] Kategori: Costume Contest. Bonus: Student, Blog, Social.
- [ ] Post sosmed mulai dengan `#KiroweenHackathon26` **di awal**.
- [ ] Blog sebut "written as part of the Kiroween 2026 hackathon".

---

## 8. Urutan kerja 28 hari

| Pekan | Target |
|---|---|
| 1 (6–12 Nov) | Daftar Devpost, minta kredit Kiro, pasang Kiro, tulis 3 spec + steering di `/.kiro`. Belum koding. |
| 2 (13–19 Nov) | Ledger: catat, hapus, sisa, reset harian, riwayat 7 hari, ekspor/impor. Hook + PBT hidup. |
| 3 (20–26 Nov) | Kamar: 8 layer SVG, 5 tingkat, monster 4 tahap, buku sebagai input, jimat, suara, aksesibilitas. |
| 4 (27 Nov–2 Des) | Polish, rekam video, tulis blog, post sosmed, submit **2 Des**. |

Aturan keras: submit 2 Desember. Dua hari sisa untuk link, lisensi, upload — bukan fitur.

### Opsional (hanya kalau pekan 1–4 selesai lebih cepat)
**Kode kamar** — user dapat 6 huruf acak, ketik di HP, data sinkron lewat Turso. Tanpa akun, tanpa email. Juri cukup diberi satu kode di form. Kalau waktunya tidak ada, lewati tanpa penyesalan.

---

## Yang sengaja tidak dibuat

Login, akun, email, database, cloud sync, tugas, kalender, notes, project, tim, admin panel, grafik bulanan, XP, badge, streak, papan skor.

Skor di app ini sudah ada dan sudah nyata: uangmu. Menambah skor palsu membuat skor asli terasa kurang penting.

20% skor Desain menilai produk **selesai**, bukan produk **banyak**.
