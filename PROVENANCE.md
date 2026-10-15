# Provenance

What this copy is made of and where each part comes from. The figures are read from the build's records; `PROVENANCE.json` holds them as data. See `README.md` first: this is an unofficial copy, not the website of Stash Dash.

## Source

- **Live site:** https://www.stashdash.com/, read on the evening of October 12, 2026, California time (October 13, between 00:35 and 01:36 UTC); 11 pages read again on October 14, 2026 (California time).
- **Store facts** (address, telephone, hours, licence): read from the business's event flyer on its `/events` page; the address and the licence number agree with the California cannabis licence register (https://real.cannabis.ca.gov/premises/stash-dash-los-angeles-c10-0001336/), the licence number also with the live site's footer; the hours were not confirmed as regular hours.
- **Structure:** another, unrelated website, read as a structure only (no content, no asset).

## Generated imagery

| File(s) in this copy | What it shows | Made with | Pages |
| --- | --- | --- | --- |
| `cat-accessories-2b42cc7d`, `cat-accessories-e3141e3a` (6 files: 2 crops in their sizes) | a brass grinder, a lighter and rolling papers | fal.ai, `fal-ai/nano-banana-pro` | `/categories/accessories/`, `/categories/`, `/` |
| `cat-beverages-e9468d42`, `cat-beverages-ebed2cb9` (6 files: 2 crops in their sizes) | a glass of a sparkling drink with lime beside a plain black can | fal.ai, `fal-ai/nano-banana-pro` | `/categories/beverages/`, `/categories/`, `/` |
| `cat-edibles-0085d86a`, `cat-edibles-924f5828` (6 files: 2 crops in their sizes) | squares of chocolate on a brass plate | fal.ai, `fal-ai/nano-banana-pro` | `/categories/edibles/`, `/categories/`, `/` |
| `cat-extracts-886712a3`, `cat-extracts-d2310d4e` (6 files: 2 crops in their sizes) | a small glass jar of amber extract with a brass tool | fal.ai, `fal-ai/nano-banana-pro` | `/categories/extracts/`, `/categories/`, `/` |
| `cat-flower-2597178d`, `cat-flower-f905e318` (6 files: 2 crops in their sizes) | cannabis buds on a small brass dish | fal.ai, `fal-ai/nano-banana-pro` | `/categories/flower/`, `/categories/`, `/` |
| `cat-pre-rolls-e1c3038c`, `cat-pre-rolls-f4ccf8e3` (6 files: 2 crops in their sizes) | three pre-rolls on a slate | fal.ai, `fal-ai/nano-banana-pro` | `/categories/`, `/categories/pre-rolls/`, `/` |
| `cat-vapes-dacf6107`, `cat-vapes-e89a739b` (6 files: 2 crops in their sizes) | a black vape pen and a cartridge on a stone block | fal.ai, `fal-ai/nano-banana-pro` | `/categories/`, `/categories/vapes/`, `/` |
| `cat-wellness-2171a629`, `cat-wellness-5c83e713` (6 files: 2 crops in their sizes) | an amber dropper bottle and an open jar of balm | fal.ai, `fal-ai/nano-banana-pro` | `/categories/`, `/categories/wellness/`, `/` |
| `still-bell-15b4fe08` (3 files, in their sizes) | a brass desk bell | fal.ai, `fal-ai/nano-banana-pro` | `/contact/`, `/faq/`, `/learn/` |
| `still-bowtie-9b24a604` (3 files, in their sizes) | a black bow tie on ivory linen | Higgsfield, `alibaba/qwen-image-3/text-to-image` | `/about/` |
| `still-tray-e82a3aa9` (3 files, in their sizes) | a silver tray with a wrapped black gift box | fal.ai, `fal-ai/nano-banana-pro` | `/deals/` |
| `loop-night-dash-1280.213c84c58c`, `loop-night-dash-768.04c21fbf5e`, `loop-night-dash-poster-4fa2045f` (5 files: the loop at 2 widths, and its first frame as the picture shown before it plays) | an empty road at night: the lights move | Higgsfield, `kling-video/o3/first-last-frame`, from the still `still-night-dash` as first and last frame | `/delivery/` |
| `loop-tray-1280.90b71ecac1`, `loop-tray-768.c6882e1d02`, `loop-tray-poster-04db8a90` (5 files: the loop at 2 widths, and its first frame as the picture shown before it plays) | the same tray: the light moves | Higgsfield, `kling-video/o3/first-last-frame`, from the still `still-tray` as first and last frame | `/` |

Not in this copy: `still-night-dash` (fal.ai, `fal-ai/nano-banana-pro`), made only as the first and last frame given to the video model.

The stills were saved as PNG and re-encoded to WebP for this site; the loops were re-encoded to H.264 and trimmed to loop. Every picture, and the first frame of each loop, was looked at before publishing: none shows a person, lettering, a label or a logo. Each generated file carries one XMP packet, the IPTC digital source type `trainedAlgorithmicMedia`, and nothing else of its making (README, *Generated imagery*).

## The live site's pictures

57 pictures in 249 files in `assets/img/`: the business's logo (2 versions), the marks of the brands it sells, the icons of its categories, 2 gift-card pictures and 1 event flyer. Each was fetched from the live site and cut to the sizes its places need; none was altered otherwise.

## Tooling

A rebuild pipeline of Node scripts (no dependencies) read the live site, extracted its text and pictures, built the pages, and checked them (the first rows of the README's *Verification* table). A separate step made this preview from the private build and checked it again: `preview-build`, `preview-verify` (with a self-test that plants defects), `preview-docs`.

