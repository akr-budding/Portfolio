# Ashwini Ranjan Portfolio

Modern Angular portfolio and blog for a Full-Stack .NET Developer. The site includes:

- Responsive portfolio homepage with hero, about, skills, experience, projects, and contact sections
- Blog listing with search, category and tag filters, loading skeletons, and pagination
- Single blog post page with table of contents, code snippets, related posts, and share actions
- Tailwind CSS styling, standalone Angular components, dark mode toggle, and SEO-friendly metadata
- Resume download wired to `public/assets/resume/Ashwini-Ranjan-Resume.pdf`

## Stack

- Angular 21 with standalone components and routing
- Tailwind CSS v4
- Mock JSON content served from `public/data`

## Local Setup

1. Install dependencies:

```bash
npm install
```

2. Start the dev server:

```bash
npm start
```

3. Open [http://localhost:4200](http://localhost:4200)

## Build

Create a production build with:

```bash
npm run build
```

The compiled output is generated in `dist/portfolio-site/browser`.

## Content Updates

- Portfolio projects: `public/data/projects.json`
- Blog posts: `public/data/blog-posts.json`
- Resume file: `public/assets/resume/Ashwini-Ranjan-Resume.pdf`

## Deployment

The app is a static Angular build and can be deployed to Azure Static Web Apps, Azure App Service, Netlify, Vercel, or GitHub Pages.

### Azure Static Web Apps

1. Run `npm run build`
2. Deploy the `dist/portfolio-site/browser` folder
3. Configure fallback routing to `index.html` for Angular routes

### Azure App Service

1. Build the app
2. Serve the `browser` output with a static web server such as `pm2 serve`, `http-server`, or Nginx
3. Add rewrite rules so `/blog/...` routes resolve to `index.html`

## Notes

- Replace the GitHub placeholder links in `public/data/projects.json` and the main shell when the final profile URL is available.
- Blog and project cards currently use remote placeholder imagery for visual polish. These can be swapped with local assets later without changing the component structure.
