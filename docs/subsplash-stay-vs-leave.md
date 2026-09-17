# Subsplash: stay, leave, or keep the split

| Field | Value |
| --- | --- |
| **Document** | Technical comparison + content-ops plan. Showable to leadership when they pick Option A vs B. |
| **Customer** | Calvary Chapel Frederick |
| **Date** | 3 September 2026 |
| **Status** | Decision guide. Does not attach `calvaryfrederick.com`. |
| **Related** | [Website rebrand design](./website-rebrand-design.md), [Holding-site scan](./holding-site-scan.md) |
| **Preview** | https://calvary-frederick.vercel.app |

This document answers four questions:

1. Are they “on Subsplash” today?
2. Can we push this Astro site *into* Subsplash?
3. What is gained and lost if the marketing website moves onto SnapPages, stays off it, or if they leave Subsplash entirely?
4. If the website stays off SnapPages, how do an office volunteer, a coder, and Grok Build update text and media without cloning Subsplash?

**Locked for this rebrand:** keep Subsplash for giving, sermons, live/on-demand media, podcasts, and the church app. Do not rebuild those. Do not leave Subsplash (Option C). The open pick is only **where `www` lives** — this Astro repo (Option A) or SnapPages (Option B). Do not point DNS until leadership picks.

---

## Direct answer: can we push this site to Subsplash?

**No.** There is no “import this repo into Subsplash” path.

SnapPages is a section/block website builder. It hosts pages *it created*. It is not a static-file host for an Astro `dist/`. Official custom-code support is client-side HTML/CSS/JS only. CSS is documented as fonts, colors, and backgrounds — **not** layout. Server-side runtimes (Node, Astro, PHP) are unsupported.

What *does* work:

| Direction | Mechanism | Use |
| --- | --- | --- |
| Our site ← Subsplash | Web embeds + wallet iframe (already in this repo) | Give, sermon player, app promo |
| Our site ← Subsplash | REST API (Media items / Media series) — **gated**, Client Success Manager + credentials | Auto-fill latest teaching instead of YAML |
| Subsplash app ← our site | Custom feeds (we host JSON; the app renders it) | Custom app screens, not the public website |
| SnapPages ← our design | Manual rebuild of sections/blocks + token mapping | Approximate this look inside their theme |

So “push to Subsplash” means **rebuild in SnapPages (Option B)** or **keep embedding Subsplash on this site (Option A)**. It does not mean a deploy button.

Do **not** iframe the Vercel site inside a SnapPages code block. SEO, mobile chrome, and in-app Page links all break.

---

## The fact that changes the conversation

