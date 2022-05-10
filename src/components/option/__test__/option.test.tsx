import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { Option } from '../option';

const option = { value: 'value', label: 'label' };

describe('<Option />', () => {
  test('should render the option text', () => {
    render(<Option>option</Option>);
    const children = screen.getByText(/option/i);
    expect(children).toBeInTheDocument();
  });

  test('should pass option data when clicked', () => {
    const mockOnSelect = jest.fn((option) => option);
    render(
      <Option option={option} onSelect={mockOnSelect}>
        {option.label}
      </Option>,
    );
    const element = screen.getByRole('option', { name: option.label });
    fireEvent.click(element);
    expect(mockOnSelect).toHaveBeenCalledWith(option);
  });

  test('should not call onSelect when disabled', () => {
    const mockOnSelect = jest.fn((option) => option);
    render(
      <Option option={option} onSelect={mockOnSelect} disabled>
        {option.label}
      </Option>,
    );
    const element = screen.getByRole('option', { name: option.label });
    fireEvent.click(element);
    expect(mockOnSelect).toBeCalledTimes(0);
  });
});
