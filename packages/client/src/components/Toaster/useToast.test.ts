import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useToast } from './useToast';
import { toast as sonnerToast } from 'sonner';

vi.mock('sonner', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
    info: vi.fn(),
    warning: vi.fn(),
    loading: vi.fn(),
    promise: vi.fn(),
    dismiss: vi.fn(),
  },
}));

describe('useToast', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should call sonner toast.success with correct parameters', () => {
    const { result } = renderHook(() => useToast());
    result.current.success('Success message');
    expect(sonnerToast.success).toHaveBeenCalledWith('Success message', undefined);
  });

  it('should call sonner toast.success with description', () => {
    const { result } = renderHook(() => useToast());
    result.current.success('Success message', 'Success description');
    expect(sonnerToast.success).toHaveBeenCalledWith('Success message', { description: 'Success description' });
  });

  it('should call sonner toast.error with correct parameters and longer duration', () => {
    const { result } = renderHook(() => useToast());
    result.current.error('Error message');
    expect(sonnerToast.error).toHaveBeenCalledWith('Error message', { duration: 6000 });
  });

  it('should call sonner toast.error with description and longer duration', () => {
    const { result } = renderHook(() => useToast());
    result.current.error('Error message', 'Error description');
    expect(sonnerToast.error).toHaveBeenCalledWith('Error message', { description: 'Error description', duration: 6000 });
  });

  it('should call sonner toast.info with correct parameters', () => {
    const { result } = renderHook(() => useToast());
    result.current.info('Info message');
    expect(sonnerToast.info).toHaveBeenCalledWith('Info message', undefined);
  });

  it('should call sonner toast.warning with correct parameters', () => {
    const { result } = renderHook(() => useToast());
    result.current.warning('Warning message');
    expect(sonnerToast.warning).toHaveBeenCalledWith('Warning message', undefined);
  });

  it('should call sonner toast.loading with correct parameters', () => {
    const { result } = renderHook(() => useToast());
    result.current.loading('Loading message');
    expect(sonnerToast.loading).toHaveBeenCalledWith('Loading message');
  });

  it('should expose promise method', () => {
    const { result } = renderHook(() => useToast());
    expect(result.current.promise).toBe(sonnerToast.promise);
  });

  it('should expose dismiss method', () => {
    const { result } = renderHook(() => useToast());
    expect(result.current.dismiss).toBe(sonnerToast.dismiss);
  });
});
