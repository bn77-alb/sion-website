// Simple driver application form (DriverForm.astro).
import { getAttribution } from './attribution';
import { track } from './track';

document.querySelectorAll<HTMLFormElement>('[data-driver-form]').forEach((form) => {
  const d = form.dataset;
  const M: Record<string, string> = JSON.parse(d.messages || '{}');
  const names: Record<string, string> = JSON.parse(form.querySelector('[data-country-names]')?.textContent || '{}');
  const main = form.querySelector<HTMLFieldSetElement>('[data-driver-main]')!;
  const no = form.querySelector<HTMLElement>('[data-code95-no]')!;
  const status = form.querySelector<HTMLElement>('.form-status')!;
  const q = <T extends Element>(s: string) => form.querySelector<T>(s)!;

  const show = (text: string, kind: 'ok' | 'err' | 'info') => { status.textContent = text; status.className = `form-status ${kind}`; status.hidden = false; };
  const fail = (el: HTMLElement, key: string) => { show(M[key] || '', 'err'); el.setAttribute('aria-invalid', 'true'); el.focus(); };
  form.addEventListener('input', (e) => (e.target as HTMLElement).removeAttribute?.('aria-invalid'));
  form.addEventListener('change', (e) => (e.target as HTMLElement).removeAttribute?.('aria-invalid'));

  form.querySelectorAll<HTMLInputElement>('[name="code95"]').forEach((r) => r.addEventListener('change', () => {
    const yes = r.value === 'ja' && r.checked;
    main.hidden = !yes; main.disabled = !yes;
    no.hidden = yes;
    status.hidden = true;
    if (yes) q<HTMLInputElement>('[name="name"]').focus();
  }));

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (form.querySelector<HTMLInputElement>('[name="code95"]:checked')?.value !== 'ja') return fail(q('[name="code95"]'), 'code95');
    const name = q<HTMLInputElement>('[name="name"]'), email = q<HTMLInputElement>('[name="email"]'), phone = q<HTMLInputElement>('[name="phone"]');
    const res = q<HTMLSelectElement>('[name="residenceCode"]'), consent = q<HTMLInputElement>('[name="consent"]');
    if (!name.value.trim()) return fail(name, 'name');
    if (!email.value.trim() && !phone.value.trim()) return fail(email, 'either');
    if (!email.checkValidity()) return fail(email, 'email');
    if (!res.value) return fail(res, 'residence');
    if (!consent.checked) return fail(consent, 'consent');

    const fields: Record<string, string> = {
      variant: 'driver', job: 'LKW', code95: 'ja', code95EU: 'ja',
      name: name.value.trim().slice(0, 200), email: email.value.trim().slice(0, 200), phone: phone.value.trim().slice(0, 60),
      residence: names[res.value] || res.value, residenceCode: res.value,
      message: q<HTMLTextAreaElement>('[name="message"]').value.trim().slice(0, 2000),
      source: 'website-form', page: location.pathname, pageUrl: location.href.split('#')[0].slice(0, 300),
    };
    Object.keys(fields).forEach((k) => { if (!fields[k]) delete fields[k]; });
    const params = new URLSearchParams({
      formType: 'candidate', lang: d.lang || '', page: location.pathname, sentAt: new Date().toISOString(),
      website: q<HTMLInputElement>('[name="website"]').value,
      payload: JSON.stringify({ fields, attribution: getAttribution() }),
      env: import.meta.env.PUBLIC_STAGING ? 'staging' : 'production',
    });
    const btn = form.querySelector<HTMLButtonElement>('button[type="submit"]')!;
    btn.disabled = true;
    show(d.msgSending || '', 'info');
    try {
      const r = await fetch(d.endpoint || '', { method: 'POST', body: params });
      if (!r.ok) throw new Error(String(r.status));
      form.reset();
      main.hidden = true; main.disabled = true;
      form.querySelector<HTMLElement>('.code95-q')!.hidden = true;
      show(d.msgOk || '', 'ok');
      track('Bewerbung gesendet', { job: 'LKW', page: location.pathname });
    } catch {
      show(d.msgErr || '', 'err');
    } finally { btn.disabled = false; }
  });
});
