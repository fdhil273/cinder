# Requirements — JEDA

Permainan satu berkas HTML: guru piket membukukan 10 halaman catatan
sambil sesuatu di ujung lorong mendekat tiap nyawa hilang. Tanpa
dependency, tanpa framework, tanpa build step. Komentar dalam Bahasa
Indonesia.

Tiap butir satu kalimat format EARS (WHEN … THE SYSTEM SHALL …),
diikuti satu baris "Uji:" — cara memeriksa tanpa framework test
(pakai console.assert, baca state via `window.__sim.state()`, atau
URL params `?sense=sim` / `?play=1` / `?lives=` / `?die=1`).

- **R1** WHEN tombol mulai ditekan THE SYSTEM SHALL memulai ronde serta menghidupkan denyut, sensor, dan monster.
  Uji: sebelum klik periksa `window.__sim.state().running === false`; setelah `?play=1` jalankan start, periksa `running === true`.

- **R2** WHEN jawaban benar diberikan THE SYSTEM SHALL menonaktifkan hukuman sensor selama 1,2 detik (SAFE_MS).
  Uji: jawab benar lalu segera `window.__sim.noise()` dan `lookAway()`; dalam 1200 ms pertama periksa `state().lives` tidak berkurang.

- **R3** WHEN nyawa berkurang atau bertambah THE SYSTEM SHALL menjaga nyawa pada rentang 0 sampai 8 (LIVES_MAX) dan tidak menampilkan nilai negatif.
  Uji: paksa `?die=1`, baca `document.querySelector('#nLives').textContent`; `console.assert(Number(t) >= 0 && Number(t) <= 8)`.

- **R4** WHEN ronde berjalan dan 5 detik (CLOCK_MS) telah berlalu THE SYSTEM SHALL mengurangi satu nyawa melalui denyut (beat).
  Uji: jalankan ronde, catat waktu, tunggu >5 d, bandingkan `state().lives` sebelum dan sesudah; selisih = 1.

- **R5** WHEN level suara melebihi ambang (NOISE_ON) dan 900 ms cooldown telah terlewati THE SYSTEM SHALL mengurangi satu nyawa paling cepat sekali per 900 ms.
  Uji: `?sense=sim`, panggil `window.__sim.noise()` dua kali cepat <900 ms; hanya lives berkurang 1.

- **R6** WHEN wajah tidak terdeteksi lebih dari 600 ms THE SYSTEM SHALL mengurangi satu nyawa.
  Uji: `?sense=sim`, panggil `lookAway()` tunggu >600 ms lalu baca `state().lives`; berkurang 1.

- **R7** WHEN jawaban benar diberikan THE SYSTEM SHALL menambah satu nyawa (maksimum 8) dan membuka jendela aman 1,2 detik.
  Uji: set lives < 8 via `?lives=`, jawab benar; periksa `state().lives` naik 1 (tidak melebihi 8) dan `state().safe === true`.

- **R8** WHEN jawaban salah diberikan THE SYSTEM SHALL mengurangi satu nyawa dan memindahkan monster ke pose dan posisi baru.
  Uji: jawab salah, periksa `state().lives` turun 1 dan `#mon` src berubah dari nilai sebelumnya.

- **R9** WHEN nyawa berkurang THE SYSTEM SHALL memilih pose monster yang berbeda dari pose sebelumnya.
  Uji: turunkan nyawa berulang, catat `#mon.src` tiap kali; `console.assert` dua nilai berturut-turut tidak pernah sama.

- **R10** WHEN sepuluh halaman selesai THE SYSTEM SHALL menampilkan layar kemenangan; WHEN nyawa habis THE SYSTEM SHALL memutar urutan monster membesar, lalu layar hitam 1,5 detik, lalu teks kekalahan.
  Uji: selesaikan 10 jawaban benar, periksa `#over` punya class `on` dan judul "Sepuluh halaman."; paksa lives=0, periksa `#blackout.on` lalu `#over.on` muncul ~1,5 d kemudian.
