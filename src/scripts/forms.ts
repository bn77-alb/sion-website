// Shared submit logic for the employer and candidate forms.
// With an endpoint (site.formEndpoint) the form is posted as multipart/form-data (incl. CV file).
// Without one, the visitor's email program opens with the details prefilled.

const MAX_FILE = 5 * 1024 * 1024;

document.querySelectorAll<HTMLFormElement>('[data-sion-form]').forEach((form) => {
  const status = form.querySelector<HTMLElement>('.form-status');
  const d = form.dataset;

  const show = (text: string, kind: 'ok' | 'err' | 'info') => {
    if (!status) return;
    status.textContent = text;
    status.className = `form-status ${kind}`;
    status.hidden = false;
  };

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!form.reportValidity()) return;
    const fd = new FormData(form);
    if (fd.get('website')) return; // spam trap
    fd.delete('website');

    if (d.requireContact === 'either' && !fd.get('email') && !fd.get('phone')) {
      show(d.msgEither || '', 'err');
      return;
    }
    const file = fd.get('cv');
    if (file instanceof File && file.size > MAX_FILE) {
      show(d.msgFile || '', 'err');
      return;
    }

    // Multiple checkboxes with the same name → one comma-separated value
    const summary: [string, string][] = [];
    const seen = new Set<string>();
    fd.forEach((_, key) => {
      if (seen.has(key) || key === 'cv' || key === 'consent') return;
      seen.add(key);
      const value = fd.getAll(key).filter((v) => typeof v === 'string' && v).join(', ');
      if (value) summary.push([form.querySelector(`[name="${key}"]`)?.getAttribute('data-label') || key, value]);
    });

    if (!d.endpoint) {
      show(d.msgMail || '', 'info');
      const body = summary.map(([k, v]) => `${k}: ${v}`).join('\n');
      window.location.href = `mailto:${d.email}?subject=${encodeURIComponent(d.subject || '')}&body=${encodeURIComponent(body)}`;
      return;
    }

    fd.set('formType', d.formType || '');
    fd.set('lang', d.lang || '');
    fd.set('page', location.pathname);
    fd.set('sentAt', new Date().toISOString());
    if (file instanceof File && !file.size) fd.delete('cv');

    const button = form.querySelector<HTMLButtonElement>('button[type="submit"]');
    if (button) button.disabled = true;
    show(d.msgSending || '', 'info');
    try {
      const res = await fetch(d.endpoint, { method: 'POST', body: fd });
      if (!res.ok) throw new Error(String(res.status));
      form.reset();
      show(d.msgOk || '', 'ok');
    } catch {
      show(d.msgErr || '', 'err');
    } finally {
      if (button) button.disabled = false;
    }
  });
});
