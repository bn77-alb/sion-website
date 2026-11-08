// End-to-end tests against the built site (dist/). Run: npm run build && npm run test:e2e
// Form submissions are intercepted – nothing is sent to n8n.
import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { readFile, readdir } from 'node:fs/promises';
import { join, extname } from 'node:path';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const { chromium, devices } = require('playwright');

const DIST = new URL('../../dist/', import.meta.url).pathname;
const TYPES = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.avif': 'image/avif', '.jpg': 'image/jpeg', '.png': 'image/png', '.woff2': 'font/woff2', '.woff': 'font/woff', '.xml': 'application/xml', '.txt': 'text/plain', '.ico': 'image/x-icon' };
let server, base, browser;
const INIT = "try{localStorage.setItem('sion-consent-v1', JSON.stringify({necessary:true,stats:false}))}catch(e){}";

async function htmlFiles(dir) {
  const out = [];
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) out.push(...await htmlFiles(p));
    else if (e.name.endsWith('.html')) out.push(p);
  }
  return out;
}

before(async () => {
  server = createServer(async (req, res) => {
    let p = decodeURIComponent(new URL(req.url, 'http://x').pathname);
    if (p.endsWith('/')) p += 'index.html';
    try { const body = await readFile(join(DIST, p)); res.writeHead(200, { 'content-type': TYPES[extname(p)] || 'application/octet-stream' }); res.end(body); }
    catch { res.writeHead(404); res.end('not found'); }
  });
  await new Promise((r) => server.listen(0, r));
  base = `http://localhost:${server.address().port}`;
  browser = await chromium.launch();
});
after(async () => { await browser?.close(); server?.close(); });

async function page(ctxOpts = {}, intercept) {
  const ctx = await browser.newContext(ctxOpts);
  await ctx.addInitScript(INIT);
  const p = await ctx.newPage();
  const errors = [];
  p.on('pageerror', (e) => errors.push(String(e)));
  const posts = [];
  await p.route('**/webhook/**', (r) => { posts.push(r.request().postData()); r.fulfill({ status: 200, contentType: 'application/json', body: '{"ok":true}', headers: { 'access-control-allow-origin': '*' } }); });
  return { p, ctx, errors, posts };
}
const payloadOf = (raw) => { const q = new URLSearchParams(raw); return { formType: q.get('formType'), ...JSON.parse(q.get('payload')) }; };

