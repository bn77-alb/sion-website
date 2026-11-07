import { test } from 'node:test';
import assert from 'node:assert/strict';
import { classify } from '../../src/scripts/attribution.ts';

test('AI search is detected from utm_source or referrer', () => {
  assert.equal(classify('', { utm_source: 'chatgpt.com' }), 'KI-Suche: ChatGPT');
  assert.equal(classify('https://chatgpt.com', {}), 'KI-Suche: ChatGPT');
  assert.equal(classify('https://www.perplexity.ai', {}), 'KI-Suche: Perplexity');
  assert.equal(classify('https://gemini.google.com', {}), 'KI-Suche: Gemini');
});
test('search engines, social and direct', () => {
  assert.equal(classify('https://www.google.de', {}), 'Google');
  assert.equal(classify('https://www.bing.com', {}), 'Bing');
  assert.equal(classify('https://www.linkedin.com', {}), 'LinkedIn');
  assert.equal(classify('', {}), 'Direkt');
  assert.equal(classify('https://example.org', {}), 'Verweis: example.org');
});
test('paid campaigns', () => {
  assert.equal(classify('https://www.google.de', { utm_source: 'google', utm_medium: 'cpc' }), 'Bezahlt: google');
});
