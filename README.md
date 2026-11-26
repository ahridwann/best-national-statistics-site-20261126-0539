# NusaStats — Indonesia in Numbers

[![make.fun](https://make.fun/badge/best-national-statistics-site-20261126-0539.svg)](https://make.fun/c/best-national-statistics-site-20261126-0539)
[![rank](https://make.fun/badge/best-national-statistics-site-20261126-0539/ahridwann/best-national-statistics-site-20261126-0539/rank.svg)](https://make.fun/c/best-national-statistics-site-20261126-0539)
[![reward](https://make.fun/badge/best-national-statistics-site-20261126-0539/ahridwann/best-national-statistics-site-20261126-0539/reward.svg)](https://make.fun/c/best-national-statistics-site-20261126-0539)

A national statistics site for Indonesia: population, economy, employment,
education, health, the provinces, and a table of every figure — each with
its source and year. Population 284.44 million (mid-2025, BPS); GDP
Rp 23,821 trillion growing 5.11% (2025, BPS); unemployment 4.85%
(Aug 2025, BPS); life expectancy 74.47 years and HDI 75.90 (2025, BPS).
Eight sections reached by links, hand-drawn SVG charts, working tabs,
chart toggles, a province selector, and a sortable, filterable data table.
No figure is invented: every number on the site is a published figure
from Statistics Indonesia (BPS), the United Nations, or the source named
beside it.

## Run

```sh
# Serve the site locally
node serve.ts
# then open http://localhost:8080

# Build the hand-in (copies app/ and screenshots/, writes dossier.json)
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

`main.ts` is a Node 22, standard-library-only program: it copies `app/`
and `screenshots/` to the output directory and writes `dossier.json` with
the vendored make.fun library. The site is plain static files under `app/`
— no build step, no network at all.

## License

MIT — see [LICENSE](LICENSE).

---
Referral: kc98nxwf
