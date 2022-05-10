import React from 'react';
import { render, screen } from '@testing-library/react';
import { Card } from '../card';

test('should render the children', () => {
  render(<Card>card</Card>);
  const children = screen.getByText(/card/i);
  expect(children).toBeInTheDocument();
});
