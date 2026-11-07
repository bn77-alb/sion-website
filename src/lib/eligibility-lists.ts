// Country groups used by the application form (and mirrored in the n8n workflow).
// Westbalkan (Westbalkanregelung): Albania, Kosovo, North Macedonia, Serbia, Montenegro, Bosnia and Herzegovina
export const WB = ['AL', 'XK', 'MK', 'RS', 'ME', 'BA'];

// EU member states + EEA (Iceland, Liechtenstein, Norway) + Switzerland (free movement agreement)
export const EU = ['AT', 'BE', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FI', 'FR', 'DE', 'GR', 'HU', 'IE', 'IT', 'LV', 'LT', 'LU', 'MT', 'NL', 'PL', 'PT', 'RO', 'SK', 'SI', 'ES', 'SE'];
export const EEA_EXTRA = ['IS', 'LI', 'NO', 'CH'];
export const EU_EEA = [...EU, ...EEA_EXTRA];
