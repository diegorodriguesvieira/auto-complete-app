import React from 'react';
import { render, screen } from '@testing-library/react';
import { Container } from '../container';

test('should render the children', () => {
  render(<Container>container</Container>);
  const children = screen.getByText(/container/i);
  expect(children).toBeInTheDocument();
});
