// 2-step application form (CandidateForm.astro).
// Step 1: citizenship + country of residence (+ residence permit). Not eligible → info box, nothing is sent.
// Step 2: details. Sent to the n8n workflow "SION – Website Forms" as formType "candidate".
// The workflow checks eligibility again, builds the structured subject and emails bewerbung@sionconsulting.de.

import { getAttribution } from './attribution';
import { track } from './track';
import { isEligible } from '../lib/eligibility';

type Config = { eu: string[]; wb: string[]; names: Record<string, string> };

document.querySelectorAll<HTMLFormElement>('[data-apply-form]').forEach((form) => {
  const cfg: Config = JSON.parse(form.querySelector('[data-apply-config]')?.textContent || '{}');
  const d = form.dataset;
  const $ = <T extends Element>(sel: string) => form.querySelector<T>(sel)!;
  const step1 = $<HTMLFieldSetElement>('[data-step="1"]');
  const step2 = $<HTMLFieldSetElement>('[data-step="2"]');
  const label = $<HTMLElement>('[data-step-label]');
  const citizen = $<HTMLSelectElement>('[name="citizenshipCode"]');
  const residence = $<HTMLSelectElement>('[name="residenceCode"]');
  const permitBox = $<HTMLElement>('[data-permit]');
  const untilBox = $<HTMLElement>('[data-permit-until]');
  const month = $<HTMLSelectElement>('[name="permitMonth"]');
  const year = $<HTMLSelectElement>('[name="permitYear"]');
  const notBox = $<HTMLElement>('[data-not-eligible]');
  const notExtra = $<HTMLElement>('[data-not-eligible-extra]');
  const err1 = $<HTMLElement>('[data-step1-error]');
  const job = $<HTMLSelectElement>('[name="job"]');
  const driver = $<HTMLElement>('[data-driver]');
  const status = $<HTMLElement>('.form-status:not([data-step1-error])');

  const permitValue = () => form.querySelector<HTMLInputElement>('[name="permit"]:checked')?.value || '';
  const untilValue = () => (month.value && year.value ? `${year.value}-${month.value}` : '');

  const needsPermit = () => {
    const c = citizen.value, r = residence.value;
    return !!c && !!r && !cfg.wb.includes(c) && !cfg.eu.includes(c) && cfg.eu.includes(r);
  };

  const setStep = (n: 1 | 2) => {
    form.classList.toggle('on-step-2', n === 2);
    label.textContent = n === 1 ? d.labelOne || '' : d.labelTwo || '';
    step2.hidden = n !== 2;
    step2.disabled = n !== 2;
    step1.hidden = n === 2;
  };

  const resetResult = () => {
    notBox.hidden = true;
    err1.hidden = true;
    if (!step2.hidden) setStep(1);
  };

  const update = () => {
    const show = needsPermit();
    permitBox.hidden = !show;
    untilBox.hidden = !(show && permitValue() === 'ja');
    resetResult();
  };
  [citizen, residence, month, year].forEach((el) => el.addEventListener('change', update));
  form.querySelectorAll('[name="permit"]').forEach((el) => el.addEventListener('change', update));

  const updateDriver = () => { driver.hidden = job.value !== 'LKW'; };
  job.addEventListener('change', updateDriver);
  updateDriver();

  // Validation messages are full sentences (data-messages on the form)
  const M: Record<string, string> = JSON.parse(d.messages || '{}');
  const fail1 = (el: HTMLElement, key: string) => {
    err1.textContent = M[key] || '';
    err1.hidden = false;
    el.setAttribute('aria-invalid', 'true');
    el.focus();
  };
  form.addEventListener('input', (e) => (e.target as HTMLElement).removeAttribute?.('aria-invalid'));
  form.addEventListener('change', (e) => (e.target as HTMLElement).removeAttribute?.('aria-invalid'));

  // Driver pages: EU/EEA citizens are sent to the general applicant page
  const euHint = form.querySelector<HTMLElement>('[data-eu-hint]');
  const updateEuHint = () => { if (euHint) euHint.hidden = !cfg.eu.includes(citizen.value); };
  citizen.addEventListener('change', updateEuHint);

  $<HTMLButtonElement>('[data-next]').addEventListener('click', () => {
    err1.hidden = true;
    if (!citizen.value) return fail1(citizen, 'citizenship');
    if (euHint && cfg.eu.includes(citizen.value)) { euHint.hidden = false; euHint.querySelector('a')?.focus(); return; }
    if (!residence.value) return fail1(residence, 'residence');
    if (needsPermit()) {
      if (!permitValue()) return fail1(form.querySelector<HTMLInputElement>('[name="permit"]')!, 'permit');
      if (permitValue() === 'ja' && !month.value) return fail1(month, 'month');
      if (permitValue() === 'ja' && !year.value) return fail1(year, 'year');
    }
    const result = isEligible(cfg.eu, cfg.wb, citizen.value, residence.value, needsPermit() ? permitValue() : '', needsPermit() ? untilValue() : '');
    if (result !== 'yes') {
      notExtra.hidden = result !== 'expired';
      notExtra.textContent = result === 'expired' ? d.msgExpired || '' : '';
      notBox.hidden = false;
      notBox.focus?.();
      return;
    }
    setStep(2);
    form.scrollIntoView({ behavior: 'smooth', block: 'start' });
    $<HTMLInputElement>('[name="name"]').focus({ preventScroll: true });
  });

  $<HTMLButtonElement>('[data-back]').addEventListener('click', () => { setStep(1); citizen.focus(); });
  $<HTMLButtonElement>('[data-change]').addEventListener('click', () => { notBox.hidden = true; citizen.focus(); });

  // Entry buttons on the page: "Ich lebe in einem EU-Land / in Deutschland / im Westbalkan"
  document.querySelectorAll<HTMLElement>('[data-entry]').forEach((btn) => btn.addEventListener('click', (e) => {
    e.preventDefault();
    const entry = btn.dataset.entry || '';
    (form.querySelector('[name="entry"]') as HTMLInputElement).value = entry;
    setStep(1);
    if (entry === 'de') { residence.value = 'DE'; update(); }
    else if (entry === 'eu') {
      if (!cfg.eu.includes(residence.value) || residence.value === 'DE') residence.value = '';
      const yes = form.querySelector<HTMLInputElement>('[name="permit"][value="ja"]'); if (yes) yes.checked = true;
      update();
    } else if (entry === 'wb') { if (!cfg.wb.includes(citizen.value)) citizen.value = ''; update(); }
    document.querySelectorAll('[data-entry]').forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));
    form.scrollIntoView({ behavior: 'smooth', block: 'start' });
    (entry === 'de' || entry === 'wb' ? citizen : residence).focus({ preventScroll: true });
  }));

  const show = (text: string, kind: 'ok' | 'err' | 'info') => {
    status.textContent = text;
    status.className = `form-status ${kind}`;
    status.hidden = false;
  };

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (step2.hidden) return;
    const fd = new FormData(form);
    const fail2 = (el: HTMLElement, key: string) => { show(M[key] || '', 'err'); el.setAttribute('aria-invalid', 'true'); el.focus(); };
    const nameEl = $<HTMLInputElement>('[name="name"]');
    const emailEl = $<HTMLInputElement>('[name="email"]');
    if (!nameEl.value.trim()) return fail2(nameEl, 'name');
    if (!fd.get('email') && !fd.get('phone')) return fail2(emailEl, 'either');
    if (!emailEl.checkValidity()) return fail2(emailEl, 'email');
    if (!job.value) return fail2(job, 'job');
    const consent = $<HTMLInputElement>('[name="consent"]');
    if (!consent.checked) return fail2(consent, 'consent');

    const isDriver = fd.get('job') === 'LKW';
    const perm = needsPermit();
    const get = (k: string) => fd.getAll(k).map(String).filter((v) => v.trim()).join(', ');
    const fields: Record<string, string> = {
      citizenship: cfg.names[citizen.value] || citizen.value,
      citizenshipCode: citizen.value,
      residence: cfg.names[residence.value] || residence.value,
      residenceCode: residence.value,
      permit: perm ? permitValue() : '',
      permitUntil: perm ? untilValue() : '',
      name: get('name'), email: get('email'), phone: get('phone'),
      job: get('job'),
      licences: isDriver ? get('licences') : '',
      licenceIssued: isDriver ? get('licenceIssued') : '',
      code95: isDriver ? get('code95') : '',
      years: isDriver ? get('years') : '',
      vehicles: isDriver ? get('vehicles') : '',
      german: get('german'), english: get('english'), start: get('start'),
      message: get('message'),
      source: get('source') || 'website-form',
      entry: get('entry'),
      page: location.pathname,
      pageUrl: location.href.split('#')[0].slice(0, 300),
    };
    Object.keys(fields).forEach((k) => { if (!fields[k]) delete fields[k]; });

    const params = new URLSearchParams({
      formType: 'candidate',
      lang: d.lang || '',
      page: location.pathname,
      sentAt: new Date().toISOString(),
      website: String(fd.get('website') || ''),
      payload: JSON.stringify({ fields, attribution: getAttribution() }),
      env: import.meta.env.PUBLIC_STAGING ? 'staging' : 'production',
    });
    const button = form.querySelector<HTMLButtonElement>('button[type="submit"]');
    if (button) button.disabled = true;
    show(d.msgSending || '', 'info');
    try {
      const res = await fetch(d.endpoint || '', { method: 'POST', body: params });
      if (!res.ok) throw new Error(String(res.status));
      form.reset();
      setStep(1);
      update();
      updateDriver();
      step1.hidden = true;
      label.parentElement!.hidden = true;
      show(d.msgOk || '', 'ok');
      track('Bewerbung gesendet', { job: fields.job || '', page: location.pathname });
    } catch {
      show(d.msgErr || '', 'err');
    } finally {
      if (button) button.disabled = false;
    }
  });

  if (d.preset === 'de') { residence.value = 'DE'; }
  updateEuHint();
  update();
  setStep(1);
});
