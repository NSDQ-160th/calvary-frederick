# Subsplash: stay, leave, or keep the split

| Field | Value |
| --- | --- |
| **Document** | Companion to the website rebrand design |
| **Customer** | Calvary Chapel Frederick |
| **Date** | 16 August 2026 |
| **Status** | Decision guide (does not change v1 architecture) |
| **Related** | [Website rebrand design](./website-rebrand-design.md) |

This is the document to hand a pastor, office volunteer, or Subsplash account manager. It answers three questions:

1. Are they “on Subsplash” today?
2. What is gained and lost if the *marketing website* moves onto Subsplash SnapPages, stays off it, or if they leave Subsplash entirely?
3. How do we push the brand, copy, and weekly updates we are building here into the Subsplash ecosystem they already pay for?

**v1 decision (already locked):** replace the Squarespace marketing shell with the Astro site in this repo. **Keep Subsplash** for giving, sermons, live/on-demand media, podcasts, and the church app. Do not rebuild those. Do not move the front door onto SnapPages unless leadership later rejects Git *and* accepts a template ceiling.

---

## The fact that changes the conversation

Calvary Chapel Frederick does **not** currently build [calvaryfrederick.com](https://www.calvaryfrederick.com) in Subsplash.

Verified 16 August 2026 against the live HTML:

| Layer | Who actually owns it |
| --- | --- |
| Marketing website (`www`) | **Squarespace 7.1** (`cricket-tuba-jezb`, site `60ca8cb33fc0a801c490aaed`) |
| DNS | **iPage** (`ns1.ipage.com` / `ns2.ipage.com`) |
| Giving | **Subsplash Wallet** iframe `https://wallet.subsplash.com/ui/embed/ZZ5DWR` |
| Sermon / radio / archive library | **Subsplash Media** org `+8361` |
| Church app | **Subsplash** `get.theapp.co/8361/` (iOS `1224791391`) |
| Podcasts | Apple IDs already published from the Subsplash library |

The original brief (“they use Subsplash to build and maintain the website”) is how the *relationship* feels — one vendor for “church digital” — but it is not how the *domain* works. Giving, the app, and the sermon archive are already Subsplash. The dated look is Squarespace.

That split is the asset. It means “move off Subsplash” and “keep using Subsplash” are both half-true unless we name **which product**.

```
                    today                         v1 (this project)
                 ┌─────────────┐                ┌──────────────────┐
  calvaryfrederick.com ──► Squarespace 7.1      │ Astro on Pages   │
                 └─────────────┘                │  Home / Visit /  │
                                                │  Watch / Give    │
                 ┌─────────────┐                └────────┬─────────┘
  Give / sermons / app ──► Subsplash            embeds + │ deep links
                 └─────────────┘                         ▼
                                                ┌──────────────────┐
                                                │ Subsplash        │
                                                │ Wallet + Media   │
                                                │ + App + Podcasts │
                                                └──────────────────┘
```

Subsplash *does* sell a website builder (historically **SnapPages**, still the product in their support docs). Independent reviews in 2026 typically score the **app + giving** highly and the **website builder** much lower. Cincinnati — one of the three sites the church said they like — already *is* a SnapPages site, and the church still asked for something more modern.

---

## Three options (not two)

### Option A — Keep the split (recommended, v1)

**What it is.** This repo is the public front door. Subsplash stays the system of record for money, media, and the app.

**Who updates what**

| Weekly job | Tool | Who |
| --- | --- | --- |
| Latest sermon *title* on the homepage card | `src/data/church.yaml` in GitHub | Volunteer |
| New sermon *video / audio* | Subsplash Dashboard → Media | Whoever already uploads now |
| This week’s bulletin PDF | `public/files/` + `bulletin.file` in YAML | Volunteer |
| Recurring gift, funds, fees | Subsplash Giving Dashboard | Treasurer / office |
| App store listing, push, live | Subsplash App Dashboard | Same as today |

**Benefits**

- The new site can look like Calvary NM / Harvest.church, not a 2021 church template.
- Sermons published once in Subsplash still hit the app, Apple podcasts, TV apps, and the `/watch` embed. We do not re-platform the archive.
- Giving, receipts, ACH, Apple Pay, and GrowCurve fees stay untouched. A $1 test on `/give` is the launch gate, not a processor migration.
- Congregants keep the app they already installed (`1224791391`).
- If the custom site ever fails, roll DNS back to Squarespace; Subsplash never moved.
- We own typography, IA, “Plan a Visit,” accessibility, and performance. Subsplash’s official CSS guidance is the opposite: *do not use custom CSS to change layout*.

**Costs**

- Two places to log in: GitHub (or this repo) and the Subsplash dashboard.
- Homepage sermon title is **manual**. The embed on `/watch` updates itself; the Home card does not scrape Subsplash.
- A volunteer must be willing to edit one YAML file (already decided 16 Aug 2026).
- Brand can drift: forest/cream on the website vs whatever is currently in the app chrome, unless we push tokens into Subsplash (see below).

### Option B — Move the marketing site *onto* Subsplash SnapPages

**What it is.** Cancel Squarespace. Rebuild Home / Visit / Watch / Give as SnapPages pages. Point `www` at Subsplash hosting. Keep the same Wallet and Media accounts.

**Benefits of continued / deeper Subsplash use**

- One vendor login for website + app + give + media. Subsplash’s own pitch: “updates flow through automatically.”
- Native **Giving block** and **Media embed** — no iframe we have to maintain.
- Drag-and-drop. No Git. Office staff who refuse GitHub can still change a banner.
- Church-shaped templates: sermon page, events, visit form, app promo.
- Dedicated Client Success Manager and ministry-hours support.
- Website and app brand settings can be pointed at the same logo and colors (fonts still will not match — custom fonts are **web-only**, not the mobile app).
- Events, messaging, and forms can live in-dashboard if they later buy those modules.

**Costs / why this is not v1**

- SnapPages is a theme system. Official support: custom CSS is for *fonts, colors, and backgrounds only*; **do not use CSS to change padding, margins, or positioning** or you fight the theme and future platform updates. That forbids the cinematic hero, overlapping service-times card, Visit scroll contract, and motion we specified.
- Independent 2026 write-ups score Subsplash ~4.5/5 for app+giving and ~2.5/5 for the website builder. That matches what we saw at cccincinnati.org (SnapPages, gold palette, dated chrome).
- You cannot drop our Astro components into SnapPages. You can only *approximate* them with sections/blocks + a token mapping (procedure below).
- Custom code is officially “outside the scope of SnapPages support.”
- Domain, 301 map, `/s/` bulletin files, and Basin forms all have to be rebuilt inside their hosting rules.
- This is a **platform change**, not a restyle. They are not on SnapPages today. Moving onto it is a new contract conversation, not “turn on a feature they already have.”

Use Option B only if (a) Git is later refused, **and** (b) leadership accepts “better than current Squarespace, worse than the Harvest-class craft in the design doc.”

### Option C — Leave Subsplash entirely

**What it is.** Replace Wallet, Media, the app, and podcasts with something else (Planning Center + Pushpay, Tithely, Church Center, YouTube-only, etc.) as well as replacing Squarespace.

**Benefits of leaving Subsplash**

- One fewer SaaS invoice if they are paying for website+app+give as a bundle they barely use.
- No Subsplash embed script or wallet iframe on the origin (smaller JS, simpler CSP).
- Giving UX and sermon player can be designed end-to-end (rare, expensive).
- No GrowCurve fee schedule they do not control.

**Costs — this is the high-risk option**

- Every current giver’s saved card/ACH and recurring gift has to be re-entered or migrated. Churches lose money in that month.
- The iOS app (`1224791391`, “Calvary Chapel Frederick”) and Android package go dark unless a new app is built and the congregation is retrained.
- The verse-by-verse archive (`+bd45vsp`), Sunday (`+gymzjvw`), Midweek (`+w6wz2sw`), and Truth with Grace radio (`+hb4hczq`) have to be exported and re-hosted. Podcasts (`212993025`, `389963244`, `1378653159`) need new RSS.
- There is **no pastoral or treasurer reason** in the current brief to take this pain. The complaint was the *look of the website*, which is Squarespace.

**Do not do Option C in this project.** If a future treasurer wants it, treat it as a separate giving-and-media migration, not a website rebrand.

---

## Recommendation, in one paragraph

Keep paying Subsplash for the things they are already good at (giving, media, app). Stop asking a church-website template — Squarespace today, SnapPages if they switched — to be the craft of Calvary NM or Harvest.church. The Astro site is the front door; Subsplash is the engine room. Push our colors, dove, and copy *into* Subsplash so the app and give page do not look like a different church.

---

## What we can and cannot push into Subsplash

Subsplash has no “import this Astro repo” button. There are four official doors:

| Door | Where in the dashboard | What it is for |
| --- | --- | --- |
| **Theme / brand** | SnapPages Theme Editor *or* App branding settings | Logo, colors. Fonts on SnapPages via **Storage → Fonts** (`.otf` `.ttf` `.woff` `.woff2`). **Custom fonts do not apply to the mobile app.** |
| **Web Embeds** | App Dashboard → **Media → Embeds** → Preview embed | Media library, most-recent item, giving, events, app promo, messaging. Works on *any* site (Astro, Squarespace, SnapPages). [Docs](https://support.subsplash.com/en/articles/9083727-web-embeds) |
| **Giving iframe / standalone link** | [wallet.subsplash.com](https://wallet.subsplash.com/) → Settings → Basic Giving Links | Type = **iFrame Embed**. Their live ID is `ZZ5DWR`. [Docs](https://support.subsplash.com/en/articles/9021114-adding-subsplash-giving-to-your-website) |
| **Custom code (SnapPages only)** | Settings → Custom Code; per-block custom class | Client-side HTML/CSS/JS only. CSS should stay at colors/fonts/backgrounds. Layout CSS is unsupported. [Docs](https://support.subsplash.com/en/articles/9114488-custom-code) |

There is **no public API** we will call in v1 to set the homepage sermon card. That is why `church.yaml` `sermon.title` is manual.

### IDs already in production (do not invent new ones)

Copy these into embeds. They are observed, not guessed.

```
Org                 +8361
Messages library    +8shrrvh     (Sunday + Midweek + Archive — this is the /watch embed)
Sunday collection   +gymzjvw
Midweek             +w6wz2sw
Radio               +hb4hczq
Archive             +bd45vsp
Wallet iframe       https://wallet.subsplash.com/ui/embed/ZZ5DWR
App                 https://get.theapp.co/8361/
Embed script        https://dashboard.static.subsplash.com/production/web-client/external/embed-1.1.0.js
```

Editing embed *settings* in the dashboard does **not** update old embed snippets. You must generate a new snippet and replace the code on the site.

---

## How this repo talks to Subsplash (v1, Option A)

Implementers: this is the contract. Do not add a Subsplash CMS.

### `/watch` — one embed, then outbound chips

```html
<div id="subsplash-embed-8shrrvh"></div>
<script>
  // load embed-1.1.0.js only on this route
  subsplashEmbed(
    "+8361/lb/li/+8shrrvh?embed&branding",
    "https://subsplash.com/",
    "subsplash-embed-8shrrvh"
  );
</script>
```

Chips (new tab, not extra embeds):

- Sunday → `https://subsplash.com/+8361/media/li/+gymzjvw`
- Midweek → `https://subsplash.com/+8361/media/li/+w6wz2sw`
- Archive → `https://subsplash.com/+8361/media/li/+bd45vsp`
- Radio → `https://subsplash.com/+8361/media/li/+hb4hczq`

Live is **outbound only** (YouTube + app). No in-page live player.

### `/give` — wallet iframe, created on this page only

```html
<iframe
  title="Give to Calvary Chapel Frederick"
  src="https://wallet.subsplash.com/ui/embed/ZZ5DWR"
  width="100%"
  style="border:0;overflow:hidden;height:min(630px,80vh)"
  loading="eager">
</iframe>
<p><a href="https://wallet.subsplash.com/ui/embed/ZZ5DWR">Open giving on Subsplash</a></p>
```

Never mount this iframe on Home. Home only links to `/give`.

### Home sermon card — YAML, not a live fetch

Volunteer pastes the latest title into `src/data/church.yaml` after the Subsplash upload. The card image is a local file (`sermon.image`). We do not scrape Subsplash thumbnails.

### App strip

Badge / button → `https://get.theapp.co/8361/`. Optional: generate the **Mobile and TV App Promo** embed from Media → Embeds if they want the official store-shot widget instead of our badges.

---

## Pushing *our* design into the Subsplash ecosystem

Do this even though the website is not SnapPages. The app and the give page are what members see every week.

### 1. Brand kit → Subsplash App (do this during PR 2–4)

In the Subsplash App Dashboard (the same place they request App Store screenshot updates):

1. Upload the **dove-on-forest** lockup (transparent dove on `#3B5D46`, cream stroke) as the app icon candidate and header mark. They already use the dove; we are only changing the field behind it.
2. Set app chrome colors to the proposed tokens:

   | Token | Hex | Use in Subsplash |
   | --- | --- | --- |
   | Forest | `#3B5D46` | Primary / header |
   | Forest deep | `#2A4333` | Dark bars |
   | Cream | `#F6F1E8` | Background if the theme allows |
   | Ink | `#1C1A17` | Body text |
   | Gold | `#C4A36A` | Accent only — never body type (fails contrast) |
   | Brick | `#8E3D32` | Do **not** use on Give buttons |

3. Giving button in the app: forest, not red, not brick.
4. App screenshots: request an update (Subsplash limits screenshot requests; their docs say twice per year). Use Jefferson Street / sanctuary frames, not the homemade “Watch Live” PNG.

Custom fonts **will not** appear in the iOS/Android app. Do not promise Newsreader in the app. Source Sans–like system UI is fine there.

### 2. Media library artwork

In Media, set series artwork for **Hebrews** (and future series) to 16:9 frames that match the site (`--forest` overlay, Newsreader-style title treated as *image*, because the player will not load our fonts). The `/watch` embed inherits that artwork.

### 3. Giving page chrome

In [wallet.subsplash.com](https://wallet.subsplash.com/) → Settings:

- Confirm the iframe ID is still `ZZ5DWR` before launch (re-copy if they regenerate).
- Re-verify published fees (live on 16 Aug 2026: card **2.3% + $0.30**, ACH **1.0% + $0.30**). GrowCurve can change these with no notice to our repo.
- Set the standalone give URL as the fallback on `/give`.
- Optional: Custom Link Generator for a missions-only iframe later. Not v1.

### 4. “Most recent media” embed (optional, not v1)

If a future volunteer does not want to edit YAML, generate the **Most Recent Media Item** embed and put it on Home *instead of* `SermonCard`. Trade-off: we lose control of typography and LCP (Subsplash JS on Home, which the design forbids). Stay on YAML for v1.

---

## If leadership later wants Option B (SnapPages rebuild)

This is the playbook to port *this repo* into Subsplash’s website product without starting from a blank moodboard. Do not start this in parallel with PRs 1–8.

### Preconditions

- They have (or buy) the SnapPages / Subsplash Websites seat. Today they only have media + give + app.
- Brand lock on forest / dove / type is signed.
- Someone accepts that Visit packing, motion, and exact type scale will be *approximated*.

### Port checklist (in order)

1. **Create the SnapPages site** in the same org (`+8361`). Do not point DNS yet. Use their default `*.snappages.site` (or current equivalent) preview.
2. **Storage → Fonts.** Upload the four licensed files only: Newsreader 500, Newsreader italic 400, Source Sans 3 400, Source Sans 3 600. Theme Editor → Typography → My Fonts. Display = Newsreader, Body/UI = Source Sans 3.
3. **Theme colors.** Map the table in §1. Background cream, primary forest, text ink. Gold decorative only.
4. **Logo.** Header = dove-on-forest + wordmark PNG (flattened; SnapPages will not run our `Logo.astro`).
5. **Rebuild three pages as sections, not 20.**
   - Home: hero image + Plan a Visit button + times + one “most recent media” or media-library embed + bulletin file link + app promo embed + text link to Give.
   - Visit: times, four numbered blocks, SnapPages form (or keep Basin via custom-code embed if they want the same inbox), beliefs as four collapsed sections titled GOD / BIBLE / MAN / THE CHURCH.
   - Watch: **one** Media Library embed on `+8shrrvh`. Buttons/links for the four collection URLs. No four stacked players.
6. **Give.** Drag the native Giving block (easier than our iframe). Keep the 2 Cor 9:7 / Matt 6:3–4 paragraph above it.
7. **Custom Code → header snippet** — only tokens, not layout:

   ```css
   :root {
     --forest: #3B5D46;
     --forest-deep: #2A4333;
     --cream: #F6F1E8;
     --ink: #1C1A17;
     --gold: #C4A36A;
   }
   ```

   Do not ship our grid, negative-margin service card, or `translateY` hero. That is the class of CSS SnapPages tells you not to write.
8. **Redirects.** Recreate the 301 table from the design doc inside SnapPages hosting / page settings. There is no `public/_redirects`. `/s/*` bulletin files must be re-uploaded to SnapPages storage and old URLs mapped by hand.
9. **QA.** Phone, VoiceOver, giving $1, Watch embed, Plan a Visit inbox.
10. **DNS.** Same iPage cutover as the Astro plan, but the CNAME target is Subsplash’s host, not Cloudflare Pages. Keep Path A (do not touch MX).

### What transfers vs what dies

| From this repo | SnapPages |
| --- | --- |
| Color tokens, dove, photos, visit copy, beliefs headings | Yes |
| `church.yaml` volunteer workflow | **No** — they edit in the page builder |
| Astro components, hash.ts, overlapping hero card | **No** |
| Basin + Turnstile forms | Only via custom-code embed; native SnapPages forms are the path of least resistance |
| `_redirects` / `_headers` CSP | Rebuild; CSP will be whatever Subsplash sends |
| Lighthouse 95+ Home (no Subsplash JS) | **No** — native blocks load their player on more pages |

---

## Weekly operating rhythm (what “updates” means)

After launch, almost nothing in this repo is a Subsplash code push. The ecosystem already updates itself.

| Change | Where you do it | Then what |
| --- | --- | --- |
| New Sunday message uploaded | Subsplash → Media | App, podcasts, `/watch` embed update automatically. **Also** edit `sermon.title` (and `sermon.series` if needed) in `church.yaml` so Home matches. |
| New bulletin PDF | Save as the public slug (keep `-pdf` if that is how `/s/` was spelled). Drop in `public/files/`. Set `bulletin.file`. Open a GitHub PR / commit on `main`. | Site rebuilds on Cloudflare Pages. |
| Service time change | `church.yaml` → `services` | Same Git path. |
| Men’s Mark study line | `church.yaml` → `men.blurb` | Same. |
| Hide / show Israel or VBS | `flags.*` | Default off. |
| New fund or fee | Subsplash Giving Dashboard | Re-copy fee strings into `giving.fees` at the next commit so `/give` copy stays honest. |
| App screenshot / icon | Subsplash App Update Request | Not a website PR. |
| New embed settings (autoplay, chrome) | Media → Embeds → **new** snippet | Replace the snippet in `SubsplashEmbed.astro`. Old snippets do not pick up dashboard edits. |

Volunteer runbook for the YAML half lives in the repo root `README.md`.

---

## Risks if we ignore this split

| Risk | Severity | Mitigation |
| --- | --- | --- |
| Leadership thinks we are “leaving Subsplash” and the treasurer panics about giving | High | This doc + a $1 gift on preview before DNS cut |
| We rebuild sermons in a custom CMS | High | Out of scope. One embed. |
| We move the site onto SnapPages “to keep one vendor” and lose the craft they asked for | High | Option B is documented, not default |
| App and website look like two churches | Med | Push tokens + dove into App branding (checklist above) |
| Home sermon title stale for weeks | Med | README checklist; optional later “most recent” embed |
| Someone pastes a new embed snippet on Home and blows the JS budget | Med | Embed script is `/watch` only; iframe is `/give` only |

---

## Open items for the church (Subsplash-specific)

These are in addition to the parking / office-hours / skyline items in the design doc.

1. Confirm who already has the **App Dashboard** and **Giving Dashboard** logins. We will need them for the brand-push and the $1 test — not to rebuild anything.
2. Confirm whether they pay for a **SnapPages / Websites** seat they are not using. If yes, note it; still do not switch v1 onto it.
3. Confirm the pastoral / treasurer owner for GrowCurve fee changes so `/give` copy can be updated.

---

## References

- Live site (Squarespace): https://www.calvaryfrederick.com
- Subsplash media hub: https://subsplash.com/calvarychapelfrederick/media
- Subsplash website product pitch: https://www.subsplash.com/blog/build-a-church-website-fast-with-subsplash
- Web Embeds: https://support.subsplash.com/en/articles/9083727-web-embeds
- Giving on any website: https://support.subsplash.com/en/articles/9021114-adding-subsplash-giving-to-your-website
- SnapPages custom code limits: https://support.subsplash.com/en/articles/9114488-custom-code
- Custom fonts (web only, not the app): https://support.subsplash.com/en/articles/9171496-custom-fonts
- Design this companion serves: `docs/website-rebrand-design.md`
