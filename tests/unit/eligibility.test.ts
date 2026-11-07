import { test } from 'node:test';
import assert from 'node:assert/strict';
import { isEligible } from '../../src/lib/eligibility.ts';
import { EU_EEA, WB } from '../../src/lib/eligibility-lists.ts';

const now = '2026-11';
const e = (c: string, r: string, p = '', u = '') => isEligible(EU_EEA, WB, c, r, p, u, now);

test('Western Balkans citizens are eligible wherever they live', () => {
  for (const c of ['AL', 'XK', 'MK', 'RS', 'ME', 'BA']) assert.equal(e(c, c), 'yes');
  assert.equal(e('AL', 'PK'), 'yes');
});
test('EU/EEA citizens are eligible', () => {
  assert.equal(e('PL', 'PL'), 'yes');
  assert.equal(e('RO', 'GB'), 'yes');
  assert.equal(e('NO', 'NO'), 'yes');
});
test('anyone living in Germany is eligible', () => {
  assert.equal(e('IN', 'DE'), 'yes');
});
test('third-country national in an EU country needs a valid permit there', () => {
  assert.equal(e('UZ', 'PL', 'ja', '2028-05'), 'yes');
  assert.equal(e('IN', 'LT', 'ja', ''), 'yes');
  assert.equal(e('IN', 'NL', 'nein'), 'no');
  assert.equal(e('UZ', 'PL', ''), 'no');
});
test('expired permit is rejected, permit valid this month is accepted', () => {
  assert.equal(e('UZ', 'PL', 'ja', '2026-01'), 'expired');
  assert.equal(e('UZ', 'PL', 'ja', '2026-11'), 'yes');
});
test('third-country national living outside the EU is not eligible', () => {
  assert.equal(e('PK', 'PK'), 'no');
  assert.equal(e('IN', 'RS'), 'no'); // living in the Western Balkans without WB citizenship
  assert.equal(e('TN', 'TN', 'ja', '2030-01'), 'no');
});
