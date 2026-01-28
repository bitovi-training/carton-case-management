import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Label } from './Label';

describe('Label', () => {
  it('should render correctly', () => {
    render(<Label>Test Label</Label>);
    expect(screen.getByText('Test Label')).toBeInTheDocument();
  });

  it('should render as a label element', () => {
    const { container } = render(<Label>Label</Label>);
    const label = container.querySelector('label');
    expect(label).toBeInTheDocument();
  });

  it('should apply custom className', () => {
    const { container } = render(<Label className="custom-class">Label</Label>);
    const label = container.querySelector('label');
    expect(label).toHaveClass('custom-class');
  });

  it('should support htmlFor attribute', () => {
    render(<Label htmlFor="test-input">Test Label</Label>);
    const label = screen.getByText('Test Label');
    expect(label).toHaveAttribute('for', 'test-input');
  });

  describe('layout variants', () => {
    it('should render inline layout by default', () => {
      const { container } = render(<Label>Inline Label</Label>);
      const label = container.querySelector('label');
      expect(label).toHaveClass('inline-flex');
    });

    it('should render inline layout explicitly', () => {
      const { container } = render(<Label layout="inline">Inline Label</Label>);
      const label = container.querySelector('label');
      expect(label).toHaveClass('inline-flex');
    });

    it('should render block layout', () => {
      const { container } = render(<Label layout="block">Block Label</Label>);
      const label = container.querySelector('label');
      expect(label).toHaveClass('block');
    });
  });

  describe('accessibility', () => {
    it('should be associated with form controls via htmlFor', () => {
      const { container } = render(
        <div>
          <Label htmlFor="email">Email</Label>
          <input id="email" type="email" />
        </div>
      );
      const label = screen.getByText('Email');
      const input = container.querySelector('input');
      expect(label).toHaveAttribute('for', 'email');
      expect(input).toHaveAttribute('id', 'email');
    });

    it('should support disabled state styling for associated inputs', () => {
      const { container } = render(
        <div>
          <Label htmlFor="disabled-input">Disabled Field</Label>
          <input id="disabled-input" type="text" disabled />
        </div>
      );
      const label = container.querySelector('label');
      expect(label?.className).toContain('peer-disabled:opacity-70');
      expect(label?.className).toContain('peer-disabled:cursor-not-allowed');
    });
  });

  describe('forwarding ref', () => {
    it('should forward ref to label element', () => {
      const ref = { current: null };
      render(<Label ref={ref}>Label with ref</Label>);
      expect(ref.current).toBeInstanceOf(HTMLLabelElement);
    });
  });
});

