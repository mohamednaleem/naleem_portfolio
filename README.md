# Mohamed Naleem — Portfolio

A responsive, single-page professional portfolio built with Angular 19, standalone components, TypeScript, SCSS, and Lucide Angular icons. Its dark, violet-lit visual style is inspired by the reference portfolio at redoyanulhaque.me, with original portfolio content and design details.

## Highlights

- Resume-based introduction, selected project summaries, and career timeline
- Angular, React, TypeScript, SQL, and full-stack skills
- Dark, portrait-inspired monogram hero, anchored navigation, and resume-request link
- Responsive layout, accessible section navigation, and direct email/LinkedIn links
- No backend or third-party runtime dependencies

Project descriptions are high-level summaries of work listed in the resume. Add approved public case studies and project links before publishing.

## Run locally

Requires Node.js 20.11.1 or later in the 20.x line.

```bash
npm install
npm start
```

Open `http://localhost:4200/`.

## Verify

```bash
npm run build
npm test
```

## Deploy publicly with Cloudflare Pages

1. Push this project to a GitHub repository. The repository can be private; the
   deployed Pages site will still be publicly viewable.
2. In Cloudflare, open **Workers & Pages**, choose **Create application** >
   **Pages** > **Connect to Git**, and select the repository.
3. Use these build settings:
   - Framework preset: **None**
   - Production branch: **main** (or the branch you deploy from)
   - Build command: `npm run build`
   - Build output directory: `dist/taskboard/browser`
4. Save and deploy. Cloudflare will provide a public `*.pages.dev` URL and
   automatically rebuild the site when changes are pushed to the production
   branch.

The `.nvmrc` file selects Node.js 20.11.1 for the build, matching the version
required by this project.

## Personalize before publishing

Review the employment dates, current role, contact details, and project summaries for accuracy and sharing permission. The resume link currently opens an email request; replace it with a downloadable resume only when you are ready to publish the PDF. Add public project links only when they are approved to share.
