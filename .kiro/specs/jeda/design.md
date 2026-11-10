# Design — JEDA

Satu berkas `index.html` (~680 baris): HTML + CSS + JS dalam IIFE,
tanpa dependency build, tanpa framework. Komentar dalam Bahasa
Indonesia. Kamera/mikrofon diproses di perangkat; mode `?sense=sim`
menggantikan sensor nyata untuk pengujian otomatis via `window.__sim`.

## 1. Konstanta

| Nama | Nilai | Satuan | Kegunaan |
|---|---|---|---|
| LIVES_MAX | 8 | nyawa | nyawa awal & batas atas |
| CLOCK_MS | 5000 | ms | interval denyut (beat) |
| PUSH | 1 | nyawa | jumlah nyawa ditambah saat jawaban benar |
| SAFE_MS | 1200 | ms | lamanya jendela aman setelah jawaban benar |
| PAGES | 10 | halaman | target kemenangan |
| NOISE_ON | 0.16 | RMS | ambang suara di atas baseline |
| NOISE_COOL | 900 | ms | cooldown hukuman suara (literal `900` di `micTick`) |

Catatan: `NOISE_COOL` di kode adalah literal `900` pada cek
`now - noiseCool > 900`, bukan konstanta bernama; nilai inilah yang
didokumentasikan.

## 2. State

Semua variabel modul-scope di dalam IIFE; pemilik = skrip tunggal
(tidak ada modul lain).

| Variabel | Jenis | Pemilik | Catatan |
|---|---|---|---|
| lives | number (0..8) | modul | nyawa; naik pakai `Math.min(LIVES_MAX,·)`, tampil `Math.max(0,·)` |
| score | number (0..10) | modul | jumlah halaman selesai |
| running | boolean | modul | true selama ronde aktif |
| q | `{text,ans}` \| null | modul | soal aktif (hasil `makeQ`) |
| safeUntil | number (ms) | modul | timestamp akhir jendela aman (`performance.now()+SAFE_MS`) |
| timer | interval id | modul | `setInterval(beat, CLOCK_MS)` |
| heartT | interval id | modul | denyut jantung (`thump`) berbasis kedekatan |
| growlT | interval id | modul | `setInterval(growl, 9000)` |

## 3. Fungsi

| Nama | Masukan | Efek samping | Pemanggil |
|---|---|---|---|
| audioInit | — | buat AudioContext, master gain, drone, noise buffer `nbuf` | `start`, handler `mute` |
| thump | `s` (skala), `f` (Hz) | mainkan dentuman osilator | `paint` (via `heartT`), `over` |
| scrape | — | mainkan suara gesekan (bandpass + noise buffer) | `beat`, `penalize` |
| growl | `strength` | mainkan geraman (saw+square+lfo) | `growlT` (di `start`) |
| chomp | — | mainkan tiga kunyaman berurutan | `over` |
| ding | `ok` (boolean) | mainkan denting benar (640 Hz) / salah (138 Hz) | `answer`, `win` |
| paintLamps | — | toggle class `off` pada `#lamp1..4` berdasarkan `lives` | `paint` |
| paint | — | update `--prox`, lampu, HUD angka, `#steps`, drone gain, `heartT` | `beat`, `penalize`, `answer`, `start`, `win`, init |
| pickPose | — | pilih pose ≠ `lastPose.pose`, update `lastPose`; return path gambar | `mountMonster`, `teleportMonster` |
| mountMonster | — | tampilkan monster (`#mon.show`), set `monVisible=true` | `start` |
| teleportMonster | — | hilangkan lalu tampilkan ulang monster dengan src & posisi kiri/kanan baru | `beat`, `penalize` |
| paintQ | — | buat soal via `makeQ`, isi `q`, update `#story` | `start`, `answer` (setTimeout) |
| beat | — | `lives-=1`, `scrape`, `paint`, `teleportMonster`, `over` jika `lives<=0` | `timer` (setInterval) |
| penalize | `why` (string) | `lives-=1`, `scrape`, `paint`, `teleportMonster`, class `hurt`, `flashLabel`, `over` jika `lives<=0` | `micTick`, `faceTick`, `answer` |
| answer | `raw` (string) | parse, bandingkan dgn `q.ans`, `ding`, ubah `score`/`lives`, set `safeUntil`, `paint`, `win`/`penalize`, `paintQ` | handler submit `#ansForm` |
| over | — | `running=false`, clear `timer`, `thump`, class `dying`, `chomp`, `#blackout.on`@1500 ms, `#over.on`@1750 ms | `beat`, `penalize` |
| win | — | `running=false`, clear `timer`+`heartT`, teks menang, `#over.on`, `ding(true)` | `answer` |

## 4. Properti yang dapat diuji dengan assert

- **P1** Nyawa selalu di rentang 0..8.
  Naik: `lives = Math.min(LIVES_MAX, lives + PUSH)` di `answer`. Tampilan:
  `Math.max(0, lives)` di `paint`.
  Assert: `console.assert(lives >= 0 && lives <= LIVES_MAX)` setelah setiap
  operasi naik/turun.

- **P2** Setelah jawaban benar, `safeUntil > performance.now()`.
  `answer(ok=true)` menetapkan `safeUntil = performance.now() + SAFE_MS`.
  Assert: segera setelah jawaban benar,
  `console.assert(window.__sim.state().safe === true)` (cek `now < safeUntil`).

- **P3** Pose baru tidak pernah sama dengan pose sebelumnya.
  `pickPose`: `if (pose === lastPose.pose) pose = (pose + 1) % 3`.
  Assert: panggil `pickPose` (atau turunkan nyawa berulang) 1000x; `console.assert`
  dua nilai `#mon.src` berturut-turut tidak pernah sama.

- **P4** Jumlah lampu padam tidak pernah turun ketika nyawa turun.
  `paintLamps` pakai `TH=[5,3,1,0]`; lampu `i` padam saat `lives <= TH[i]`,
  sehingga jumlah padam monoton tidak menurun saat `lives` turun.
  Assert: turunkan `lives` dari 8 ke 0 satu per satu, hitung
  `document.querySelectorAll('#lamps i.off').length`; `console.assert` jumlah
  tidak pernah berkurang antara dua langkah berturut-turut.