test('static checks: no phone, no WhatsApp, no banned terms, valid JSON-LD, hreflang', async () => {
  const files = await htmlFiles(DIST);
  assert.ok(files.length > 30);
  for (const f of files) {
    const h = await readFile(f, 'utf8');
    assert.doesNotMatch(h, /href="tel:|wa\.me|whatsapp|"telephone"/i, f);
    assert.doesNotMatch(h, /visa sponsorship|work visa germany|job in germany with visa|free visa|work permit germany for foreigners/i, f);
    for (const m of h.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) JSON.parse(m[1]);
    if (!/http-equiv="refresh"/.test(h) && !f.endsWith('404.html')) {
      assert.match(h, /<h1[\s>]/, `h1 in ${f}`);
      assert.match(h, /rel="canonical"/, `canonical in ${f}`);
      assert.match(h, /hreflang="de"[\s\S]*hreflang="en"/, `hreflang in ${f}`);
    }
  }
});

test('driver pages: lean header, no employer menu, no booking link, no info@ outside the footer', async () => {
  for (const path of ['lkw-fahrer-aus-der-eu', 'en/truck-drivers-eu', 'kontakt-fuer-fahrer', 'en/contact-drivers']) {
    const h = await readFile(join(DIST, path, 'index.html'), 'utf8');
    const main = h.slice(h.indexOf('<main'), h.indexOf('</main>'));
    const header = h.slice(h.indexOf('<header'), h.indexOf('</header>'));
    assert.doesNotMatch(main, /mailto:info@/, path);
    assert.doesNotMatch(header, /desktop-nav|Personal anfragen|Request staff/, path);
    assert.match(header, /driver-contact-link/, path);
    assert.doesNotMatch(h, /cal\.com|calendly|Cal\.com-Link/i, path);
  }
});

test('all internal links resolve', async () => {
  const files = await htmlFiles(DIST);
  const pages = new Set(files.map((f) => '/' + f.slice(DIST.length).replace(/index\.html$/, '')));
  for (const f of files) {
    const h = await readFile(f, 'utf8');
    for (const [, href] of h.matchAll(/href="(\/[^"#?]*)/g)) {
      if (href.startsWith('/_astro') || /\.[a-z0-9]+$/i.test(href)) continue;
      const norm = href.endsWith('/') ? href : href + '/';
      assert.ok(pages.has(norm), `${href} linked from ${f}`);
    }
  }
});

test('employer journey: inquiry with callback is sent once, with attribution', async () => {
  const { p, ctx, errors, posts } = await page({ viewport: { width: 1366, height: 900 } });
  await p.goto(`${base}/kontakt/?utm_source=chatgpt.com`);
  const f = p.locator('form[data-form-type=employer]');
  await f.locator('[name=company]').fill('TEST GmbH');
  await f.locator('[name=name]').fill('Test Person');
  await f.locator('[name=email]').fill('test@example.com');
  await f.locator('[name=position]').selectOption({ index: 1 });
  assert.equal(await f.locator('[name=phone]').isVisible(), false, 'phone hidden until callback ticked');
  await f.locator('[name=callback]').check();
  assert.equal(await f.locator('[name=phone]').isVisible(), true);
  await f.locator('[name=phone]').fill('0170 000000');
  await f.locator('[name=consent]').check();
  await f.locator('button[type=submit]').dblclick();
  await p.waitForTimeout(500);
  assert.equal(posts.length, 1, 'double click sends only once');
  const pl = payloadOf(posts[0]);
  assert.equal(pl.formType, 'employer');
  assert.equal(pl.fields.company, 'TEST GmbH');
  assert.equal(pl.fields.phone, '0170 000000');
  assert.equal(pl.attribution.channel, 'KI-Suche: ChatGPT');
  assert.match(await f.locator('.form-status').innerText(), /Vielen Dank|Danke/);
  assert.deepEqual(errors, []);
  await ctx.close();
});

test('employer form shows understandable validation instead of sending', async () => {
  const { p, ctx, posts } = await page();
  await p.goto(`${base}/kontakt/`);
  await p.locator('form[data-form-type=employer] button[type=submit]').click();
  await p.waitForTimeout(300);
  assert.equal(posts.length, 0);
  assert.equal(await p.evaluate(() => document.querySelector('form[data-form-type=employer] [name=company]').validity.valueMissing), true);
  await ctx.close();
});

test('applicant journey: driver living in Poland applies in two steps (phone)', async () => {
  const { p, ctx, errors, posts } = await page(devices['iPhone 13']);
  await p.goto(`${base}/en/truck-drivers-eu/`);
  assert.match(await p.locator('h1').innerText(), /without an EU passport/);
  const f = p.locator('[data-apply-form]');
  await f.locator('[name=citizenshipCode]').selectOption('UZ');
  await f.locator('[name=residenceCode]').selectOption('PL');
  await f.locator('[name=permitMonth]').selectOption('05');
  await f.locator('[name=permitYear]').selectOption('2028');
  await f.locator('[data-next]').click();
  assert.equal(await f.locator('[data-step="2"]').isVisible(), true);
  await f.locator('[name=name]').fill('TEST Driver');
  await f.locator('[name=email]').fill('driver@example.com');
  await f.locator('[name=licences][value=CE]').check();
  await f.locator('[name=code95][value=ja]').check();
  await f.locator('[name=consent]').check();
  await f.locator('button[type=submit]').click();
  await p.waitForTimeout(500);
  assert.equal(posts.length, 1);
  const pl = payloadOf(posts[0]);
  assert.equal(pl.formType, 'candidate');
  assert.equal(pl.fields.citizenship, 'Usbekistan');
  assert.equal(pl.fields.residence, 'Polen');
  assert.equal(pl.fields.permitUntil, '2028-05');
  assert.equal(pl.fields.job, 'LKW');
  assert.ok(pl.attribution.channel);
  assert.deepEqual(errors, []);
  await ctx.close();
});

test('applicant living outside the EU sees the info box and cannot send', async () => {
  const { p, ctx, posts } = await page();
  await p.goto(`${base}/fuer-bewerber/`);
  const f = p.locator('[data-apply-form]');
  for (const [c, r, permit] of [['PK', 'PK'], ['IN', 'NL', 'nein'], ['IN', 'RS']]) {
    await f.locator('[name=citizenshipCode]').selectOption(c);
    await f.locator('[name=residenceCode]').selectOption(r);
    if (permit) await f.locator(`[name=permit][value=${permit}]`).check();
    await f.locator('[data-next]').click();
    assert.equal(await f.locator('[data-not-eligible]').isVisible(), true, `${c}/${r}`);
    assert.equal(await f.locator('[data-step="2"]').isVisible(), false);
  }
  await p.evaluate(() => document.querySelector('[data-apply-form]').requestSubmit());
  await p.waitForTimeout(300);
  assert.equal(posts.length, 0);
  await ctx.close();
});

test('entry button "I live in Germany" preselects Germany', async () => {
  const { p, ctx } = await page();
  await p.goto(`${base}/en/for-applicants/`);
  await p.locator('.entry-buttons [data-entry=de]').click();
  assert.equal(await p.locator('[data-apply-form] [name=residenceCode]').inputValue(), 'DE');
  await ctx.close();
});

test('language switch leads to the matching page', async () => {
  const { p, ctx } = await page({ viewport: { width: 1366, height: 900 } });
  await p.goto(`${base}/lkw-fahrer-aus-der-eu/`);
  const en = await p.locator('a[hreflang="en"], .lang-switch a[lang="en"]').first().getAttribute('href');
  assert.equal(en, '/en/truck-drivers-eu/');
  await ctx.close();
});

test('no horizontal scrolling on phones and tablets', async () => {
  for (const d of ['iPhone SE', 'iPhone 13', 'Pixel 7', 'iPad Mini', 'iPad Mini landscape']) {
    const { p, ctx } = await page(devices[d]);
    for (const path of ['/', '/en/truck-drivers-eu/', '/lkw-fahrer-aus-der-eu/', '/kontakt-fuer-fahrer/', '/en/contact-drivers/', '/fuer-bewerber/', '/fuer-unternehmen/', '/lkw-fahrer/', '/kontakt/']) {
      await p.goto(base + path);
      const over = await p.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      assert.ok(over <= 1, `${d} ${path} overflows by ${over}px`);
    }
    await ctx.close();
  }
});

test('reduced motion: nothing is hidden by the entrance animation', async () => {
  const { p, ctx } = await page({ reducedMotion: 'reduce' });
  await p.goto(`${base}/`);
  assert.equal(await p.locator('.reveal').count(), 0);
  await ctx.close();
});

test('driver form: EU citizen gets the hint to /fuer-bewerber/, validation in full sentences', async () => {
  const { p, ctx, posts } = await page();
  await p.goto(`${base}/lkw-fahrer-aus-der-eu/`);
  const f = p.locator('[data-apply-form]');
  assert.equal(await f.locator('[name=citizenshipCode] optgroup').first().getAttribute('label'), 'Häufig');
  await f.locator('[data-next]').click();
  assert.equal(await f.locator('[data-step1-error]').innerText(), 'Bitte wählen Sie Ihre Staatsangehörigkeit.');
  await f.locator('[name=citizenshipCode]').selectOption('PL');
  assert.equal(await f.locator('[data-eu-hint]').isVisible(), true);
  await f.locator('[data-next]').click();
  assert.equal(await f.locator('[data-step="2"]').isVisible(), false);
  await f.locator('[name=citizenshipCode]').selectOption('UA');
  await f.locator('[name=residenceCode]').selectOption('PL');
  await f.locator('[data-next]').click();
  assert.equal(await f.locator('[data-step1-error]').innerText(), 'Bitte wählen Sie den Monat.');
  assert.equal(posts.length, 0);
  await ctx.close();
});

test('30-second check on the driver contact page', async () => {
  const { p, ctx, posts } = await page();
  await p.goto(`${base}/kontakt-fuer-fahrer/`);
  const box = p.locator('[data-self-check]');
  await box.locator('[data-check]').first().check();
  await box.locator('[data-check-btn]').click();
  assert.equal(await box.locator('[data-check-no]').isVisible(), true);
  for (const c of await box.locator('[data-check]').all()) await c.check();
  assert.equal(await box.locator('[data-check-yes]').isVisible(), true);
  assert.equal(await box.locator('[data-check-no]').isVisible(), false);
  assert.equal(posts.length, 0);
  await ctx.close();
});
