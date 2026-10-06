// Central company data. Edit here – every page reads from this file.
// Values in [square brackets] are placeholders that still need to be filled in.

export const site = {
  name: 'Sion Consulting',
  url: 'https://www.sionconsulting.de',

  // Legal details (Impressum)
  legalForm: '(Einzelunternehmen / Person fizik)',
  representative: 'Egla Nela',
  registry: 'M32405002D',
  vatId: '', // leave empty if none
  euRepresentative: '', // EU representative (Art. 27 GDPR) – section appears on the privacy page once filled in

  // Address
  street: 'Rruga Jordan Misja nr. 116',
  zip: '1001',
  city: 'Tirana',
  countryDe: 'Albanien',
  countryEn: 'Albania',

  // Contact
  email: 'info@sionconsulting.de',
  phone: '+49 1520 9511259',
  phoneHref: '+4915209511259',
  whatsapp: 'https://wa.me/4915209511259',

  // Contact form: paste your n8n Production Webhook URL here.
  // While empty, the form opens the visitor's email program instead.
  formEndpoint: '',

  // AI chat (n8n workflow "Sion Consulting – Website Chatbot"). Set to '' to hide the chat.
  chatEndpoint: 'https://norvia2.app.n8n.cloud/webhook/e6f64d6c-e631-4942-91c7-5e1441898071/chat',
};
