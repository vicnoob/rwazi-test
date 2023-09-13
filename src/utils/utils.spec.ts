// Import the function to be tested
import { backgroundColors } from './constant';
import { getRandomColor } from './utils';
import { describe, it, expect } from 'vitest';

describe('getRandomColor', () => {
  it('returns a valid random color', () => {
    const randomColor = getRandomColor();

    expect(backgroundColors).toContain(randomColor);
  });

  it('returns the first color from the array', () => {
    // Mock Math.random to return 0
    const originalMathRandom = Math.random;
    Math.random = () => 0;

    const randomColor = getRandomColor();

    // Restore Math.random to its original state
    Math.random = originalMathRandom;

    expect(randomColor).toBe(backgroundColors[0]);
  });
});
