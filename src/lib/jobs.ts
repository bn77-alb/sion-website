// JobPosting structured data for the sample jobs (config.ts → sampleJobs).
import { site, type SampleJob } from '../config';
import { EU_EEA, WB } from './countries';
import type { Lang } from '../i18n';

export function jobPostingSchema(job: SampleJob, lang: Lang, pageUrl: string) {
  const req = lang === 'de'
    ? '<p>Voraussetzungen: Führerschein C/CE mit Code 95, mindestens 1 Jahr Erfahrung als LKW-Fahrer, Wohnsitz und Aufenthaltstitel in einem EU-Land oder Staatsangehörigkeit eines EU- oder Westbalkan-Staates. Direkte Festanstellung beim Arbeitgeber, keine Zeitarbeit. Kostenlos für Bewerber.</p>'
    : '<p>Requirements: licence C/CE with Code 95, at least 1 year of experience as a truck driver, residence and residence permit in an EU country or citizenship of an EU or Western Balkans country. Permanent contract directly with the employer, no temporary agency. Free for applicants.</p>';
  const housing = job.housing ? (lang === 'de' ? '<p>Wohnung oder WG möglich.</p>' : '<p>Apartment or shared flat possible.</p>') : '';
  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    title: job.title[lang],
    description: `<p>${job.text[lang]}</p>${housing}${req}`,
    identifier: { '@type': 'PropertyValue', name: site.name, value: job.id },
    datePosted: job.datePosted,
    validThrough: `${job.validThrough}T23:59:59+01:00`,
    employmentType: 'FULL_TIME',
    directApply: true,
    url: `${pageUrl}#job-${job.id}`,
    hiringOrganization: { '@type': 'Organization', name: site.name, sameAs: site.url, logo: `${site.url}/favicon.svg` },
    jobLocation: {
      '@type': 'Place',
      address: { '@type': 'PostalAddress', ...(job.city ? { addressLocality: job.city } : {}), addressRegion: job.regionCode, addressCountry: 'DE' },
    },
    applicantLocationRequirements: [...EU_EEA, ...WB].map((c) => ({ '@type': 'Country', name: c })),
  };
  if (job.salaryMin > 0) {
    schema.baseSalary = {
      '@type': 'MonetaryAmount',
      currency: 'EUR',
      value: { '@type': 'QuantitativeValue', minValue: job.salaryMin, ...(job.salaryMax > 0 ? { maxValue: job.salaryMax } : {}), unitText: 'MONTH' },
    };
  }
  return schema;
}
