// Country lists for the application form. Names come from the built-in Intl data at build time.
import type { Lang } from '../i18n';

import { WB, EU, EEA_EXTRA, EU_EEA } from './eligibility-lists';
export { WB, EU, EEA_EXTRA, EU_EEA };

const ALL = `AF AX AL DZ AS AD AO AI AG AR AM AW AU AT AZ BS BH BD BB BY BE BZ BJ BM BT BO BA BW BR BN BG BF BI CV KH CM CA KY CF TD CL CN CO KM CG CD CK CR CI HR CU CW CY CZ DK DJ DM DO EC EG SV GQ ER EE SZ ET FK FO FJ FI FR GF PF GA GM GE DE GH GI GR GL GD GP GU GT GG GN GW GY HT HN HK HU IS IN ID IR IQ IE IM IL IT JM JP JE JO KZ KE KI XK KW KG LA LV LB LS LR LY LI LT LU MO MG MW MY MV ML MT MH MQ MR MU YT MX FM MD MC MN ME MS MA MZ MM NA NR NP NL NC NZ NI NE NG NU KP MK NO OM PK PW PS PA PG PY PE PH PL PT PR QA RE RO RU RW WS SM ST SA SN RS SC SL SG SX SK SI SB SO ZA KR SS ES LK SD SR SE CH SY TW TJ TZ TH TL TG TO TT TN TR TM TC TV UG UA AE GB US UY UZ VU VA VE VN YE ZM ZW`.split(' ');

const manual: Record<string, Record<Lang, string>> = { XK: { de: 'Kosovo', en: 'Kosovo' } };

export function countryName(code: string, lang: Lang): string {
  if (manual[code]) return manual[code][lang];
  try {
    return new Intl.DisplayNames([lang], { type: 'region' }).of(code) || code;
  } catch {
    return code;
  }
}

const sortByName = (codes: string[], lang: Lang) =>
  codes.map((c) => ({ code: c, name: countryName(c, lang) })).sort((a, b) => a.name.localeCompare(b.name, lang));

/** Option groups for the citizenship dropdown: Westbalkan, EU/EEA, all others. */
export function citizenshipGroups(lang: Lang) {
  const rest = ALL.filter((c) => !WB.includes(c) && !EU_EEA.includes(c));
  return [
    { label: lang === 'de' ? 'Westbalkan' : 'Western Balkans', items: sortByName(WB, lang) },
    { label: lang === 'de' ? 'EU / EWR / Schweiz' : 'EU / EEA / Switzerland', items: sortByName(EU_EEA, lang) },
    { label: lang === 'de' ? 'Andere Länder' : 'Other countries', items: sortByName(rest, lang) },
  ];
}

/** Option groups for the residence dropdown: Germany, EU/EEA, Westbalkan, all others. */
export function residenceGroups(lang: Lang) {
  const rest = ALL.filter((c) => !WB.includes(c) && !EU_EEA.includes(c));
  return [
    { label: lang === 'de' ? 'Deutschland' : 'Germany', items: sortByName(['DE'], lang) },
    { label: lang === 'de' ? 'EU / EWR / Schweiz' : 'EU / EEA / Switzerland', items: sortByName(EU_EEA.filter((c) => c !== 'DE'), lang) },
    { label: lang === 'de' ? 'Westbalkan' : 'Western Balkans', items: sortByName(WB, lang) },
    { label: lang === 'de' ? 'Andere Länder' : 'Other countries', items: sortByName(rest, lang) },
  ];
}

/** German names for every code – the email subject is always in German. */
export const germanNames = (): Record<string, string> =>
  Object.fromEntries(ALL.map((c) => [c, countryName(c, 'de')]));

// Driver pages: the most common nationalities first, EU/EEA last (brief 8 Nov 2026, task 7)
export const FREQUENT = ['UA', 'BY', 'UZ', 'KZ', 'GE', 'MD', 'IN', 'PH', 'TR', 'KG'];
export function driverCitizenshipGroups(lang: Lang) {
  const rest = ALL.filter((c) => !FREQUENT.includes(c) && !EU_EEA.includes(c));
  return [
    { label: lang === 'de' ? 'Häufig' : 'Common', items: FREQUENT.map((c) => ({ code: c, name: countryName(c, lang) })) },
    { label: lang === 'de' ? 'Andere Länder' : 'Other countries', items: sortByName(rest, lang) },
    { label: lang === 'de' ? 'EU / EWR / Schweiz' : 'EU / EEA / Switzerland', items: sortByName(EU_EEA, lang) },
  ];
}

// Simple driver form: countries where most drivers live first, then the rest of the EU/EEA, then all others
const DRIVER_RES = ['PL', 'LT', 'LV', 'CZ', 'SK', 'NL', 'HU', 'RO'];
export function driverResidenceGroups(lang: Lang) {
  return [
    { label: lang === 'de' ? 'Häufig' : 'Common', items: DRIVER_RES.map((c) => ({ code: c, name: countryName(c, lang) })) },
    { label: lang === 'de' ? 'Andere EU-Länder' : 'Other EU countries', items: sortByName(EU_EEA.filter((c) => !DRIVER_RES.includes(c)), lang) },
    { label: lang === 'de' ? 'Andere Länder' : 'Other countries', items: sortByName(ALL.filter((c) => !EU_EEA.includes(c)), lang) },
  ];
}
