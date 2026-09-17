# Calvary Chapel Frederick — agent notes

Marketing site for Calvary Chapel Frederick. Astro 5, static, Vercel preview https://calvary-frederick.vercel.app. **Do not attach calvaryfrederick.com.** Giving, sermons, app stay on Subsplash.

## Before you edit

- Read `docs/content-ops.md` and `src/data/church.yaml`.
- Do not invent church facts. If it is not in `church.yaml`, `ministries.yaml`, `docs/workshop.md`, or a published church page, do not write it on the site. Kids ages are Sunday infants–5th / Wednesday 3–11. Israel 2027 stays hidden (`flags.israel2027: false`).
- Do not copy lorem from `calvarychapelfrederick1.snappages.site` (9:30, Ballard, fake staff).

## Weekly / copy changes

| Ask | Edit |
| --- | --- |
| Homepage latest teaching title | `src/data/church.yaml` → `sermon` |
| Bulletin | `public/files/` + `church.yaml` `bulletin.file` |
| Times, prayer, men’s study, flags | `church.yaml` |
| Ministry page text | `src/data/ministries.yaml` (placeholders `{{sunday}}` etc. come from `church.yaml`) |
| Website hero clip | `public/videos/hero.mp4` or `church.yaml` `hero.video` |

Do **not** put Sunday sermon mp4s in this repo. Upload those in the Subsplash dashboard.

## Never change without an explicit ask

- `giving.subsplashEmbed` (`ZZ5DWR`)
- `media.org` (`+8361`) and embed / collection IDs
- Podcast Apple IDs
- DNS / Vercel domain attach

## Stack

- Data: YAML in `src/data/`, typed loaders in `*.ts`. `@rollup/plugin-yaml` already wired.
- Media catalog: `src/data/media-catalog.json` is a snapshot. Playback is Subsplash. Do not rebuild a sermon CMS.
- Theme tokens: `--forest` is cyan `#007fa7` (names are historical).
- Local dev: `127.0.0.1:4321` (see `astro.config.ts`).

## Subsplash

You cannot import this Astro site into SnapPages. Comparison: `docs/subsplash-stay-vs-leave.md`. Option C (leave giving/media/app) is out of scope.
