// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Old addresses keep working and forward to the new pages.
const redirects = {
  '/bewerber': '/fuer-bewerber/',
  '/en/applicants': '/en/for-applicants/',
};

export default defineConfig({
  site: 'https://www.sionconsulting.de',
  trailingSlash: 'ignore',
  redirects,
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/404') && !Object.keys(redirects).some((r) => page.replace(/\/$/, '').endsWith(r)),
    }),
  ],
});
