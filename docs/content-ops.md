# Content ops — who edits what

| Field | Value |
| --- | --- |
| **Date** | 3 September 2026 |
| **Depends on** | [Subsplash stay vs leave](./subsplash-stay-vs-leave.md) |
| **Status** | Option A runbook. Staff `/admin` needs a GitHub remote (none yet). |

Three editors, one set of files. Do not fork copy into Subsplash *and* this repo for the marketing site. Sermon *video* stays in Subsplash only.

## Who does which job

| Job | Volunteer `/admin` (planned) | Grok Build | GitHub / VS Code | Subsplash dashboard |
| --- | --- | --- | --- | --- |
| Homepage sermon *title* | Yes | Yes | `church.yaml` `sermon` | No |
| Sunday video / audio | No | No | No | **Yes — always** |
| Bulletin PDF | Yes | Yes | `public/files/` + YAML | No |
| Service times, flags, men’s blurb | Yes | Yes | `church.yaml` | No |
| Ministry page paragraphs | Yes | Yes | `ministries.yaml` | No |
| Website hero / ministry looping videos | Files in `public/videos/` | Yes | Yes | No |
| Give funds, fees, receipts | No | No (copy fees into YAML only) | No | **Wallet** |
| App screenshots, push, live | No | No | No | **App** |

`/admin` is staff-only (GitHub login), noindexed, not in the public header. It is not a congregant upload form.

## Files

| File | Volunteers may edit | Engineers only |
| --- | --- | --- |
| `src/data/church.yaml` | `sermon.title` / `series` / `image`, `bulletin`, `services`, `men.blurb`, `flags`, `hero` | `giving.subsplashEmbed`, `media.*` IDs, `podcasts`, org `+8361` |
| `src/data/ministries.yaml` | `title`, `text`, `lead`, `paragraphs`, `scripture`, `facts` labels/values | `slug`, asset paths unless replacing a file |
| `src/data/media-catalog.json` | No — snapshot; prefer Subsplash API later | Refresh scrape / API pull |
| `public/files/` | New bulletin PDFs | — |
| `public/images/` | Homepage sermon still, ministry posters | — |
| `public/videos/` | Website heroes only | Do not dump the teaching archive here |

Ministry YAML placeholders are filled from `church.yaml` at build: `{{sunday}}` `{{wednesday}}` `{{kidsSunday}}` `{{kidsWednesday}}` `{{email}}` `{{youthSunday}}` `{{youthWednesday}}` `{{highSchoolSunday}}` `{{menBlurb}}` `{{infoEmail}}` `{{youthEmail}}` `{{womenEmail}}` `{{menEmail}}`. Change times in `church.yaml`, not by hard-coding `9:00 AM` on a ministry page.

## Sunday checklist (Option A)

1. Upload the message in **Subsplash → Media** (same as today). App, podcasts, and the `/media` player update themselves.
2. Set `sermon.title` (and `series` / `image` if the series changed) in `church.yaml`.
3. If there is a new bulletin, drop the PDF in `public/files/` and set `bulletin.file`.
4. Commit / publish. Vercel rebuilds the preview (and `www` after cutover).

## Rules — never invent church facts

Do not publish parking, office hours, clothing expectations, VBS dates, Israel 2027 details, extra staff names, or kids ages other than Sunday infants–5th / Wednesday 3–11 unless the church has given them. Holding-site lorem (9:30 AM, Ballard, fake staff) is not copy.

## Grok Build

Tell Grok the change in plain language (“homepage title is Acts 21:26–36, bulletin is this week’s PDF”). It should edit YAML and `public/` files only, leave Wallet / org IDs alone, and not attach the church domain.

## `/admin` (not shipped)

Keystatic (or Decap fallback) on `/admin`, GitHub OAuth, collections mapped to `church.yaml` + `ministries.yaml` + bulletin files. Blocked until this repo has a GitHub remote so saves can commit.
