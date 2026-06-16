# atu1r.github.io

My personal website & portfolio, served at **https://atu1r.github.io**.

A modern, minimal, dark-themed single-page site built with plain HTML, CSS, and
vanilla JavaScript — no build step required.

## Structure

| File         | Purpose                                          |
| ------------ | ------------------------------------------------ |
| `index.html` | Page content (hero, about, projects, skills, contact) |
| `styles.css` | Dark theme, layout, and responsive styles        |
| `script.js`  | Mobile nav, scroll header, reveal-on-scroll      |

## Customizing

Most content lives in `index.html`. Search for the placeholder text and update:

- **Bio & about** — the `.hero-bio` and `.about-text` paragraphs.
- **Projects** — each `<article class="project-card">`. Update the title,
  description, tech list, and the two link `href`s (GitHub + live demo).
- **Skills** — the `<li>` items inside each `.skill-group`.
- **Social links** — the footer; replace the LinkedIn `href`
  (`https://www.linkedin.com/in/your-handle`) with your real profile.

Theme colors are CSS variables at the top of `styles.css` (`:root`). Change
`--accent` to recolor the whole site.

## Local preview

```sh
python3 -m http.server 8000
# then open http://localhost:8000
```
