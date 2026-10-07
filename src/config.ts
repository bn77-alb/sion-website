// Central company data. Edit here – every page reads from this file.

export const site = {
  name: 'SION Consulting',
  url: 'https://www.sionconsulting.de',

  // Legal details (Impressum) – do not change without approval
  legalForm: '(Einzelunternehmen / Person fizik)',
  representative: 'Egla Nela',
  registry: 'M32405002D',
  vatId: '', // leave empty if none
  euRepresentative: '', // EU representative (Art. 27 GDPR) – section appears on the privacy page once filled in

  // Official business address – used in footer, contact page, Impressum and Google data
  street: 'Rruga Jordan Misja nr. 116',
  zip: '1001',
  city: 'Tirana',
  countryDe: 'Albanien',
  countryEn: 'Albania',

  // Contact
  email: 'info@sionconsulting.de',
  phone: '+49 152 095 112 59',
  phoneHref: '+4915209511259',
  whatsapp: 'https://wa.me/4915209511259',

  // Forms: paste your n8n Production Webhook URL here.
  // While empty, the forms open the visitor's email program instead (no CV upload possible then).
  formEndpoint: '',

  // AI chat (n8n workflow "Sion Consulting – Website Chatbot"). Set to '' to hide the chat.
  chatEndpoint: 'https://norvia2.app.n8n.cloud/webhook/e6f64d6c-e631-4942-91c7-5e1441898071/chat',
};

// ---------------------------------------------------------------------------
// Trust content. Sections only appear on the website once entries exist here.
// Use real, verifiable cases only.
// ---------------------------------------------------------------------------

type Bi = { de: string; en: string };

// "Erfolgreiche Vermittlungen" – example entry (copy, fill in, remove the comment marks):
// { client: { de: 'Transportunternehmen – Bayern', en: 'Transport company – Bavaria' },
//   situation: { de: 'Benötigte mehrere CE-Fahrer.', en: 'Needed several CE drivers.' },
//   solution: { de: 'Kandidaten international gesucht und vorgeprüft.', en: 'Candidates sourced and pre-screened internationally.' },
//   result: { de: '5 Fahrer erfolgreich vermittelt', en: '5 drivers successfully placed' } },
export const caseStudies: { client: Bi; situation: Bi; solution: Bi; result: Bi }[] = [];

// Customer testimonials – business customers only, with permission.
// { quote: { de: '…', en: '…' }, author: { de: 'Logistikunternehmen – Bayern', en: 'Logistics company – Bavaria' }, result: { de: '5 Fahrer vermittelt', en: '5 drivers placed' } },
export const testimonials: { quote: Bi; author: Bi; result?: Bi }[] = [];

// "Ihr Ansprechpartner" on the About page. photo: file in public/images/team/, e.g. '/images/team/name.jpg'
// { name: 'Vorname Nachname', role: { de: 'Geschäftsführung', en: 'Managing Director' }, languages: 'Deutsch | Englisch',
//   phone: '+49 152 095 112 59', phoneHref: '+4915209511259', email: 'info@sionconsulting.de', linkedin: '', photo: '' },
export const team: { name: string; role: Bi; languages: string; phone?: string; phoneHref?: string; email?: string; linkedin?: string; photo?: string }[] = [];
