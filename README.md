# Wandering Watsons — static site

One combined home for two old WordPress blogs, served as plain static files
(no build step, no database) on GitHub Pages at **wanderingwatsons.com**.

- **Wandering Watsons** — 48 published travel posts, Sep 2015 – Aug 2019.
  Tagline: “Explore the world with us”
- **Watson Eats** — 38 published food posts, Apr 2015 – Mar 2020.
  Tagline: “Surprisingly, not only bacon.”
- **Total: 86 published posts.** The homepage has a toggle at the top
  (Wandering Watsons | Watson Eats); `?view=watsoneats` / `?view=wanderingwatsons`
  / `?view=all` in the URL is the source of truth for the view.

## What is in here

- `index.html` — homepage, toggle, intro, full post list (86 items)
- `posts/<slug>.html` — one page per post (86 files), prev/next within its own blog
- `style.css`, `script.js` — the only CSS/JS; system fonts, no libraries
- `sitemap.xml`, `inventory.md` — every post, with date, slug and image count
- `CNAME` — contains `wanderingwatsons.com`
- `.nojekyll` — tells GitHub Pages to serve files as-is

## Known gap: images

Post content links images at `http://www.wanderingwatsons.com/wp-content/uploads/...`
and `http://www.watsoneats.com/wp-content/uploads/...`. Those image files were
**not** in the WordPress exports and the old hosts may be dead, so some photos
may not load. The original URLs were kept as-is (nothing was downloaded or
re-hosted). Images have `loading="lazy"` and an `onerror` handler that hides a
broken image, so pages still read cleanly.

- Wandering Watsons: 372 images referenced across 48 posts; 44 posts have
  images, 4 have none.
- Watson Eats: 1 image referenced across 38 posts; 37 posts have no images
  (most recipes were text-only in the export).
- If the original image files turn up (e.g. a media backup), they can be copied
  into `images/` and the URLs rewritten — that is the one remaining fix-up.

## Posts that were NOT included (drafts)

The exports list 51 + 39 = 90 post items, but 4 are drafts with no slug and
were never published, so they are excluded:

- Wandering Watsons: “Life in Nerja” (2015-11-09, empty body),
  “Some Epic PhotoSpheres” (2016-01-05), “Touristy in Paris!” (2019-08-08)
- Watson Eats: “Homemade Ice Cream!” (2018-08-13, empty body)

No *published* post has an empty body — the shortest published post is
67 characters. (The 0-char “Homemade Ice Cream!” is the draft above.)

## Shortcodes converted (post text itself was not rewritten)

- `[caption]…[/caption]` → `<figure>` + `<figcaption>`
- `[resmap address="…"]` → a short text note naming the place
- `[video mp4="…"]` → `<video controls>`
- `[sphere 650]` → a short note that the photosphere isn’t available statically

## Deploy to GitHub Pages (free)

1. Create a **public** GitHub repo (e.g. `wanderingwatsons`), upload the
   contents of this folder to its `main` branch, root directory.
2. In the repo: **Settings → Pages → Build and deployment → Source:
   Deploy from a branch → Branch: main, /(root)** → Save.
3. Wait a minute or two; the site appears at `<username>.github.io/wanderingwatsons`
   (or `<username>.github.io` if the repo is named `<username>.github.io`).
4. In the same Pages settings, under **Custom domain**, enter
   `wanderingwatsons.com` and save. GitHub provisions free HTTPS
   (the `CNAME` file in this folder does the same job — keep it).

## Point wanderingwatsons.com at GitHub Pages (Namecheap)

In Namecheap → Domain List → Manage → Advanced DNS (nameservers: Namecheap
BasicDNS), delete any old parking records, then add:

| Type | Host | Value |
|---|---|---|
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |
| CNAME | www | `<username>.github.io` |

DNS can take up to a few hours to propagate. Then tick **Enforce HTTPS**
in the repo’s Pages settings once the certificate is ready.

The old `watsoneats.com` domain is not needed for this site — all Watson Eats
content lives here under the Watson Eats toggle. It can be left to expire or
redirected to wanderingwatsons.com/?view=watsoneats if desired.

## Rebuilding

Re-run the generator (Python 3, stdlib only, no install needed):

```
python3 ../build_site.py
```

It re-reads the two `.xml` exports next to it and regenerates this folder.
