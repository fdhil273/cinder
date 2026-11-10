/* berkas sementara: cek sintaks IIFE inline di index.html */
const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');
const m = html.match(/<script>([\s\S]*?)<\/script>/);
if (!m) { console.error('TIDAK ADA inline script'); process.exit(1); }
const code = m[1];
try {
  new Function(code);
  console.log('SYNTAX OK (' + code.length + ' karakter)');
} catch (e) {
  console.error('SYNTAX ERROR: ' + e.message);
  process.exit(1);
}
