// Shared submit logic for the employer, back-office and candidate forms.
// With an endpoint (site.formEndpoint, the n8n workflow "SION – Website Forms") the inquiry is sent
// directly and arrives by email at info@sionconsulting.de. Without one, the visitor's email program opens.
//
// The data goes as application/x-www-form-urlencoded (a "simple" request – no CORS preflight needed):
//   formType, lang, page, sentAt, website (spam trap), payload = JSON { fields, summary }

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
    const trap = String(fd.get('website') || '');

    if (d.requireContact === 'either' && !fd.get('email') && !fd.get('phone')) {
      show(d.msgEither || '', 'err');
      return;
    }

    // Collect fields; several checkboxes with the same name become one comma-separated value
    const fields: Record<string, string> = {};
    const summary: [string, string][] = [];
    const seen = new Set<string>();
    fd.forEach((_, key) => {
      if (seen.has(key) || ['website', 'consent', 'cv'].includes(key)) return;
      seen.add(key);
      const value = fd.getAll(key).filter((v) => typeof v === 'string' && v.trim()).join(', ');
      if (!value) return;
      fields[key] = value;
      summary.push([form.querySelector(`[name="${key}"]`)?.getAttribute('data-label') || key, value]);
    });

    if (!d.endpoint) {
      show(d.msgMail || '', 'info');
      const body = summary.map(([k, v]) => `${k}: ${v}`).join('\n');
      window.location.href = `mailto:${d.email}?subject=${encodeURIComponent(d.subject || '')}&body=${encodeURIComponent(body)}`;
      return;
    }

    const params = new URLSearchParams({
      formType: d.formType || '',
      lang: d.lang || '',
      page: location.pathname,
      sentAt: new Date().toISOString(),
      website: trap,
      payload: JSON.stringify({ fields, summary }),
    });

    const button = form.querySelector<HTMLButtonElement>('button[type="submit"]');
    if (button) button.disabled = true;
    show(d.msgSending || '', 'info');
    try {
      const res = await fetch(d.endpoint, { method: 'POST', body: params });
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
