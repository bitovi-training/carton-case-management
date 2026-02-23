import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { Toaster } from './Toaster';

describe('Toaster', () => {
  it('should render without crashing', () => {
    const { container } = render(<Toaster />);
    expect(container).toBeInTheDocument();
  });

  it('should render with custom position', () => {
    const { container } = render(<Toaster position="top-right" />);
    expect(container).toBeInTheDocument();
  });

  it('should render with custom duration', () => {
    const { container } = render(<Toaster duration={5000} />);
    expect(container).toBeInTheDocument();
  });

  it('should render with close button enabled', () => {
    const { container } = render(<Toaster closeButton={true} />);
    expect(container).toBeInTheDocument();
  });

  it('should render with rich colors', () => {
    const { container } = render(<Toaster richColors={true} />);
    expect(container).toBeInTheDocument();
  });
});
