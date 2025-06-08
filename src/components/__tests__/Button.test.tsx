
import { render, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Button } from '@/components/ui/button';

describe('Button Component', () => {
  it('renders with correct text', () => {
    const { getByText } = render(<Button>Click me</Button>);
    expect(getByText('Click me')).toBeDefined();
  });

  it('calls onClick handler when clicked', () => {
    const handleClick = vi.fn();
    const { getByText } = render(<Button onClick={handleClick}>Click me</Button>);
    
    fireEvent.click(getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('is disabled when disabled prop is true', () => {
    const { getByText } = render(<Button disabled>Disabled button</Button>);
    const button = getByText('Disabled button');
    expect(button.hasAttribute('disabled')).toBe(true);
  });

  it('applies correct variant classes', () => {
    const { getByText } = render(<Button variant="destructive">Destructive button</Button>);
    const button = getByText('Destructive button');
    expect(button.className).toContain('bg-destructive');
  });
});
