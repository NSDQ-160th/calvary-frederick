# Hero video

The homepage plays `hero.mp4` full-bleed behind the headline, the same way [calvarynm.church](https://calvarynm.church/) does.

**To swap the clip:** replace this file with any MP4 (16:9, 10–20 seconds, no audio needed). Keep the filename `hero.mp4`, or change `hero.video` in `src/data/church.yaml`.

The still at `/images/hero-poster.jpg` is the first frame while the file loads.

The file in this folder now is a **placeholder**: Pexels 19384325 (Eric Skaggs, free license) — a historic American downtown aerial in the register of [ccpalmharbor.org](https://www.ccpalmharbor.org/). It is **not** Frederick. True Frederick drone clips on Getty / Adobe / Envato need a paid license. Swap this MP4 for church-shot downtown / Gambrill / building footage when it arrives.

## Ministry heroes

Each `/ministries/{slug}` page plays a muted 16:9 loop in a framed player (`VideoFrame.astro`), the way [calvarycch.org](https://calvarycch.org) sits a video in a frame on the home hero.

Clips live in `ministries/` and are temporary Pexels stock (people, not church footage). Swap the MP4, keep the filename, or change `video` in `src/data/ministries.ts`.
