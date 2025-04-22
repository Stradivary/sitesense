import { sanitizePhoneNumber } from '../phone-utils';

describe('sanitizePhoneNumber', () => {
  it('should remove all non-digit characters', () => {
    expect(sanitizePhoneNumber('812-345-6789')).toBe('8123456789'); 
    expect(sanitizePhoneNumber('812 345 6789')).toBe('8123456789');
    expect(sanitizePhoneNumber('(812) 345-6789')).toBe('8123456789');
  });

  it('should remove leading 0', () => {
    expect(sanitizePhoneNumber('0812345678')).toBe('812345678');
    expect(sanitizePhoneNumber('081-234-5678')).toBe('812345678');
  });

  it('should remove leading 62', () => {
    expect(sanitizePhoneNumber('62812345678')).toBe('812345678');
    expect(sanitizePhoneNumber('62-812-345-678')).toBe('812345678');
  });

  it('should handle combined cases', () => {
    expect(sanitizePhoneNumber('+62 812-345-6789')).toBe('8123456789'); 
  });

  it('should handle empty or invalid input', () => {
    expect(sanitizePhoneNumber('')).toBe('');
    expect(sanitizePhoneNumber('abc')).toBe('');
    expect(sanitizePhoneNumber('--')).toBe('');
  });

  it('should preserve numbers that dont start with 0 or 62', () => {
    expect(sanitizePhoneNumber('812345678')).toBe('812345678');
    expect(sanitizePhoneNumber('999999999')).toBe('999999999');
  });

  it('should handle numbers starting with + but not 0 or 62', () => {
    expect(sanitizePhoneNumber('+1 234-567-8901')).toBe('12345678901');
  });
});