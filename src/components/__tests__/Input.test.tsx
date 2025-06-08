
import { render, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Input } from '@/components/ui/input';

describe('Input Component', () => {
  it('renders with placeholder text', () => {
    const { getByPlaceholderText } = render(<Input placeholder="Enter text" />);
    expect(getByPlaceholderText('Enter text')).toBeDefined();
  });

  it('calls onChange handler when value changes', () => {
    const handleChange = vi.fn();
    const { container } = render(<Input onChange={handleChange} />);
    
    const input = container.querySelector('input');
    if (input) {
      fireEvent.change(input, { target: { value: 'test' } });
      expect(handleChange).toHaveBeenCalled();
    }
  });

  it('displays correct input type', () => {
    const { container } = render(<Input type="email" />);
    const input = container.querySelector('input');
    expect(input?.getAttribute('type')).toBe('email');
  });

  it('is disabled when disabled prop is true', () => {
    const { container } = render(<Input disabled />);
    const input = container.querySelector('input');
    expect(input?.hasAttribute('disabled')).toBe(true);
  });
});
