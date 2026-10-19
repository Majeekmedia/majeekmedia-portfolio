# IMAGE_SPEC.md

**Exact sizes to make in Canva.** Every number here is taken from how the site
actually lays the image out, measured in the browser — not guessed.

---

## The problem you spotted, diagnosed

Your instinct was right, and here is the measurement behind it.

A phone screenshot is **portrait** (e.g. 720×1600, ratio 0.45). The project index
was giving every project a **landscape 16:10 box** with `object-fit: cover`. So a
portrait image was cropped to the middle third of its height and then scaled up to
fill 495px of width. That is why it looked enormously zoomed in and why you were
only seeing the middle of each screen.

The detail page was worse in a different way: the lead image had **no height cap**,
so a portrait screenshot rendered at **495×1071px on a 1440px screen — 1.98
viewport heights for a single image.**

Both are now fixed in code (device frames, and a height cap on any portrait image).
But the cleanest fix is at the source, which is what this document is for.

---

## What to make

### 1. Project thumbnails — used on the `/portfolio` index

**⚠️ One thumbnail per project. This is the one people will judge you on.**

| Property | Value |
|---|---|
| **Canvas** | **1600 × 1000 px** |
| **Aspect ratio** | **16:10** |
| **Format** | PNG or JPG |
| **Max file size** | 300 KB (I compress it further anyway) |
| **Count** | 1 per project (4 total) |

**Layout advice:** this is a wide landscape frame, so do not just drop one portrait
screenshot in it — it will letterbox. Instead:

- **For web projects (VHM, Crypto):** one clean desktop screenshot, full bleed.
- **For mobile projects (Weather, Notes):** put **2 phone screens side by side** in
  the landscape frame, on your brand background. That fills the 16:10 shape properly
  and immediately reads as a mobile app.

Actually — for mobile projects the index now renders a **device frame** rather than
a landscape crop, so you do **not** need a landscape thumbnail for them. See §4.

---

### 2. Project detail — the lead image

| Project type | Canvas | Ratio | Notes |
|---|---|---|---|
| **Web projects** | **2400 × 1350 px** | **16:9** | VHM, Crypto. A clean desktop capture. |
| **Mobile projects** | **900 × 1950 px** | **9:19.5** | Weather, Notes. A single phone screen. |

The mobile one goes inside a bezel I draw in code, so **do not draw a phone frame
yourself.** Just send the flat screenshot; I add the device.

**Safe area:** keep important UI at least **60px from the top and bottom edge** for
mobile shots. The bezel's rounded corners clip the very corners.

**Recommended for mobile:** combine related screens vertically if a single screen is
not self-explanatory — e.g. the weather "today" panel on top and the forecast list
below, as one tall image. It reads as a scroll and gives one strong image instead
of two weak ones.

---

### 3. Additional project detail images

These sit in device frames beside the lead.

| Property | Value |
|---|---|
| **Canvas** | **720 × 1560 px** (or 1080 × 2340 if you prefer) |
| **Ratio** | **9:19.5** (a modern phone) |
| **Format** | PNG |
| **Count** | **2–3 per mobile project. Not more.** |

You said you do not want many, and I agree. **Three strong screens beat six
mediocre ones.** For Weather: current conditions, the forecast list, settings.
For Notes: the list, the editor, dark mode.

**Consistency matters more than quantity.** Same status bar, same time, same
battery level across all shots in a set. Mismatched status bars are the single
most obvious "these were taken at different times" tell.

---

### 4. Summary table — make exactly these

| # | Purpose | Canvas | Ratio | Qty |
|---|---|---|---|---|
| 1 | Web project lead | 2400 × 1350 | 16:9 | 2 (VHM, Crypto) |
| 2 | Mobile project lead | 900 × 1950 | 9:19.5 | 2 (Weather, Notes) |
| 3 | Mobile extra screens | 720 × 1560 | 9:19.5 | 3 per app |
| 4 | Index thumbnail | — | — | **0, see below** |

**You do not need to make index thumbnails.** The index now reuses each project's
lead image: web projects get it in a landscape plate, mobile projects get it in a
device frame. One less set to produce.

---

## Practical notes

**Export from Canva at 2×** if a screen is retina. The site serves each image at
its display size, so a 2400px-wide lead is plenty for any monitor.

**Do not add drop shadows or borders.** The site supplies the bezel, the radius and
the shadow. An image with its own shadow ends up with two, and they will not match.

**Do not add device frames.** Same reason.

**Background:** if you place screenshots on a coloured background in Canva, use a
flat colour, not a gradient. A gradient in the image will fight the page.

**Aspect ratio matters more than pixel count.** A 1600×1000 image is better than a
2000×2000 one, because the second gets cropped.

---

## Naming

Drop the files in `C:\Users\HP\Desktop\community.vhm.ng\` style folders, or send them
and I will place them. Naming that helps me slot them in without asking:

```
vhm-lead.png          (web lead, 16:9)
vhm-screen-1.png      (portrait, for the mobile strip if any)
crypto-lead.png
weather-lead.png      (mobile lead, 9:19.5)
weather-2.png
weather-3.png
notes-lead.png
notes-2.png
notes-3.png
```

Then I run `node docs/qa/optimize-images.mjs`, which regenerates every derivative
and the manifest automatically. Nothing else to change.

---

## What I would fix regardless of new images

Two things are worth knowing because they affect anything you send:

1. **Your VHM desktop captures are 1920×891** — that is a 2.15:1 ratio, wider than
   16:9. They render fine now, but if you are regenerating, **1600×1000 is a better
   fit** than a very wide capture.

2. **The UniTrade screenshots have a drop shadow baked into the PNG** (16–23% of
   pixels are transparent around the edges). The pipeline detects this and
   composites them onto the page ground so they do not float in a letterbox. If you
   regenerate them, **export without the shadow** and they will sit better.

---

## If you would rather not do this

You do not have to. The device frames already fix the zooming problem, and it looks
good now. New images would improve sharpness on retina screens and give you
consistent status bars, but the current state is presentable.

The highest-value single item is **a clean 16:9 lead for VHM**, because that is the
flagship project and its current capture is an unusual 2.15:1 shape.
