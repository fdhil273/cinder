# Steering — Horror rules

Batas keras untuk semua perubahan UI di proyek ini. Tolak saran yang melanggar,
walaupun hasilnya terlihat lebih dramatis.

1. Teks tidak pernah hilang, rusak, atau turun di bawah kontras 4.5:1. Efek
   "membusuk" hanya untuk dekorasi (latar, tepi, bayangan), tidak untuk huruf
   dan tidak untuk kertas input.
2. Jumpscare maksimal sekali per ambang tier. Selalu ada tombol tutup, tidak
   pernah memblokir input, dan selalu diikuti satu kalimat berisi angka nyata.
3. Monster tidak muncul tiba-tiba. Posisinya fungsi dari `tier`, bisa diprediksi.
4. `prefers-reduced-motion: reduce` mematikan getar, kedip, dan meleleh; diganti
   perubahan warna diam.
5. User selalu bisa keluar. Tidak ada modal yang mengunci layar. Semua efek
   (suara, getar, asap) bisa dimatikan dengan satu tombol.
6. Kertas input selalu terang, tidak ikut efek `nyala`. User paling sering
   mencatat justru saat kamar paling gelap.
7. Hanya dua benda yang bisa diklik: buku dan jimat.
