import React from 'react';
import { render, screen } from '@testing-library/react';
import { SearchIcon } from '../search-icon';

test('should render the icon', () => {
  render(<SearchIcon />);
  const icon = screen.getByTitle('search');
  expect(icon).toBeInTheDocument();
});
