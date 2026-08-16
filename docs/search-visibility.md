# Search visibility plan — Calvary Chapel Frederick

| Field | Value |
| --- | --- |
| **Status** | Plan + first implementation (Visit + global head) |
| **Date** | 16 August 2026 |
| **Goal** | Be the clear answer when someone in Frederick (or nearby) asks Google or an AI assistant for a Bible-teaching church |

This is the plan for **SEO** (Google/Bing), **local pack**, and **AI/answer engines** (AEO, GEO, AIEO, LLMEO — same job, different labels). We do not chase every acronym as a separate product. We make facts consistent, machine-readable, and easy to quote.

---

## What people actually type or ask

Primary intents (highest value):

| Query shape | Example | Landing page |
| --- | --- | --- |
| Local church | “church in Frederick MD”, “churches near me Frederick” | `/` and `/visit` |
| Brand | “Calvary Chapel Frederick”, “Calvary Frederick” | `/` |
| Visit logistics | “Calvary Chapel Frederick service times”, “Sunday service downtown Frederick” | `/visit` |
| Kids | “church with children’s ministry Frederick MD” | `/visit#kids` |
| Teaching | “verse by verse church Frederick”, “Calvary Chapel Maryland sermons” | `/watch` |

AI assistants rephrase those as: *“What’s a good Bible-teaching church in Frederick, Maryland, and when do they meet?”* The site must answer in one short, consistent paragraph (that is AEO/GEO).

---

## Principles (all flavors of “EO”)

1. **One NAP.** Name, address, phone, times, pastor — identical in HTML, schema, `llms.txt`, footer, and Google Business Profile.
2. **First sentence is the answer.** FAQ and visit copy lead with the fact, then context.
3. **Do not invent.** Parking, office hours, service length, and dress stay unpublished until the church writes them. Invented logistics get quoted by AI and become a reputation problem.
4. **Entities over keywords.** “Calvary Chapel Frederick” + “Frederick, Maryland” + “verse by verse” + Pastor David Ochoa, repeated cleanly — not stuffed.
5. **Allow reputable crawlers.** `robots.txt` allows Google, Bing, GPTBot, OAI-SearchBot, Claude, Perplexity, Applebot-Extended. Revisit if leadership wants to opt out of training (`Google-Extended`, `GPTBot`).
6. **Off-site is half the game.** The website cannot win “near me” without a claimed Google Business Profile, consistent Facebook/Apple Maps, and a few local citations.

---

## Acronyms, decoded

| Label | What it means here | What we ship |
| --- | --- | --- |
| **SEO** | Rank and click in Google/Bing | Titles, descriptions, headings, sitemap, canonical, speed, internal links |
| **Local SEO** | Map pack / “near me” | `Church` JSON-LD, NAP, GBP (off-site), service-area language |
| **AEO** | Answer engines / featured snippets / voice | FAQ with question headings, `FAQPage` schema, short first sentences |
| **GEO** | Generative engines (AI Overviews, ChatGPT search, Perplexity) | `llms.txt`, quote-ready facts, `sameAs`, no contradictions |
| **AIEO / LLMEO** | Same as GEO under newer names | Same work. No extra plugin or “AI SEO” vendor required |
| **E-E-A-T** | Trust | Real address, phone, pastor bio, HTTPS, privacy page (PR 7) |

Ignore vendors selling “LLMEO packages.” The work is structured facts + crawl access + local listings.

---

## Already implemented (this pass)

- Global `<title>`, meta description, canonical, Open Graph, Twitter card (`Seo.astro`)
- `Church` JSON-LD on every page (`src/data/schema.ts`)
- `FAQPage` JSON-LD on Home (full set) and Visit (visit set)
- Breadcrumbs on Visit
- Answer-first FAQ on `/visit#faq`
- `public/sitemap.xml`
- `public/robots.txt` (search + AI bots)
- `public/llms.txt` (plain-language church card for models)
- Visit H1/title/description name the city, times, and “plan a visit”

---

## Next implementation slices (after Visit)

### On-site (code)

| Slice | Work |
| --- | --- |
| **PR 7 remainder** | `/privacy`, 301 table from Squarespace, OG 1200×630 crop, `@astrojs/sitemap` instead of the static file |
| **Watch SEO** | Title “Watch sermons — verse by verse”, CollectionPage schema, transcript later if they ever publish text |
| **Speakable** | Optional `SpeakableSpecification` on the visit FAQ answers (Google support is limited; low priority) |
| **Internal links** | Footer already helps. Add “Church in Frederick, MD” once in footer body copy, naturally |
| **Images** | Real church photos with `alt` (“Children’s ministry at Calvary Chapel Frederick”) when assets arrive |
| **Performance** | Hero MP4 is the LCP risk. Keep poster-less video; compress further if LCP > 2.5s on mobile |

### Off-site (church + us, not in the repo)

1. **Claim / clean Google Business Profile** — category Church, hours = Sunday 9 & 11 and Wednesday 7, photos, website = this domain, UTM-free URL.
2. **Apple Maps / Facebook place** — same NAP string: `244A S Jefferson St, Frederick, MD 21701`, `301-663-4485`.
3. **Calvary Chapel Association directory** if they are listed — match the name exactly.
4. **Do not** buy citation spam or “100 directories.”
5. After launch: Search Console + Bing Webmaster; submit sitemap.

### Optional later

- A short `/visit` FAQ in Spanish only if they actually minister in Spanish (they do not publish that today).
- Blog/news is **out of scope**. A thin blog hurts more than it helps for a 3-page church site.

---

## Copy rules for AI quotation

Safe to publish and repeat:

- Name, address, phone, email, times, kids age ranges (the decided `/im-new` reading), pastor arc, no plate, verse-by-verse, Calvary Chapel.

Never let a model invent:

- Parking, service length, dress code, office hours, café as a public amenity, extra staff, VBS dates.

If an AI Overview is wrong after launch, the fix is GBP + this site saying the fact in one sentence, not a press release.

---

## Success (90 days after DNS cut)

- Brand query “Calvary Chapel Frederick” → this site #1, correct knowledge panel-ish facts
- “church Frederick MD” / “Calvary Chapel Maryland” → first-page or local pack presence (competition is real; pack is the win)
- ChatGPT / Perplexity / AI Overview, when asked for a Frederick Calvary Chapel, cite **244A S Jefferson**, **Sunday 9 & 11**, **Pastor David**
- No hallucinated Saturday service or invented campus

---

## Related

- Design: `docs/website-rebrand-design.md` (SEO section)
- Workshop gaps: `docs/workshop.md` (parking and office hours would strengthen local answers *after* they are confirmed)
