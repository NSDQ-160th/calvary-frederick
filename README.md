# Calvary Chapel Frederick

Marketing site for [calvaryfrederick.com](https://www.calvaryfrederick.com). Three pages (Home, Visit, Watch) plus thin `/give`. **Giving, sermons, and the church app stay on Subsplash.** This repo replaces the Squarespace shell only.

| Doc | What it is |
| --- | --- |
| [docs/website-rebrand-design.md](docs/website-rebrand-design.md) | Full design (IA, tokens, cutover, PR plan) |
| [docs/subsplash-stay-vs-leave.md](docs/subsplash-stay-vs-leave.md) | Why we keep Subsplash for media/give/app, and how to push this brand into that dashboard |
| [docs/workshop.md](docs/workshop.md) | PR 0 content checklist (parking, skyline license, …) — fill as answers arrive |

## Volunteer: weekly updates (this is the runbook)

You need a GitHub login and access to this repository. You do **not** need to install anything.

### After Sunday — new message title

1. Open [`src/data/church.yaml`](src/data/church.yaml) on GitHub.
2. Click the pencil (**Edit**).
3. Find `sermon:` and change `title:` to this week’s message title. Leave it empty to show “Latest Sunday message.” Leave `series:` as `Hebrews` until the series changes.
4. Commit directly to `main` (or open a pull request if that is how the church prefers).

The video itself is uploaded in the **Subsplash dashboard**, same as today. The `/watch` page updates itself. Only the homepage card reads this YAML file.

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

Replace [`public/videos/hero.mp4`](public/videos/hero.mp4) with any MP4. Or set `hero.video` in `church.yaml`. Leave `hero.video` empty to use the still only.

### What you do *not* edit here

| Job | Where |
| --- | --- |
| Upload the sermon audio/video | Subsplash → Media |
| Recurring gifts, funds, card fees | [wallet.subsplash.com](https://wallet.subsplash.com/) |
| Church app screenshots | Subsplash App Dashboard |
| Prayer / visit form destinations | Basin (set up in PR 5) |

More detail: [docs/subsplash-stay-vs-leave.md](docs/subsplash-stay-vs-leave.md).

## Local development

```bash
npm install
npm run dev
```

```bash
npm run build
npm run preview
```

Node 22+. Preview deploys will live on `*.pages.dev` until `www` is attached after PR 8.

## PR status

- [x] PR 1 — scaffold, tokens, `church.yaml`, volunteer README
- [x] PR 2 — header, footer, type, icons, 404
- [x] PR 3 — Watch (one Subsplash embed)
- [x] PR 4 — Home
- [x] PR 5 — Give + Visit + forms (presentation pass)
- [ ] PR 6 — headers + cutover doc
- [ ] PR 7 — SEO + redirects
- [ ] PR 8 — a11y / performance / launch freeze

PR 0 (workshop answers, DNS dump, `/s/` bulletin copy) can land anytime; it does not block PRs 1–5 chrome and pages.
