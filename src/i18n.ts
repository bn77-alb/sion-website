export type Lang = 'de' | 'en';

// Every page exists in both languages. The language switch uses this map.
export const routes = {
  home: { de: '/', en: '/en/' },
  lkw: { de: '/lkw-fahrer/', en: '/en/truck-drivers/' },
  backoffice: { de: '/back-office/', en: '/en/back-office/' },
  bewerber: { de: '/bewerber/', en: '/en/applicants/' },
  kontakt: { de: '/kontakt/', en: '/en/contact/' },
  impressum: { de: '/impressum/', en: '/en/legal-notice/' },
  datenschutz: { de: '/datenschutz/', en: '/en/privacy-policy/' },
  cookies: { de: '/cookie-richtlinie/', en: '/en/cookie-policy/' },
} as const;

export type PageKey = keyof typeof routes;

export const nav = {
  de: [
    { key: 'lkw', label: 'LKW-Fahrer', href: routes.lkw.de },
    { key: 'recruiting', label: 'Recruiting', href: '/#recruiting' },
    { key: 'backoffice', label: 'Back-Office', href: routes.backoffice.de },
    { key: 'bewerber', label: 'Für Bewerber', href: routes.bewerber.de },
    { key: 'faq', label: 'FAQ', href: '/#faq' },
  ],
  en: [
    { key: 'lkw', label: 'Truck drivers', href: routes.lkw.en },
    { key: 'recruiting', label: 'Recruitment', href: '/en/#recruiting' },
    { key: 'backoffice', label: 'Back office', href: routes.backoffice.en },
    { key: 'bewerber', label: 'Applicants', href: routes.bewerber.en },
    { key: 'faq', label: 'FAQ', href: '/en/#faq' },
  ],
};

export const ui = {
  de: {
    skip: 'Zum Inhalt springen',
    menu: 'Menü',
    mainNav: 'Hauptnavigation',
    language: 'Sprache',
    cta: 'Anfrage stellen',
    homeLabel: 'Sion Consulting – Startseite',
  },
  en: {
    skip: 'Skip to content',
    menu: 'Menu',
    mainNav: 'Main navigation',
    language: 'Language',
    cta: 'Get in touch',
    homeLabel: 'Sion Consulting – Home',
  },
};
