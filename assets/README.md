# Project media

Drop screenshots and a demo video into the per-project folder. The project
detail popups reference these exact filenames — any file that's missing is
simply skipped, so you can add them whenever they're ready.

For each project (`inventory-agent/`, `chat-ai/`):

| File             | Used as                                            |
| ---------------- | -------------------------------------------------- |
| `demo.mp4`       | Inline video player at the top of the popup        |
| `cover.png`      | Poster image shown before the video plays          |
| `screenshot-1.png` | Screenshot under the video                        |
| `screenshot-2.png` | Second screenshot (optional)                       |

Notes:
- Keep `demo.mp4` reasonably small (H.264 MP4). Large videos bloat the repo and
  slow the page; ~720p and a few MB is plenty for a portfolio clip.
- To add more screenshots, add the files here and a matching
  `<img class="modal-shot" ...>` line in the project's `<dialog>` in `index.html`.
- PNG or JPG both work for screenshots; just match the extension in `index.html`.
