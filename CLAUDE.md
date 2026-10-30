# adiazgallici

Monorepo for Agustín's public presence. This repository is `Adiazgallici/Adiazgallici`, the special
repo whose root `README.md` GitHub shows on the profile page, so the root README and `assets/` are
the profile itself. Everything else lives in folders next to them.

| Path | What it is |
| --- | --- |
| `README.md`, `assets/` | The GitHub profile. Images are generated, never edited by hand. |
| `apps/web/` | The site at https://www.adiazgallici.dev (Next.js App Router). |
| `tools/profile-art/` | Renders the profile banner GIF and captures the README images from the site. |

## Iterating

```sh
npm run setup          # once: web dependencies + Python venv with Pillow
npm run dev            # site on http://127.0.0.1:3017
```

Project data (descriptions, inputs/outputs, usage numbers, live dates) lives in
`apps/web/lib/projects.ts`. The Lessio Stock supply-chain diagram is `apps/web/components/supply-chain.tsx`.

## Updating the profile images

The README images are screenshots of the site, so change the site first.

```sh
npm run build && npm start      # leave running on :3017
npm run profile:banner          # animated banner (copy lives in tools/profile-art/src/cyber-banner.html)
npm run profile:cards           # map, one card per project, and the Lessio Stock section
npm run profile:export          # writes assets/*.jpg and assets/banner.gif
```

Keep the banner text in `cyber-banner.html` in sync with the site's hero facts.

## Deploying

- Vercel project `adiazgallici` is connected to this repo with Root Directory `apps/web`. A push to
  `main` deploys the site.
- `apps/web/vercel.json` skips the build when a commit doesn't touch `apps/web`, so README-only
  changes don't redeploy.

## Content rules

- This repo is public. No secrets, no customer or financial data, no paths to private repos.
- Most product source is private: show products, real screenshots and real usage, never code from
  private repos.
- No city: say "Argentina". No supplier marketplace names: say "China suppliers".
- Lessio Stock screenshots use invented demo data only.
- Usage numbers are real and dated (`snapshotDate` in `projects.ts`). Don't show commit or PR
  counts as achievements.
- English copy: "Co-founder & CTO, Lessio & Co". British "neighbour" on the map is intentional.
