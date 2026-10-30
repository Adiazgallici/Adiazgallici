# adiazgallici.dev

The site at https://www.adiazgallici.dev. Next.js App Router, React and TypeScript, no database and
no secrets. See the repo's `CLAUDE.md` for how it fits with the GitHub profile.

```sh
npm ci
npm run dev        # http://127.0.0.1:3017
npm run build
npm run typecheck
```

- `lib/projects.ts`: every project's copy, input and output, live date and real usage numbers.
- `components/denoise-hero.tsx`: the hero that samples the headline out of noise.
- `components/latent-map.tsx`: the project map.
- `components/supply-chain.tsx`: Lessio Stock's path from China suppliers to the customer.
- `public/screenshots/`: desktop (1440×1000) and mobile (390×844) captures. Lessio Stock and the
  Vindue, Partidito app screens come from local copies with demo data.
- `scripts/`: Playwright and axe checks against a running build (`QA_BASE` sets the URL).

`NEXT_PUBLIC_SITE_URL` optionally overrides the default `https://www.adiazgallici.dev`.
