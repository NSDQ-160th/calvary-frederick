# Hero video

The homepage plays `hero.mp4` full-bleed behind the headline, the same way [calvarynm.church](https://calvarynm.church/) does.

**To swap the clip:** replace this file with any MP4 (16:9, 10–20 seconds, no audio needed). Keep the filename `hero.mp4`, or change `hero.video` in `src/data/church.yaml`.

The still at `/images/hero-frederick.jpg` is the poster while the file loads, and the fallback if video is empty or motion is reduced.

The file in this folder now is a temporary royalty-free rocky-beach clip (Pexels, waves at golden hour) so the church can see real motion. Replace it with a Frederick/congregation video before launch.

## Ministry heroes

Each `/ministries/{slug}` page plays a muted 16:9 loop in a framed player (`VideoFrame.astro`), the way [calvarycch.org](https://calvarycch.org) sits a video in a frame on the home hero.

Clips live in `ministries/` and are temporary Pexels stock (people, not church footage). Swap the MP4, keep the filename, or change `video` in `src/data/ministries.ts`.
