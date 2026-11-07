// Where did this visitor come from? Stored once per browser session (first page of the visit),
// sent along with form submissions so we can see which channels bring leads.
// Only the referring website's address (origin) is kept – never the full referring URL.

export type Attribution = Record<string, string>;

const AI: [RegExp, string][] = [
  [/chatgpt|openai/i, 'ChatGPT'],
  [/perplexity/i, 'Perplexity'],
  [/gemini|bard/i, 'Gemini'],
  [/copilot/i, 'Copilot'],
  [/claude\.ai|anthropic/i, 'Claude'],
];

export function classify(referrer: string, utm: Record<string, string>): string {
  const src = (utm.utm_source || '').toLowerCase();
  const med = (utm.utm_medium || '').toLowerCase();
  for (const [re, name] of AI) if (re.test(src) || re.test(referrer)) return `KI-Suche: ${name}`;
  if (/cpc|ppc|paid|ads/.test(med)) return `Bezahlt${src ? ': ' + src : ''}`;
  if (/linkedin|lnkd\.in/.test(src + referrer)) return 'LinkedIn';
  if (/facebook|instagram|fb\.|tiktok/.test(src + referrer)) return 'Social Media';
  if (/(^|\.)google\./.test(referrer)) return 'Google';
  if (/bing\.com/.test(referrer)) return 'Bing';
  if (/duckduckgo|ecosia|yahoo|yandex/.test(referrer)) return 'Andere Suchmaschine';
  if (src) return `Kampagne: ${src}`;
  if (referrer) return `Verweis: ${referrer.replace(/^https?:\/\//, '')}`;
  return 'Direkt';
}

export function getAttribution(): Attribution {
  let a: Attribution = {};
  try { a = JSON.parse(sessionStorage.getItem('sion-attr') || '{}'); } catch { /* storage blocked */ }
  if (!a.channel) {
    // Storage blocked or no entry yet: compute from the current page
    const q = new URLSearchParams(location.search);
    const utm: Record<string, string> = {};
    ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'].forEach((k) => { const v = q.get(k); if (v) utm[k] = v.slice(0, 120); });
    let ref = '';
    try { const r = new URL(document.referrer); if (r.host !== location.host) ref = r.origin; } catch { /* no referrer */ }
    a = { ...utm, referrer: ref, landingPage: location.pathname, channel: classify(ref, utm) };
  }
  return a;
}
