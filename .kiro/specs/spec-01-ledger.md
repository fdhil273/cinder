# Spec 01 — Ledger

Status: draft
Owner: Fadhil
Scope: menyimpan pengeluaran, menghitung sisa jatah harian, reset harian, riwayat 7 hari, ekspor/impor.

## Tujuan

Satu sumber kebenaran untuk angka `sisa`. Kalau angka ini salah, seluruh pengalaman
horor di `spec-02-room.md` salah juga. Karena itu semua perhitungan dibuat fungsi murni
dan diuji dengan property-based test sebelum UI disentuh.

## Penyimpanan

localStorage, dua key:

```
cinder.transactions: Transaction[]      // [{ id, amount, title, cat, ts }]
cinder.settings:     { daily: number, midnightHour: number, oath: Oath | null }
```

`amount` = rupiah, bilangan bulat, selalu positif.
`ts` = epoch milidetik.
`cat` = "makan" | "transport" | "lain".

## Requirements

**R1 — Jatah harian**
WHEN aplikasi dibuka pertama kali tanpa `cinder.settings`
THEN sistem SHALL menampilkan buku dengan satu pertanyaan jatah harian
AND menyimpan `daily > 0` setelah user menekan Simpan.

**R2 — Hari aktif**
WHEN sistem menentukan "hari ini"
THEN sistem SHALL memakai waktu lokal perangkat
AND menggeser batas hari sebesar `midnightHour` (default 0)
AND menghitung `hariAktif = floor((now - midnightHour jam) / 1 hari)`.

**R3 — Catat pengeluaran**
WHEN user menyimpan pengeluaran dengan `amount > 0`
THEN sistem SHALL menambahkan satu Transaction dengan `id` unik dan `ts = now`
AND memperbarui `sisa` tanpa memuat ulang halaman.

**R4 — Tolak input tidak sah**
WHEN `amount` kosong, nol, negatif, atau bukan bilangan
THEN sistem SHALL menonaktifkan tombol Simpan
AND tidak menulis apa pun ke localStorage.

**R5 — Sisa**
WHEN sistem menghitung sisa
THEN `sisa = daily - sum(amount of transactions where hariAktif(ts) = hariAktif(now))`
AND `sisa` yang ditampilkan SHALL di-clamp ke minimum 0.

**R6 — Reset harian**
WHEN `hariAktif` berubah (dicek saat window fokus dan tiap 60 detik)
THEN sistem SHALL memakai jatah penuh kembali
AND memicu animasi subuh di `spec-02-room.md`.

**R7 — Hapus**
WHEN user menghapus satu transaksi dari riwayat
THEN transaksi itu SHALL hilang dari localStorage
AND `sisa` dihitung ulang seketika.

**R8 — Riwayat 7 hari**
WHEN user membuka halaman belakang buku
THEN sistem SHALL menampilkan transaksi dari 7 hari aktif terakhir
AND mengelompokkannya per tanggal, terbaru di atas.

**R9 — Ekspor**
WHEN user menekan Ekspor
THEN sistem SHALL mengunduh berkas `cinder-YYYY-MM-DD.json` berisi `transactions` + `settings`.

**R10 — Impor**
WHEN user memilih berkas ekspor
THEN sistem SHALL menggabungkan transaksi dengan membuang `id` yang sudah ada
AND menolak berkas yang bukan JSON valid tanpa mengubah data lama.

## Properti untuk property-based test (`fast-check`)

1. `sisa(ts) >= 0` untuk semua himpunan transaksi.
2. `sisa` dengan 0 transaksi = `daily`.
3. Tambah lalu hapus transaksi yang sama → `sisa` kembali ke nilai sebelumnya.
4. Menambah transaksi dengan `amount > 0` tidak pernah menaikkan `sisa`.
5. `tier` (0–4) tidak pernah naik saat `daily` tetap dan transaksi bertambah.
6. Ekspor lalu impor ke state kosong menghasilkan transaksi yang identik (tanpa duplikat).
7. Impor dua kali berkas yang sama tidak menambah transaksi baru.

## Di luar cakupan

- Edit transaksi (hapus lalu catat ulang).
- Multi-user, login, sinkron antar perangkat.
- Kategori yang bisa ditambah user (tetap tiga).
- Grafik, statistik bulanan, anggaran per kategori.
