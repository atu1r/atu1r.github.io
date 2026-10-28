# atu1r.github.io

My personal website & portfolio, served at **https://atu1r.github.io**.

A single-page site styled as a `psql` session, with light and dark themes,
built with plain HTML, CSS, and vanilla JavaScript, with no build step required.

## Structure

| File         | Purpose                                                              |
| ------------ | -------------------------------------------------------------------- |
| `index.html` | Page content (hero, experience, education, projects, skills, contact) |
| `styles.css` | psql theme (light + dark), layout, and responsive styles             |
| `script.js`  | Mobile nav, scroll header, reveal-on-scroll, theme toggle            |

## Customizing

Most content lives in `index.html`. Each section is a `-- Heading`, a query
line, and the query's result:

- **Hero**: `.hero-name`, `.hero-summary`, and the `.hero-links` buttons.
- **Experience / Projects**: each `<article class="record">`, shown in psql's
  expanded display. Fields are `<dt>`/`<dd>` pairs; wrap a metric in
  `<span class="n">` to highlight it like a number literal.
- **Education / Skills / Contact**: rows of each `<table class="psql">`. On
  narrow screens, `x-auto` tables switch to expanded display (like `\x auto`),
  labelled from each cell's `data-label`, so keep those in sync with the column names.
- `(n rows)` lines and record numbers: record numbers are automatic, row counts
  are written by hand.

Theme colors are CSS variables at the top of `styles.css`: `:root` is the
light theme and `[data-theme="dark"]` the dark one. Light is the default, and
the toggle remembers each visitor's choice.

## Local preview

```sh
python3 -m http.server 8000
# then open http://localhost:8000
```