Calvary Chapel Frederick does **not** currently build [calvaryfrederick.com](https://www.calvaryfrederick.com) in Subsplash.

Verified 16 August 2026 against the live HTML; hosting of *this repo* verified 3 September 2026:

| Layer | Who actually owns it |
| --- | --- |
| Marketing website (`www`) | **Squarespace 7.1** (`cricket-tuba-jezb`, site `60ca8cb33fc0a801c490aaed`) |
| DNS | **iPage** (`ns1.ipage.com` / `ns2.ipage.com`) |
| This rebrand (preview only) | **Astro 5**, static, **Vercel** project `calvary-frederick`, team `kairos-de62`. Domain **not** attached. |
| Giving | **Subsplash Wallet** iframe `https://wallet.subsplash.com/ui/embed/ZZ5DWR` |
| Sermon / radio / archive | **Subsplash Media** org `+8361` |
| Church app | **Subsplash** `get.theapp.co/8361/` (iOS `1224791391`) |
| Podcasts | Apple IDs already published from the Subsplash library |
| SnapPages holding site | `calvarychapelfrederick1.snappages.site` — they **already have a Websites seat**. Interiors still mostly lorem. Not `www`. |

The original brief (“they use Subsplash to build and maintain the website”) is how the *relationship* feels. It is not how the *domain* works. Giving, the app, and the sermon archive are already Subsplash. The dated look is Squarespace. The holding site is Option B started in parallel.

That split is the asset. “Move off Subsplash” and “keep using Subsplash” are both half-true unless we name **which product**.

```
                    today                         this repo (preview)
                 ┌─────────────┐                ┌──────────────────┐
  calvaryfrederick.com ──► Squarespace 7.1      │ Astro on Vercel  │
                 └─────────────┘                │  Home / Visit /  │
                                                │  Ministries /    │
                 ┌─────────────┐                │  Media / Give    │
  Give / sermons / app ──► Subsplash            └────────┬─────────┘
                 └─────────────┘                         │ embeds
                 ┌─────────────┐                         ▼
  holding site ──► SnapPages                    ┌──────────────────┐
  *.snappages.site                              │ Subsplash        │
                 └─────────────┘                │ Wallet + Media   │
                                                │ + App + Podcasts │
                                                └──────────────────┘
```

Independent 2026 reviews typically score Subsplash **app + giving** highly and the **website builder** much lower. Cincinnati — one of the three sites the church said they like — already *is* SnapPages, and they still asked for something more modern.

---

## Three options (not two)

### Option A — Keep the split (this repo as `www`)

**What it is.** This repo is the public front door. Subsplash stays the system of record for money, media, and the app.

**Who updates what**

| Weekly job | Tool | Who |
| --- | --- | --- |
| Latest sermon *title* on the homepage card | `src/data/church.yaml` via `/admin`, GitHub, or Grok | Office volunteer; Grok as backup |
| New sermon *video / audio* | Subsplash Dashboard → Media | Whoever already uploads now |
| This week’s bulletin PDF | `public/files/` + `bulletin.file` in YAML | Volunteer via `/admin` or Grok |
| Recurring gift, funds, fees | Subsplash Giving Dashboard | Treasurer / office |
| App store listing, push, live | Subsplash App Dashboard | Same as today |
| Ministry page copy | `src/data/ministries.yaml` (planned) | Volunteer / Grok |

**Benefits of hosting the website outside Subsplash**

- The cinematic hero, FTL cyan/teal, framed looping ministry videos, and Visit packing are allowed. SnapPages tells you not to fight layout with CSS.
- Own the IA, SEO (`llms.txt`, FAQ JSON-LD, sitemap), 301 map, and performance. Home does not have to load Subsplash JS.
- Content is files in Git. Grok Build, VS Code, GitHub web editor, and staff `/admin` write the **same** source.
- If the custom site fails, roll DNS back to Squarespace (or later to SnapPages). Subsplash never moved.
- Sermons published once in Subsplash still hit the app, Apple podcasts, TV apps, and the `/media` embed. We do not re-platform the archive.
- Giving, receipts, ACH, Apple Pay, and GrowCurve fees stay untouched. A $1 test on `/give` is the launch gate, not a processor migration.
- Congregants keep the app they already installed (`1224791391`).

**Costs of hosting outside**

- Two logins: GitHub (or `/admin` / Grok) for the website, Subsplash for sermons / give / app.
- Homepage sermon title is **manual** until they get Subsplash API credentials. The `/media` embed updates itself; the Home card does not scrape Subsplash.
- A GitHub remote does not exist yet. Vercel Git connect and `/admin` commits need it.
- Video transcoding, podcast RSS, TV apps, and saved giver instruments stay on Subsplash — we are not replacing that stack.
- Brand can drift: cyan/teal on the website vs whatever is currently in the app chrome, unless we push tokens into Subsplash (checklist below).

### Option B — Move the marketing site onto SnapPages

**What it is.** Cancel Squarespace. Stop using this Vercel project as the public origin. Rebuild Home / Visit / Media / Give / ministries as SnapPages sections. Point `www` at Subsplash hosting (A record `35.164.64.246`). Keep the same Wallet and Media accounts.

They already started this on `calvarychapelfrederick1.snappages.site`. Finishing it is still a full content + design project: most interiors are lorem, stock times (9:30, Sunday 6 PM, Ballard), and fake staff. Do not copy those. See [holding-site-scan.md](./holding-site-scan.md).

**Benefits of moving the website to Subsplash**

- One vendor login for website + app + give + media. Subsplash’s pitch: updates flow through automatically.
- Native **Giving block** and **Media embed** — no iframe we maintain.
- Drag-and-drop. No Git. Office staff who refuse GitHub can still change a banner.
- Church-shaped templates: sermon page, events, visit form, app promo.
- Website pages can be pulled into the app with the **Page** link type (`?embed=1`). Custom Astro pages cannot use that in-app chrome the same way.
- Dedicated Client Success Manager and ministry-hours support.
- Website and app brand settings can share a logo and colors (fonts still will not match — custom fonts are **web-only**, not the mobile app).
- Events, messaging, and forms can live in-dashboard if they later buy those modules.
- No Vercel / Git operational load for the *public site*.

**Costs / why this repo exists**

- You **cannot drop these Astro components into SnapPages**. You rebuild as sections. Cinematic hero, overlapping service-times card, motion, custom type scale, and framed looping ministry videos will be *approximated*, then fight the theme on every platform update.
- Official support: custom CSS is for *fonts, colors, and backgrounds only*; **do not use CSS to change padding, margins, or positioning**.
- Custom code is “outside the scope of SnapPages support.”
- Grok Build cannot edit SnapPages the way it edits this repo. Vibe-coding the public site stops.
- Domain, 301 map, `/s/` bulletin files, and forms all have to be rebuilt inside their hosting rules.
- SEO, CSP, and Lighthouse become whatever Subsplash ships. Native blocks load their player on more pages.
- This is a **platform change**, not a restyle. They are not on SnapPages for `www` today.

Use Option B only if leadership rejects Git / Grok / a staff `/admin` **and** accepts “better than current Squarespace, worse than the craft in this repo.”

### Option C — Leave Subsplash entirely

**What it is.** Replace Wallet, Media, the app, and podcasts (Planning Center + Pushpay, Tithely, Church Center, YouTube-only, etc.) as well as replacing Squarespace.

**Do not do Option C in this project.** Recurring gifts, the installed app, and the verse-by-verse archive are the high-pain surface. The complaint was the *look of the website*, which is Squarespace.

If a future treasurer wants it, treat it as a separate giving-and-media migration, not a website rebrand.

---

## Recommendation, in one paragraph

Keep paying Subsplash for the things they are already good at (giving, media, app). Stop asking a church-website template — Squarespace today, SnapPages if they switched — to be the craft this repo is aiming at. The Astro site is the front door; Subsplash is the engine room. Push our colors, dove, and copy *into* Subsplash so the app and give page do not look like a different church. **Leadership still has to pick A vs B before DNS.** Until then, share https://calvary-frederick.vercel.app. Do not attach calvaryfrederick.com.

---

## What we can and cannot push into Subsplash

Subsplash has no “import this Astro repo” button. Official doors:

| Door | Where in the dashboard | What it is for |
| --- | --- | --- |
| **Theme / brand** | SnapPages Theme Editor *or* App branding settings | Logo, colors. Fonts on SnapPages via **Storage → Fonts** (`.otf` `.ttf` `.woff` `.woff2`). **Custom fonts do not apply to the mobile app.** |
| **Web Embeds** | App Dashboard → **Media → Embeds** → Preview embed | Media library, most-recent item, giving, events, app promo, messaging. Works on *any* site (Astro, Squarespace, SnapPages). [Docs](https://support.subsplash.com/en/articles/9083727-web-embeds) |
| **Giving iframe / standalone link** | [wallet.subsplash.com](https://wallet.subsplash.com/) → Settings → Basic Giving Links | Type = **iFrame Embed**. Live ID is `ZZ5DWR`. [Docs](https://support.subsplash.com/en/articles/9021114-adding-subsplash-giving-to-your-website) |
| **Custom code (SnapPages only)** | Settings → Custom Code; per-block custom class | Client-side HTML/CSS/JS only. CSS should stay at colors/fonts/backgrounds. Layout CSS is unsupported. [Docs](https://support.subsplash.com/en/articles/9114488-custom-code) |
| **REST API** | Request via Client Success Manager; docs at [developer.subsplash.com](https://developer.subsplash.com/) | Media items, media series, donations, events, people, webhooks, custom feeds. **Not a free public key.** Documentation access ≠ credentials. |
| **Custom feeds** | We host JSON; Subsplash apps consume it | Custom *app* screens. Does not host the marketing website. Externally hosted feed content is not indexed in Subsplash Media Search and has no share pages / embeds. |

There is **no API key in this repo**. Homepage `sermon.title` stays manual until they get credentials.

### IDs already in production (do not invent new ones)

```
Org                 +8361
Messages library    +8shrrvh     (Sunday + Midweek + Archive — /media embed)
Sunday collection   +gymzjvw
Midweek             +w6wz2sw
Radio               +hb4hczq
Archive             +bd45vsp
Wallet iframe       https://wallet.subsplash.com/ui/embed/ZZ5DWR
App                 https://get.theapp.co/8361/
Embed script        https://dashboard.static.subsplash.com/production/web-client/external/embed-1.1.0.js
Holding site        https://calvarychapelfrederick1.snappages.site
```

Editing embed *settings* in the dashboard does **not** update old embed snippets. Generate a new snippet and replace the code on the site.

---

## How this repo talks to Subsplash today (Option A)

### `/media` — one embed, then outbound chips

`SubsplashEmbed` loads `embed-1.1.0.js` with path `church.media.messagesEmbed` (`+8361/lb/li/+8shrrvh?embed&branding`).

Chips (new tab, not extra embeds):

- Sunday → `https://subsplash.com/+8361/media/li/+gymzjvw`
- Midweek → `https://subsplash.com/+8361/media/li/+w6wz2sw`
- Archive → `https://subsplash.com/+8361/media/li/+bd45vsp`
- Radio → `https://subsplash.com/+8361/media/li/+hb4hczq`

The series grid and teaching lists are a **snapshot** in `src/data/media-catalog.json` (109 series, 917 teachings, scraped from the holding site). Playback still leaves this origin for Subsplash / SnapPages teaching URLs. We do not host the sermon files.

`/watch` 301s to `/media`.

Live is **outbound only** (YouTube + app). No in-page live player.

### `/give` — wallet iframe, this page only

```html
<iframe
  title="Give to Calvary Chapel Frederick"
  src="https://wallet.subsplash.com/ui/embed/ZZ5DWR"
  width="100%"
  style="border:0;overflow:hidden;height:min(630px,80vh)"
  loading="eager">
</iframe>
```

Never mount this iframe on Home. Home only links to `/give`.

### Home sermon card — YAML, not a live fetch

Volunteer (or Grok, or later `/admin`) pastes the latest title into `src/data/church.yaml` after the Subsplash upload. The card image is a local file (`sermon.image`). We do not scrape Subsplash thumbnails.

### App strip

Badge / button → `https://get.theapp.co/8361/`.

---

## Website content ops if Option A (the Subsplash-like tool)

Subsplash’s media library is a **staff dashboard**, not a congregant-facing upload on the public site. Recreating their encoder, CDN, podcast RSS, Roku/tvOS player, and app search is out of scope.

Three kinds of “upload”:

| Content | System of record | Tool |
| --- | --- | --- |
| Sunday video / audio, series, live | **Subsplash Media** | Subsplash dashboard (keep) |
| Gifts, funds, fees, receipts | **Subsplash Wallet** | Wallet dashboard (keep) |
| Times, bulletin PDF, homepage title, ministry copy, flags, hero poster | **This Git repo** | `/admin` + Grok + GitHub |

The tool we build is the **third row**. Public unauthenticated upload is not in scope.

### Three editor paths, one content model

```
 church.yaml            times, sermon card, bulletin, flags, giving copy
 ministries data        eight ministry pages (YAML planned; today ministries.ts)
 media-catalog.json     series snapshot (prefer API later; scrape is a stopgap)
 public/files/          bulletin PDFs
 public/images/         posters, series art, ministry stills
 public/videos/         website heroes only — not the sermon archive
        │
        ├─ Grok Build / vibe-coding
        ├─ GitHub web editor / VS Code
        └─ Staff CMS at /admin  (GitHub login, form UI)
                    │
                    ▼
              Vercel build of main
```

Grok and the volunteer form **must write the same files**. That is the whole trick.

**Staff `/admin` (planned):** Keystatic (Astro-native) or Decap fallback. GitHub OAuth, repo collaborators only. Noindexed, omitted from the public header and sitemap. Image/PDF into `public/` only. No sermon mp4s. Depends on a GitHub remote (none today).

**Grok Build** is already a CMS if the files stay structured. Never invent church facts. Never change Wallet ID, org `+8361`, or embed paths. Do not publish parking, office hours, or staff names the church has not given us.

**Optional later — Subsplash API sync:** read-only pull of Media items / Media series into `church.yaml` `sermon.*` and `media-catalog.json`. Requires CSM. Do not write media *into* Subsplash from our CMS (two-way sync duplicates the archive).

### What we will not build unless Option C is later approved

- Public unauthenticated upload
- A Mux / S3 / Cloudflare Stream sermon pipeline that replaces Subsplash encoding, podcasts, and TV apps
- An in-page live encoder
- Storing giver data
- Embedding the Vercel site in a SnapPages iframe
- Treating SnapPages custom-code blocks as a host for `dist/`

---

## Pushing *our* design into the Subsplash ecosystem

Do this even though the website is not SnapPages. The app and the give page are what members see every week.

Token names in CSS are still `--forest` / `--cream` / `--gold`. The *values* are FTL-inspired cyan/teal as of September 2026. Do not push the old green (`#3B5D46`) into the app.

### 1. Brand kit → Subsplash App

In the Subsplash App Dashboard:

1. Upload the dove lockup on the current field (`#007fa7` / `#0a3040`) as the app icon candidate and header mark.
2. Set app chrome colors:

   | Token name (CSS) | Hex | Use in Subsplash |
   | --- | --- | --- |
   | Forest | `#007fa7` | Primary / header |
   | Forest deep | `#0a3040` | Dark bars |
   | Cream | `#f7fcfe` | Background if the theme allows |
   | Ink | `#0c1418` | Body text |
   | Gold | `#00b5ef` | Accent only — check contrast on cream |
   | Brick | `#b91c1c` | Do **not** use on Give buttons |

3. Giving button in the app: cyan/teal, not red, not brick.
4. App screenshots: request an update (Subsplash limits screenshot requests; their docs say twice per year).

Custom fonts **will not** appear in the iOS/Android app. Do not promise Newsreader or Oswald in the app.

### 2. Media library artwork

In Media, set series artwork to 16:9 frames that match the site. The `/media` embed inherits that artwork.

### 3. Giving page chrome

In [wallet.subsplash.com](https://wallet.subsplash.com/) → Settings:

- Confirm the iframe ID is still `ZZ5DWR` before launch (re-copy if they regenerate).
- Re-verify published fees (live on 16 Aug 2026: card **2.3% + $0.30**, ACH **1.0% + $0.30**). GrowCurve can change these with no notice to our repo.
- Set the standalone give URL as the fallback on `/give`.

### 4. “Most recent media” embed (optional)

If a future volunteer does not want to edit YAML, generate the **Most Recent Media Item** embed and put it on Home *instead of* `SermonCard`. Trade-off: we lose control of typography and LCP (Subsplash JS on Home). Stay on YAML until API sync exists.

---

## If leadership later wants Option B (SnapPages rebuild)

Port *this repo* into Subsplash’s website product without starting from a blank moodboard. Do not run this in parallel with finishing Option A as `www`.

### Preconditions

- They already have the SnapPages seat (holding site proves it).
- Brand lock on cyan/teal / dove / type is signed.
- Someone accepts that Visit packing, motion, framed looping heroes, and exact type scale will be *approximated*.
- Someone accepts that Grok / this Git repo stop being the public-site CMS.

### Port checklist (in order)

1. **Use the existing SnapPages site** in org `+8361` / wallet `ZZ5DWR`. Do not point DNS yet. Keep `*.snappages.site` as preview.
2. **Strip lorem.** Holding-site interiors are template. Real facts only: Sunday 9 & 11, Wednesday 7, midday prayer Mon/Wed/Fri 12:15–12:45, kids Sunday infants–5th / Wed 3–11, pastor bio as already published.
3. **Storage → Fonts.** Upload licensed files only. Theme Editor → Typography.
4. **Theme colors.** Map the September 2026 table above. Background cream, primary `#007fa7`, text ink. Gold/cyan decorative only.
5. **Logo.** Header = dove + wordmark PNG (flattened; SnapPages will not run `Logo.astro`).
6. **Rebuild as sections, not 20 pages of template ministries.**
   - Home: hero + Plan a Visit + times + most-recent media or media-library embed + bulletin + app promo + text link to Give.
   - Visit: times, numbered blocks, SnapPages form, beliefs as GOD / BIBLE / MAN / THE CHURCH.
   - Media: **one** Media Library embed on `+8shrrvh`. Links for the four collection URLs.
   - Ministries: their eight labels (Preschool, Children, Students, Young Adults, Women, Men, Small Groups, Volunteer) with *published* copy only.
7. **Give.** Native Giving block. Keep the 2 Cor 9:7 / Matt 6:3–4 paragraph above it.
8. **Custom Code → header snippet** — only tokens, not layout:

   ```css
   :root {
     --forest: #007fa7;
     --forest-deep: #0a3040;
     --cream: #f7fcfe;
     --ink: #0c1418;
     --gold: #00b5ef;
   }
   ```

   Do not ship our grid, negative-margin service card, or `translateY` hero.
9. **Redirects.** Recreate the 301 table from the design doc inside SnapPages. There is no `vercel.json` / `_redirects` they will honor for this origin. `/s/*` bulletin files must be re-uploaded to SnapPages storage.
10. **QA.** Phone, VoiceOver, giving $1, media embed, Plan a Visit inbox.
11. **DNS.** Same iPage cutover as the Astro plan, but the A record target is Subsplash’s `35.164.64.246`. Keep Path A (do not touch MX).

### What transfers vs what dies

| From this repo | SnapPages |
| --- | --- |
| Color tokens, dove, photos, visit copy, beliefs headings | Yes |
| `church.yaml` / Grok / `/admin` volunteer workflow | **No** — they edit in the page builder |
| Astro components, overlapping hero card, framed looping ministry videos | **No** (approximate) |
| Basin + Turnstile forms | Only via custom-code embed; native SnapPages forms are the path of least resistance |
| `vercel.json` headers / CSP | Rebuild; CSP will be whatever Subsplash sends |
| Lighthouse 95+ Home (no Subsplash JS) | **No** — native blocks load their player on more pages |
| `media-catalog.json` custom series pages | **No** — use native media library |

---

## Weekly operating rhythm (Option A)

After launch, almost nothing in this repo is a Subsplash code push. The ecosystem already updates itself.

| Change | Where you do it | Then what |
| --- | --- | --- |
| New Sunday message uploaded | Subsplash → Media | App, podcasts, `/media` embed update automatically. **Also** edit `sermon.title` (and `sermon.series` if needed) in `church.yaml` so Home matches. |
| New bulletin PDF | Drop in `public/files/`. Set `bulletin.file`. Commit / `/admin` / Grok. | Vercel rebuilds. |
| Service time change | `church.yaml` → `services` | Same Git path. |
| Men’s Mark study line | `church.yaml` → `men.blurb` | Same. |
| Hide / show Israel or VBS | `flags.*` | Default off. |
| New fund or fee | Subsplash Giving Dashboard | Re-copy fee strings into `giving.fees` so `/give` copy stays honest. |
| App screenshot / icon | Subsplash App Update Request | Not a website PR. |
| New embed settings (autoplay, chrome) | Media → Embeds → **new** snippet | Replace the snippet in `SubsplashEmbed.astro`. Old snippets do not pick up dashboard edits. |

Volunteer runbook for the YAML half lives in the repo root `README.md`. Content-ops detail: `docs/content-ops.md` (when PR 2 lands).

---

## Risks if we ignore this split

| Risk | Severity | Mitigation |
| --- | --- | --- |
| Leadership thinks we are “leaving Subsplash” and the treasurer panics about giving | High | This doc + a $1 gift on preview before DNS cut |
| We rebuild sermons in a custom CMS | High | Out of scope. Embed + Subsplash dashboard. |
| We move the site onto SnapPages “to keep one vendor” and lose the craft they asked for | High | Option B is documented, not automatic |
| We iframe Vercel inside SnapPages | High | Do not. Pick A or B. |
| App and website look like two churches | Med | Push cyan/teal + dove into App branding |
| Home sermon title stale for weeks | Med | `/admin` + README checklist; later API |
| Someone pastes a new embed snippet on Home and blows the JS budget | Med | Embed script is `/media` only; iframe is `/give` only |
| Public upload form on the church site | High | Not in scope. Staff `/admin` for website files only. |

---

## Open items for the church (Subsplash-specific)

These are in addition to the parking / office-hours / skyline items in the design doc.

1. **Pick Option A or B** before DNS. Share https://calvary-frederick.vercel.app next to the holding site.
2. Confirm who already has the **App Dashboard** and **Giving Dashboard** logins. Needed for the brand-push and the $1 test — not to rebuild anything.
3. Confirm who uploads Sunday media today. They keep doing that in Subsplash either way.
4. Confirm the pastoral / treasurer owner for GrowCurve fee changes so `/give` copy can be updated.
5. Optional: ask the Client Success Manager for **REST API** access (read media items / series). Documentation access is [developer.subsplash.com/form](https://developer.subsplash.com/form/) and does not include credentials.
6. GitHub remote: still none. `/admin` and Vercel Git connect cannot commit until a private repo exists.

---

## References

- Preview (this repo): https://calvary-frederick.vercel.app
- Live site (Squarespace): https://www.calvaryfrederick.com
- SnapPages holding site: https://calvarychapelfrederick1.snappages.site
- Subsplash media hub: https://subsplash.com/calvarychapelfrederick/media
- Web Embeds: https://support.subsplash.com/en/articles/9083727-web-embeds
- Giving on any website: https://support.subsplash.com/en/articles/9021114-adding-subsplash-giving-to-your-website
- SnapPages custom code limits: https://support.subsplash.com/en/articles/9114488-custom-code
- Custom fonts (web only, not the app): https://support.subsplash.com/en/articles/9171496-custom-fonts
- Subsplash API: https://support.subsplash.com/en/articles/11610463-subsplash-api
- Custom feeds (apps, not the marketing site): https://support.subsplash.com/en/articles/16563944-custom-feeds-for-subsplash-apps
- Design this companion serves: `docs/website-rebrand-design.md`
