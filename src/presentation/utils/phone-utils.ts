/**
 * Utility functions for phone number processing
 */

/**
 * Sanitizes a phone number by:
 * 1. Removing all non-digit characters
 * 2. Removing leading 0 or 62 prefix
 * 3. Handling international format with + prefix
 * 
 * @param input The raw phone number input
 * @returns A sanitized phone number
 */
export function sanitizePhoneNumber(input: string): string {
  // First remove common phone formatting characters
  let cleaned = input.replace(/[\s\-\(\)\.\+]/g, '');

  // Then keep only digits
  cleaned = cleaned.replace(/[^\d]/g, '');

  // Handle common prefixes using regex
  cleaned = cleaned.replace(/^0|^62/, '');

  return cleaned;
}