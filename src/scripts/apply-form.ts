// 2-step application form (CandidateForm.astro).
// Step 1: citizenship + country of residence (+ residence permit). Not eligible → info box, nothing is sent.
// Step 2: details. Sent to the n8n workflow "SION – Website Forms" as formType "candidate".
// The workflow checks eligibility again, builds the structured subject and emails bewerbung@sionconsulting.de.

type Config = { eu: string[]; wb: string[]; names: Record<string, string> };

const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];

function readUtm(): Record<string, string> {
  const out: Record<string, string> = {};
  try {
    const stored = JSON.parse(sessionStorage.getItem('sion-utm') || '{}');
    Object.assign(out, stored);
  } catch { /* storage blocked */ }
  const q = new URLSearchParams(location.search);
  UTM_KEYS.forEach((k) => { const v = q.get(k); if (v) out[k] = v.slice(0, 120); });
  return out;
}

export function isEligible(cfg: Config, citizen: string, residence: string, permit: string, until: string): 'yes' | 'no' | 'expired' {
  if (cfg.wb.includes(citizen) || cfg.eu.includes(citizen)) return 'yes';
  if (residence === 'DE') return 'yes';
  if (cfg.eu.includes(residence) && permit === 'ja') {
    if (until) {
      const now = new Date();
      const current = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
      if (until < current) return 'expired';
    }
    return 'yes';
  }
  return 'no';
}

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

  $<HTMLButtonElement>('[data-next]').addEventListener('click', () => {
    err1.hidden = true;
    const missing = [citizen, residence].find((el) => !el.value);
    if (missing) { missing.reportValidity(); missing.focus(); return; }
    if (needsPermit()) {
      if (!permitValue()) {
        err1.textContent = form.querySelector('[data-permit] legend')?.textContent?.replace('*', '').trim() || '';
        err1.hidden = false; return;
      }
      if (permitValue() === 'ja' && !untilValue()) { (month.value ? year : month).focus(); err1.textContent = untilBox.querySelector('span')?.textContent?.replace('*', '').trim() || ''; err1.hidden = false; return; }
    }
    const result = isEligible(cfg, citizen.value, residence.value, needsPermit() ? permitValue() : '', needsPermit() ? untilValue() : '');
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
    if (!fd.get('email') && !fd.get('phone')) { show(d.msgEither || '', 'err'); $<HTMLInputElement>('[name="email"]').focus(); return; }
    const reqd = [...step2.querySelectorAll<HTMLInputElement | HTMLSelectElement>('[required]')];
    for (const el of reqd) { if (!el.checkValidity()) { el.reportValidity(); return; } }
    const emailEl = $<HTMLInputElement>('[name="email"]');
    if (!emailEl.checkValidity()) { emailEl.reportValidity(); return; }

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
      ...readUtm(),
    };
    Object.keys(fields).forEach((k) => { if (!fields[k]) delete fields[k]; });

    const params = new URLSearchParams({
      formType: 'candidate',
      lang: d.lang || '',
      page: location.pathname,
      sentAt: new Date().toISOString(),
      website: String(fd.get('website') || ''),
      payload: JSON.stringify({ fields }),
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
    } catch {
      show(d.msgErr || '', 'err');
    } finally {
      if (button) button.disabled = false;
    }
  });

  if (d.preset === 'de') { residence.value = 'DE'; }
  update();
  setStep(1);
});
