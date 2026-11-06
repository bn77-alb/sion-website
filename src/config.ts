// Central company data. Edit here – every page reads from this file.

export const site = {
  name: 'SION Consulting',
  url: 'https://www.sionconsulting.de',

  // Legal details (Impressum) – do not change without approval
  legalForm: '', // not shown on the site
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
  email: 'info@sionconsulting.de', // employers only
  applicationEmail: 'bewerbung@sionconsulting.de', // candidates only

  // Forms: n8n workflow "SION – Website Forms" – stores each inquiry in the data table
  // "SION Website Anfragen" and emails it to info@sionconsulting.de.
  // Set to '' to fall back to opening the visitor's email program.
  formEndpoint: 'https://norvia2.app.n8n.cloud/webhook/sion-website-forms',

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
// { name: 'Vorname Nachname', role: { de: 'Geschäftsführung', en: 'Managing Director' }, languages: { de: 'Deutsch | Englisch', en: 'German | English' },
//   email: 'info@sionconsulting.de', linkedin: '', photo: '' },
export const team: { name: string; role: Bi; languages: Bi; phone?: string; phoneHref?: string; email?: string; linkedin?: string; photo?: string }[] = [
  {
    name: 'Egla Nela',
    role: { de: 'Geschäftsführerin', en: 'Managing Director' },
    languages: { de: 'Deutsch | Englisch', en: 'German | English' },
    email: site.email,
  },
];

// ---------------------------------------------------------------------------
// Sample jobs for drivers (shown on the EU drivers page, with JobPosting data for Google).
// No employer names. Only list positions that are really open.
// salaryMin / salaryMax: gross EUR per month. Leave both at 0 until the real range is known –
// then the card shows "Gehalt auf Anfrage" and no salary is sent to Google.
// ---------------------------------------------------------------------------
export type SampleJob = {
  id: string;
  title: Bi;
  region: Bi; // Bundesland, as shown on the card
  regionCode: string; // for Google: e.g. 'BY', 'BW', 'NI', 'NW'
  city?: string; // optional nearest city
  tags: Bi[];
  text: Bi;
  salaryMin: number;
  salaryMax: number;
  housing: boolean; // "Wohnung/WG möglich"
  datePosted: string; // YYYY-MM-DD
  validThrough: string; // YYYY-MM-DD – remove or update the job after this date
};

// Sample jobs are hidden for now. Set to true once the real texts and pay ranges are filled in.
export const showSampleJobs = false;

export const sampleJobs: SampleJob[] = [
  {
    id: 'silo-bayern',
    title: { de: 'LKW-Fahrer CE Silo – Fernverkehr', en: 'CE truck driver, silo – long-haul' },
    region: { de: 'Bayern', en: 'Bavaria' }, regionCode: 'BY',
    tags: [{ de: 'Silo', en: 'Silo' }, { de: 'Fernverkehr', en: 'Long-haul' }],
    text: { de: 'Silofahrzeug im nationalen und internationalen Fernverkehr. Erfahrung mit Silo von Vorteil.', en: 'Silo truck, national and international long-haul. Silo experience is a plus.' },
    salaryMin: 0, salaryMax: 0, housing: true,
    datePosted: '2026-11-06', validThrough: '2027-02-28',
  },
  {
    id: 'elkw-bw',
    title: { de: 'LKW-Fahrer CE E-LKW – Marktbelieferung', en: 'CE truck driver, electric truck – supermarket delivery' },
    region: { de: 'Baden-Württemberg', en: 'Baden-Württemberg' }, regionCode: 'BW',
    tags: [{ de: 'E-LKW', en: 'Electric truck' }, { de: 'Nahverkehr', en: 'Regional' }],
    text: { de: 'Belieferung von Supermärkten mit modernem Elektro-LKW. Feste Touren in der Region.', en: 'Delivering to supermarkets with a modern electric truck. Fixed routes in the region.' },
    salaryMin: 0, salaryMax: 0, housing: true,
    datePosted: '2026-11-06', validThrough: '2027-02-28',
  },
  {
    id: 'nah-niedersachsen',
    title: { de: 'LKW-Fahrer CE – Nahverkehr', en: 'CE truck driver – regional transport' },
    region: { de: 'Niedersachsen', en: 'Lower Saxony' }, regionCode: 'NI',
    tags: [{ de: 'Nahverkehr', en: 'Regional' }, { de: 'Jeden Tag zu Hause', en: 'Home every day' }],
    text: { de: 'Tagestouren im Nahverkehr – abends zu Hause.', en: 'Day routes in regional transport – home in the evening.' },
    salaryMin: 0, salaryMax: 0, housing: true,
    datePosted: '2026-11-06', validThrough: '2027-02-28',
  },
  {
    id: 'autotransporter-nrw',
    title: { de: 'LKW-Fahrer CE Autotransporter', en: 'CE truck driver, car transporter' },
    region: { de: 'Nordrhein-Westfalen', en: 'North Rhine-Westphalia' }, regionCode: 'NW',
    tags: [{ de: 'Autotransporter', en: 'Car transporter' }],
    text: { de: 'Transport von Neu- und Gebrauchtfahrzeugen. Erfahrung mit Autotransportern von Vorteil.', en: 'Transporting new and used cars. Car transporter experience is a plus.' },
    salaryMin: 0, salaryMax: 0, housing: true,
    datePosted: '2026-11-06', validThrough: '2027-02-28',
  },
  {
    id: 'getraenke-niedersachsen',
    title: { de: 'LKW-Fahrer CE – Getränkelogistik', en: 'CE truck driver – beverage logistics' },
    region: { de: 'Niedersachsen', en: 'Lower Saxony' }, regionCode: 'NI',
    tags: [{ de: 'Getränke', en: 'Beverages' }, { de: 'Verteilerverkehr', en: 'Distribution' }],
    text: { de: 'Belieferung von Getränkemärkten und Gastronomie in der Region.', en: 'Deliveries to beverage stores and restaurants in the region.' },
    salaryMin: 0, salaryMax: 0, housing: true,
    datePosted: '2026-11-06', validThrough: '2027-02-28',
  },
];
