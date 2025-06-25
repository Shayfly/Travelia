import { describe, it, expect } from 'vitest';
import { formatDate } from './formatDate';

describe('formatDate', () => {
  it('formats ISO date string', () => {
    expect(formatDate('2023-01-01')).toBe(new Date('2023-01-01').toLocaleDateString());
  });
});
