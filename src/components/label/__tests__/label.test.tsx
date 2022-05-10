import React from 'react';
import { render, screen } from '@testing-library/react';
import { Label } from '../label';

test('should render the children', () => {
  render(<Label>label</Label>);
  const children = screen.getByText(/label/i);
  expect(children).toBeInTheDocument();
});
