# Sion Consulting – Website

Astro website, German (default) + English. Design direction A.

## 1. Install (one time)

Copy the contents of this zip into `C:\projects\sion-website` and confirm **Replace** when Windows asks.
Then, in the VS Code terminal inside that folder:

```
npm install @astrojs/sitemap @fontsource/space-grotesk @fontsource/ibm-plex-sans
```

## 2. Download the photos

```
powershell -ExecutionPolicy Bypass -File .\download-photos.ps1
```

Photos land in `public\images`. To swap a photo, change the ID in `download-photos.ps1`
(the part after `unsplash.com/photos/`) and run it again.

## 3. Run locally

```
npm run dev
```

Open http://localhost:4321

## 4. Where to edit things

| What | File |
|---|---|
| Company data, address, phone, legal placeholders, form webhook | `src/config.ts` |
| Menu, URLs of pages | `src/i18n.ts` |
| Homepage texts (DE + EN) | `src/views/Home.astro` |
| Truck driver page | `src/views/Lkw.astro` |
| Back-office page | `src/views/BackOffice.astro` |
| Applicant page | `src/views/Bewerber.astro` |
| Impressum / Privacy / Cookies | `src/views/Impressum.astro`, `Datenschutz.astro`, `Cookies.astro` |
| Colours and fonts | `src/styles/global.css` (top of the file) |
| Logo (placeholder) | `src/components/Logo.astro` and `public/favicon.svg` |

Yellow-highlighted text on the legal pages = still to be filled in.

## 5. Contact form

Until `formEndpoint` in `src/config.ts` is set, the form opens the visitor's email program.
To connect n8n: create a Webhook node (POST, path `sion-kontakt`), set **Allowed Origins (CORS)**
to `https://www.sionconsulting.de,http://localhost:4321`, publish, and paste the Production URL into `formEndpoint`.

Fields sent as JSON: `audience, name, company, email, phone, topic, message, consent, lang, page, sentAt`.

## 6. Publish (GitHub Pages)

1. Push the project to a GitHub repository.
2. Repository → Settings → Pages → Source: **GitHub Actions**.
3. Every push to `main` builds and publishes automatically (`.github/workflows/deploy.yml`).
4. Settings → Pages → Custom domain: `www.sionconsulting.de` (the `public/CNAME` file is already there).
