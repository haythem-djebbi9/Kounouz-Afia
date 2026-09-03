/**
 * Single source of truth for the shop currency: the Tunisian dinar.
 * Every displayed price goes through here so the label never drifts.
 */
export const CURRENCY_LABEL = 'د.ت';

export const formatPrice = (amount: number): string => `${amount} ${CURRENCY_LABEL}`;
