import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Toaster, toast } from './Toast';

describe('Toast', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render Toaster component', () => {
    const { container } = render(<Toaster />);
    expect(container).toBeTruthy();
  });

  it('should have success toast helper', () => {
    expect(toast.success).toBeDefined();
    expect(typeof toast.success).toBe('function');
  });

  it('should have error toast helper', () => {
    expect(toast.error).toBeDefined();
    expect(typeof toast.error).toBe('function');
  });

  it('should have info toast helper', () => {
    expect(toast.info).toBeDefined();
    expect(typeof toast.info).toBe('function');
  });

  it('should have custom toast helper', () => {
    expect(toast.custom).toBeDefined();
    expect(typeof toast.custom).toBe('function');
  });
});
