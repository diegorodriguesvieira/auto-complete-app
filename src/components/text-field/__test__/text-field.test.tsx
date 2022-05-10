import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { TextField } from '../text-field';

describe('<TextField />', () => {
  test('should render email input', () => {
    render(<TextField type="email" />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('type', 'email');
  });

  test('should type the value', () => {
    render(<TextField type="email" name="email" />);
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'email@email.com' } });
    expect(input).toHaveValue('email@email.com');
  });

  test('should pass the class name', () => {
    render(<TextField type="email" name="email" className="email" />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveClass('email');
  });
});
