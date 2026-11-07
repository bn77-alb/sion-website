// Who can we place? Same rule as in the n8n workflow "SION – Website Forms".
// Eligible: Western Balkans citizen, EU/EEA citizen, living in Germany,
// or living in an EU/EEA country with a valid residence permit there.
// This only decides whether the application form continues – the final assessment is always done by a person.

/** @param now current month as 'YYYY-MM' (for tests) */
export function isEligible(eu: string[], wb: string[], citizen: string, residence: string, permit: string, until: string, now?: string): 'yes' | 'no' | 'expired' {
  if (wb.includes(citizen) || eu.includes(citizen)) return 'yes';
  if (residence === 'DE') return 'yes';
  if (eu.includes(residence) && permit === 'ja') {
    if (until) {
      const d = new Date();
      const current = now || `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
      if (until < current) return 'expired';
    }
    return 'yes';
  }
  return 'no';
}
