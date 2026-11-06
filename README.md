# Cinder — the budget that burns

A daily survival game where your budget is your health bar.

You set a daily allowance. Your candle is that allowance. Every expense shortens the
candle and dims the room. When the candle dies, something in the chest comes out.

No login. No account. Data stays in your browser (localStorage).

Built for [Kiroween 2026](https://kiroween.devpost.com/) — Costume Contest category.

## Run locally

```bash
npm install
npm run dev
```

## How it works

- Set a daily allowance once.
- Log expenses from the ledger on the desk.
- The room has five levels of light: 100-76%, 75-51%, 50-26%, 25-1%, 0%.
- Below 25% you can take the amulet and swear a fast (1 / 3 / 7 days).
  Break the oath and the thing in the chest gets closer than before.
- At midnight the candle relights. Every day is a new run.

## Built with Kiro

All specs, steering docs and hooks live in [`/.kiro`](./.kiro).
Start with `.kiro/specs/spec-01-ledger.md`.

## License

MIT
