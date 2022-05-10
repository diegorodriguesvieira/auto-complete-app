import React from 'react';
import { render, screen } from '@testing-library/react';
import { HighlightedText } from '../highlighted-text';

test('should highlight the correct text ignoring case sensitivity', () => {
  render(<HighlightedText text="hi, my name is diego." highlight="Diego" />);
  const highlightedText = screen.getByTestId('highlighted-text');
  expect(highlightedText).toHaveTextContent('diego');
});
