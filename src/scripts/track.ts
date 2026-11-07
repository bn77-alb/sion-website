// Analytics events – only sent when (1) an analytics tool is configured in config.ts (site.analytics)
// and (2) the visitor allowed statistics in the cookie banner. Never sends names, emails or form contents.
import { site } from '../config';

type Props = Record<string, string | number>;
declare global { interface Window { dataLayer?: unknown[]; gtag?: (...a: unknown[]) => void; plausible?: (e: string, o?: { props: Props }) => void } }

const cfg = site.analytics;
let loaded = false;

function consented(): boolean {
  try { return !!JSON.parse(localStorage.getItem('sion-consent-v1') || 'null')?.stats; } catch { return false; }
}

function load() {
  if (loaded || !cfg.provider || !cfg.id || !consented()) return;
  loaded = true;
  const s = document.createElement('script');
  s.async = true;
  if (cfg.provider === 'ga4') {
    s.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(cfg.id)}`;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() { window.dataLayer!.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', cfg.id, { anonymize_ip: true });
  } else if (cfg.provider === 'plausible') {
    s.src = 'https://plausible.io/js/script.js';
    s.dataset.domain = cfg.id;
  }
  document.head.appendChild(s);
}

export function track(event: string, props: Props = {}) {
  if (!cfg.provider || !cfg.id || !consented()) return;
  load();
  if (cfg.provider === 'ga4') window.gtag?.('event', event, props);
  else if (cfg.provider === 'plausible') {
    window.plausible = window.plausible || function () { /* queued until the script loads */ };
    window.plausible(event, { props });
  }
}

// Load on page view if allowed, and as soon as the visitor gives consent
load();
document.addEventListener('sion:consent', () => load());

// Generic events
document.addEventListener('click', (e) => {
  const a = (e.target as HTMLElement).closest('a, button');
  if (!a) return;
  if (a instanceof HTMLAnchorElement && a.href.startsWith('mailto:')) track('email_click', { page: location.pathname });
  if (a.hasAttribute('data-chat-open')) track('chat_open', { page: location.pathname });
});
document.querySelectorAll('form').forEach((f) => {
  f.addEventListener('focusin', () => track('form_start', { form: f.dataset.formType || (f.hasAttribute('data-apply-form') ? 'candidate' : 'other'), page: location.pathname }), { once: true });
});
