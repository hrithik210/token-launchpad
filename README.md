# Token Launchpad

Create, configure, and mint your own SPL token on Solana — no code required.
Connect your wallet, set the name, symbol, and supply, and go live on devnet or
mainnet in minutes.

## Routes

- `/` — landing page (one-pager with a single call to action)
- `/launch` — the token creator: connect a wallet, fill in token details, mint

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) for the landing page, or
[http://localhost:3000/launch](http://localhost:3000/launch) to create a token.

## Tech stack

- [Next.js](https://nextjs.org) (App Router) + TypeScript
- [Tailwind CSS](https://tailwindcss.com)
- [Solana web3.js](https://solana.com/docs) and SPL Token
- [Solana Wallet Adapter](https://github.com/anza-xyz/wallet-adapter)
- [Metaplex Token Metadata](https://developers.metaplex.com/token-metadata)
