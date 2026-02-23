import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { Toast } from './Toast';

describe('Toast', () => {
  it('should render toast component without errors', () => {
    const { container } = render(<Toast />);
    expect(container).toBeInTheDocument();
  });

  it('should render with custom position prop', () => {
    const { container } = render(<Toast position="bottom-center" />);
    expect(container).toBeInTheDocument();
  });

  it('should render with custom duration prop', () => {
    const { container } = render(<Toast duration={3000} />);
    expect(container).toBeInTheDocument();
  });

  it('should render with closeButton prop', () => {
    const { container } = render(<Toast closeButton={true} />);
    expect(container).toBeInTheDocument();
  });

  it('should render with richColors prop', () => {
    const { container } = render(<Toast richColors={true} />);
    expect(container).toBeInTheDocument();
  });

  it('should render with expand prop', () => {
    const { container } = render(<Toast expand={true} />);
    expect(container).toBeInTheDocument();
  });
});
