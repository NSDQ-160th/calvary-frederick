# Calvary Chapel Frederick

Marketing site for [calvaryfrederick.com](https://www.calvaryfrederick.com). Home, Visit, eight ministry pages, Media, and Give. **Giving, sermons, and the church app stay on Subsplash.** This repo replaces the Squarespace shell only. It is not a SnapPages import — see [docs/subsplash-stay-vs-leave.md](docs/subsplash-stay-vs-leave.md).

| | |
| --- | --- |
| Preview | https://calvary-frederick.vercel.app |
| Host | Vercel project `calvary-frederick` (team `kairos-de62`). Church domain **not** attached. |
| Git | Private repo: https://github.com/NSDQ-160th/calvary-frederick |

| Doc | What it is |
| --- | --- |
| [docs/website-rebrand-design.md](docs/website-rebrand-design.md) | Full design (IA, tokens, cutover, PR plan) |
| [docs/subsplash-stay-vs-leave.md](docs/subsplash-stay-vs-leave.md) | Can we push this site to Subsplash? A vs B vs C. How volunteers update the site if we stay off SnapPages. |
| [docs/workshop.md](docs/workshop.md) | PR 0 content checklist (parking, skyline license, …) — fill as answers arrive |
| [docs/search-visibility.md](docs/search-visibility.md) | SEO / AEO / GEO / AI-search plan |
| [docs/holding-site-scan.md](docs/holding-site-scan.md) | Their SnapPages holding site — what is real vs template |
| [docs/content-ops.md](docs/content-ops.md) | Three editor paths (volunteer `/admin`, Grok, GitHub) on the same files |

## Volunteer: weekly updates (this is the runbook)

You need a GitHub login and access to this repository. You do **not** need to install anything. A staff form at `/admin` is planned; until then, use the GitHub web editor or ask someone to run the change in Grok Build.

The **sermon video itself** is always uploaded in the **Subsplash dashboard**, same as today. Do not put Sunday’s mp4 in this repo.

### After Sunday — new message title

1. Open [`src/data/church.yaml`](src/data/church.yaml) on GitHub.
2. Click the pencil (**Edit**).
3. Find `sermon:` and change `title:` to this week’s message title. Change `series:` and `image:` when the series changes.
4. Commit directly to `main` (or open a pull request if that is how the church prefers).

The `/media` page player updates itself from Subsplash. Only the homepage card reads this YAML file.

### New bulletin PDF

1. Name the file **exactly** like the public URL. Current pattern from Squarespace: `Bulletin-08-16-26-pdf.pdf` (keep the `-pdf` segment). Do not rename to `Bulletin-08-16-26.pdf`.
2. Upload it to [`public/files/`](public/files/).
3. In `church.yaml`, set `bulletin.file` to `/files/Bulletin-MM-DD-YY-pdf.pdf`.
4. Commit.

### Service times, men’s study, flags

Same file. Examples:

```yaml
services:
  sunday: ["09:00", "11:00"]
  wednesday: "19:00"

men:
  blurb: >
    2nd and 4th Thursday…

flags:
  israel2027: false   # leave false until they give dates
  vbs2026: false
```

Times are 24-hour (`19:00` = 7:00 PM).

### Hero video

Replace [`public/videos/hero.mp4`](public/videos/hero.mp4) with any MP4. Or set `hero.video` in `church.yaml`. Leave `hero.video` empty to use the still only. These files are **website chrome**, not the teaching archive.

### What you do *not* edit here

| Job | Where |
| --- | --- |
| Upload the sermon audio/video | Subsplash → Media |
| Recurring gifts, funds, card fees | [wallet.subsplash.com](https://wallet.subsplash.com/) |
| Church app screenshots | Subsplash App Dashboard |
| Prayer / visit form destinations | Basin (set up in PR 5) |
| Wallet ID `ZZ5DWR`, org `+8361`, embed paths | Engineers only — do not change |

More detail: [docs/subsplash-stay-vs-leave.md](docs/subsplash-stay-vs-leave.md) and [docs/content-ops.md](docs/content-ops.md).

## Local development

```bash
npm install
npm run dev
```

Dev binds `127.0.0.1` (see `astro.config.ts`). Preview:

```bash
npm run build
npm run preview
```

Node 22+. Production preview is Vercel, not `*.pages.dev`.

## PR status

- [x] PR 1 — scaffold, tokens, `church.yaml`, volunteer README
- [x] PR 2 — header, footer, type, icons, 404
- [x] PR 3 — Watch (one Subsplash embed)
- [x] PR 4 — Home
- [x] PR 5 — Give + Visit + forms (presentation pass)
- [x] Visit rebuild — two-column plan-a-visit + visual kids/ministries + FAQ
- [x] Watch visual pass — cinema player, collection tiles, listen band
- [x] Ministries — eight pages, framed looping heroes
- [x] Media library — series catalog + Subsplash player
- [x] Give rebuild — ways / wallet / fees
- [x] FTL cyan/teal theme
- [x] Vercel preview host
- [ ] Content model + staff `/admin` (Keystatic) — GitHub remote required
- [ ] PR 6 — headers + cutover doc
- [x] PR 7 (started) — titles, schema, FAQ, sitemap, robots, llms.txt; 301s still open
- [ ] PR 8 — a11y / performance / launch freeze

PR 0 (workshop answers, DNS dump, `/s/` bulletin copy) can land anytime; it does not block chrome and pages. **Do not attach calvaryfrederick.com until leadership picks SnapPages vs this host.**
