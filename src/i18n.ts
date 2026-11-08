export type Lang = 'de' | 'en';

// Every page exists in both languages. The language switch uses this map.
export const routes = {
  home: { de: '/', en: '/en/' },
  personalvermittlung: { de: '/personalvermittlung/', en: '/en/recruitment/' },
  lkw: { de: '/lkw-fahrer/', en: '/en/truck-drivers/' },
  eufahrer: { de: '/lkw-fahrer-aus-der-eu/', en: '/en/truck-drivers-eu/' },
  westbalkan: { de: '/lkw-fahrer-westbalkan/', en: '/en/truck-drivers-western-balkans/' },
  kontaktFahrer: { de: '/kontakt-fuer-fahrer/', en: '/en/contact-drivers/' },
  paket: { de: '/paketzusteller/', en: '/en/parcel-delivery-drivers/' },
  lager: { de: '/lager-logistik/', en: '/en/warehouse-logistics/' },
  reinigung: { de: '/reinigung/', en: '/en/cleaning/' },
  saison: { de: '/saisonarbeit/', en: '/en/seasonal-work/' },
  backoffice: { de: '/back-office/', en: '/en/back-office/' },
  unternehmen: { de: '/fuer-unternehmen/', en: '/en/for-employers/' },
  bewerber: { de: '/fuer-bewerber/', en: '/en/for-applicants/' },
  ueberuns: { de: '/ueber-uns/', en: '/en/about-us/' },
  kontakt: { de: '/kontakt/', en: '/en/contact/' },
  impressum: { de: '/impressum/', en: '/en/legal-notice/' },
  datenschutz: { de: '/datenschutz/', en: '/en/privacy-policy/' },
  cookies: { de: '/cookie-richtlinie/', en: '/en/cookie-policy/' },
} as const;

export type PageKey = keyof typeof routes;

// Anchor of the employer inquiry form on the contact page
export const requestHref = (lang: Lang) => `${routes.kontakt[lang]}#anfrage`;

type NavItem = { key: PageKey; label: string; desktop: boolean };

const navItems: Record<Lang, NavItem[]> = {
  de: [
    { key: 'home', label: 'Startseite', desktop: false },
    { key: 'personalvermittlung', label: 'Personalvermittlung', desktop: true },
    { key: 'lkw', label: 'LKW-Fahrer', desktop: true },
    { key: 'saison', label: 'Saisonarbeit', desktop: true },
    { key: 'backoffice', label: 'Back Office', desktop: true },
    { key: 'unternehmen', label: 'Für Unternehmen', desktop: true },
    { key: 'ueberuns', label: 'Über uns', desktop: true },
    { key: 'kontakt', label: 'Kontakt', desktop: false },
  ],
  en: [
    { key: 'home', label: 'Home', desktop: false },
    { key: 'personalvermittlung', label: 'Recruitment', desktop: true },
    { key: 'lkw', label: 'Truck drivers', desktop: true },
    { key: 'saison', label: 'Seasonal work', desktop: true },
    { key: 'backoffice', label: 'Back office', desktop: true },
    { key: 'unternehmen', label: 'For employers', desktop: true },
    { key: 'ueberuns', label: 'About us', desktop: true },
    { key: 'kontakt', label: 'Contact', desktop: false },
  ],
};

export const nav = (lang: Lang) => navItems[lang].map((i) => ({ ...i, href: routes[i.key][lang] }));

export const ui = {
  de: {
    skip: 'Zum Inhalt springen',
    menu: 'Menü',
    close: 'Menü schließen',
    mainNav: 'Hauptnavigation',
    language: 'Sprache',
    homeLabel: 'SION Consulting – Startseite',
    request: 'Personal anfragen',
    call: 'Anrufen',
    callNow: 'Jetzt anrufen',
    mailLabel: 'E-Mail an SION Consulting',
    chatShort: 'Chat',
    emailWrite: 'E-Mail schreiben',
    emailShort: 'E-Mail',
    topbar: 'Personalvermittlung & Back Office für Unternehmen in Deutschland',
    contactBar: 'Schnellkontakt',
    chat: 'Chat mit unserem KI-Assistenten',
    euDrivers: 'Für Fahrer in der EU',
    euShort: 'EU-Fahrer',
    drivers: 'Für Fahrer',
    driverContact: 'Kontakt für Fahrer',
    contactShort: 'Kontakt',
    applicants: 'Für Bewerber',
    candidateLinks: 'Für Bewerberinnen und Bewerber',
    apply: 'Jetzt bewerben',
    applyShort: 'Bewerben',
    docsLater: 'Unterlagen nachreichen:',
  },
  en: {
    skip: 'Skip to content',
    menu: 'Menu',
    close: 'Close menu',
    mainNav: 'Main navigation',
    language: 'Language',
    homeLabel: 'SION Consulting – Home',
    request: 'Request staff',
    call: 'Call',
    callNow: 'Call now',
    mailLabel: 'Email SION Consulting',
    chatShort: 'Chat',
    emailWrite: 'Send an email',
    emailShort: 'Email',
    topbar: 'Recruitment & back office for companies in Germany',
    contactBar: 'Quick contact',
    chat: 'Chat with our AI assistant',
    euDrivers: 'For drivers in the EU',
    euShort: 'EU drivers',
    drivers: 'For drivers',
    driverContact: 'Contact for drivers',
    contactShort: 'Contact',
    applicants: 'For applicants',
    candidateLinks: 'For applicants',
    apply: 'Apply now',
    applyShort: 'Apply',
    docsLater: 'Send documents later:',
  },
};
