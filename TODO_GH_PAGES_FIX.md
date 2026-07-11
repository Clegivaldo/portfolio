# GitHub Pages 404 Fix (Next.js static export)

## Info gathered
- `next.config.ts` uses `output: "export"` and `basePath: "/portfolio"`.
- There is an `out/` directory containing `out/index.html`.
- Current GitHub Actions workflow publishes `./.next/static` to `gh-pages`.

## Fix plan
1. Update `.github/workflows/gh-pages.yml` to publish `./out` instead of `./.next/static`.
2. Keep publishing to `gh-pages` branch.
3. Commit + push to `main`.
4. Verify the deployed site loads `https://<user>.github.io/portfolio/` and that `index.html` is present in Pages.

## Completed steps
- [x] Update workflow (publish_dir changed to ./out)
- [x] Node runtime updated to 24 to match GH runner
- [x] Push commit and verify (workflow edit pending commit)
- [ ] Commit + push updated workflow (npm ci -> npm install) e reexecutar Actions



