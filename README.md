# Wandering Watsons — static site

One combined home for two old WordPress blogs, served as plain static files
(no build step, no database) on GitHub Pages at **wanderingwatsons.com**.

- **Wandering Watsons** — 48 published travel posts, Sep 2015 – Aug 2019.
  Tagline: “Explore the world with us”
- **Watson Eats** — 38 published food posts, Apr 2015 – Mar 2020.
  Tagline: “Surprisingly, not only bacon.”
- **Total: 86 published posts.** The homepage (Wandering Watsons) is the main
  hub, with a sticky top nav bar on every page: **Travel** (`index.html`),
  **Food** (`eats.html`), **Tags** (`/tags/`) and **Categories**
  (`/categories/`). Old `?view=watsoneats` / `?view=wanderingwatsons` links
  redirect to the right hub.

## Design

Bright and playful, no brown: teal + coral for the travel side, tomato red +
leaf green for the food side. Every page has the sticky top nav; hub and
category/tag pages have an illustrated hero band (sun, mountains and waves
for travel; plate, leaf and fork for food, drawn as inline SVG line art),
and post pages carry a slim patterned strip under the nav.

## Categories and tags

From the WordPress exports: categories are Dinner / Breakfast / Dessert /
Drinks (Watson Eats only — the travel blog's "Blog" and "Uncategorized"
categories are left out as meaningless). Tags are places, themes and
ingredients, merged case-insensitively. Every category and tag has its own
page (`/categories/<slug>.html`, `/tags/<slug>.html`), the sidebar on every
page links to them (popular tags with 3+ posts), and a post page's sidebar
shows that post's own categories and tags, all clickable.

## What is in here

- `index.html` — Wandering Watsons hub: nav bar, illustrated hero, 48 travel posts
- `eats.html` — Watson Eats hub: nav bar, illustrated hero, 38 recipes
- `posts/<slug>.html` — one page per post (86 files), prev/next within its own blog
- `categories/<slug>.html` + `categories/index.html` — one page per category
- `tags/<slug>.html` + `tags/index.html` — one page per tag (188 tags)
- `style.css`, `script.js` — the only CSS/JS; system fonts, no libraries
- `sitemap.xml`, `inventory.md` — every post, with date, slug and image count
- `CNAME` — contains `wanderingwatsons.com`
- `.nojekyll` — tells GitHub Pages to serve files as-is

## Images

The posts' photos were recovered from the Wayback Machine in November 2026
(see `../recover_images.py` and `../recovery_log.json`): 314 of the
373 referenced images were recovered and now live in this folder under
`images/<original host>/wp-content/uploads/...`, served from the site itself.
Any image not recovered keeps its original
`http://www.wanderingwatsons.com/wp-content/uploads/...` /
`http://www.watsoneats.com/wp-content/uploads/...` URL, with `loading="lazy"`
and an `onerror` handler that hides it if it fails to load, so pages still
read cleanly.

- Wandering Watsons: 372 images referenced across 48 posts; 44 posts have
  images, 4 have none.
- Watson Eats: 1 image referenced across 38 posts; 37 posts have no images
  (most recipes were text-only in the export).

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
content lives here on the Watson Eats tab (`/eats.html`). It can be left to
expire or redirected to wanderingwatsons.com/eats.html if desired.

## Rebuilding

Re-run the generator (Python 3, stdlib only, no install needed):

```
python3 ../build_site.py
```

It re-reads the two `.xml` exports next to it and regenerates this folder.
