export type Lang = 'de' | 'en';

// Every page exists in both languages. The language switch uses this map.
export const routes = {
  home: { de: '/', en: '/en/' },
  personalvermittlung: { de: '/personalvermittlung/', en: '/en/recruitment/' },
  lkw: { de: '/lkw-fahrer/', en: '/en/truck-drivers/' },
  paket: { de: '/paketzusteller/', en: '/en/parcel-delivery-drivers/' },
  lager: { de: '/lager-logistik/', en: '/en/warehouse-logistics/' },
  reinigung: { de: '/reinigung/', en: '/en/cleaning/' },
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
    { key: 'backoffice', label: 'Back Office', desktop: true },
    { key: 'unternehmen', label: 'Für Unternehmen', desktop: true },
    { key: 'bewerber', label: 'Für Bewerber', desktop: true },
    { key: 'ueberuns', label: 'Über uns', desktop: true },
    { key: 'kontakt', label: 'Kontakt', desktop: false },
  ],
  en: [
    { key: 'home', label: 'Home', desktop: false },
    { key: 'personalvermittlung', label: 'Recruitment', desktop: true },
    { key: 'lkw', label: 'Truck drivers', desktop: true },
    { key: 'backoffice', label: 'Back office', desktop: true },
    { key: 'unternehmen', label: 'For employers', desktop: true },
    { key: 'bewerber', label: 'For applicants', desktop: true },
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
    callLabel: 'SION Consulting anrufen',
    whatsapp: 'WhatsApp kontaktieren',
    whatsappShort: 'WhatsApp',
    whatsappWrite: 'WhatsApp schreiben',
    topbar: 'Personalvermittlung & Back Office für Unternehmen in Deutschland',
    contactBar: 'Schnellkontakt',
    chat: 'Chat mit unserem KI-Assistenten',
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
    callLabel: 'Call SION Consulting',
    whatsapp: 'Contact us on WhatsApp',
    whatsappShort: 'WhatsApp',
    whatsappWrite: 'Message us on WhatsApp',
    topbar: 'Recruitment & back office for companies in Germany',
    contactBar: 'Quick contact',
    chat: 'Chat with our AI assistant',
  },
};
