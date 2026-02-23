import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { toast as sonnerToast } from 'sonner';
import { useToast } from './useToast';

vi.mock('sonner', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
    warning: vi.fn(),
    info: vi.fn(),
    dismiss: vi.fn(),
  },
}));

describe('useToast', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('success toast', () => {
    it('should show success toast with default duration', () => {
      const { result } = renderHook(() => useToast());
      
      act(() => {
        result.current.success({ message: 'Success message' });
      });
      
      expect(sonnerToast.success).toHaveBeenCalledWith(
        'Success message',
        expect.objectContaining({
          duration: 4000,
          icon: expect.anything(),
        })
      );
    });

    it('should show success toast with custom duration', () => {
      const { result } = renderHook(() => useToast());
      
      act(() => {
        result.current.success({ message: 'Success message', duration: 2000 });
      });
      
      expect(sonnerToast.success).toHaveBeenCalledWith(
        'Success message',
        expect.objectContaining({
          duration: 2000,
        })
      );
    });

    it('should show success toast with description', () => {
      const { result } = renderHook(() => useToast());
      
      act(() => {
        result.current.success({ 
          message: 'Success message',
          description: 'Success description'
        });
      });
      
      expect(sonnerToast.success).toHaveBeenCalledWith(
        'Success message',
        expect.objectContaining({
          description: 'Success description',
        })
      );
    });
  });

  describe('error toast', () => {
    it('should show error toast with infinite duration by default', () => {
      const { result } = renderHook(() => useToast());
      
      act(() => {
        result.current.error({ message: 'Error message' });
      });
      
      expect(sonnerToast.error).toHaveBeenCalledWith(
        'Error message',
        expect.objectContaining({
          duration: Infinity,
          icon: expect.anything(),
        })
      );
    });

    it('should show error toast with custom duration', () => {
      const { result } = renderHook(() => useToast());
      
      act(() => {
        result.current.error({ message: 'Error message', duration: 5000 });
      });
      
      expect(sonnerToast.error).toHaveBeenCalledWith(
        'Error message',
        expect.objectContaining({
          duration: 5000,
        })
      );
    });
  });

  describe('warning toast', () => {
    it('should show warning toast with default duration', () => {
      const { result } = renderHook(() => useToast());
      
      act(() => {
        result.current.warning({ message: 'Warning message' });
      });
      
      expect(sonnerToast.warning).toHaveBeenCalledWith(
        'Warning message',
        expect.objectContaining({
          duration: 4000,
          icon: expect.anything(),
        })
      );
    });
  });

  describe('info toast', () => {
    it('should show info toast with default duration', () => {
      const { result } = renderHook(() => useToast());
      
      act(() => {
        result.current.info({ message: 'Info message' });
      });
      
      expect(sonnerToast.info).toHaveBeenCalledWith(
        'Info message',
        expect.objectContaining({
          duration: 4000,
          icon: expect.anything(),
        })
      );
    });
  });

  describe('action button', () => {
    it('should include action button when provided', () => {
      const { result } = renderHook(() => useToast());
      const actionFn = vi.fn();
      
      act(() => {
        result.current.success({ 
          message: 'Success message',
          action: {
            label: 'Undo',
            onClick: actionFn,
          }
        });
      });
      
      expect(sonnerToast.success).toHaveBeenCalledWith(
        'Success message',
        expect.objectContaining({
          action: {
            label: 'Undo',
            onClick: actionFn,
          },
        })
      );
    });
  });

  describe('dismiss', () => {
    it('should dismiss toast by id', () => {
      const { result } = renderHook(() => useToast());
      
      act(() => {
        result.current.dismiss('toast-1');
      });
      
      expect(sonnerToast.dismiss).toHaveBeenCalledWith('toast-1');
    });

    it('should dismiss all toasts when no id provided', () => {
      const { result } = renderHook(() => useToast());
      
      act(() => {
        result.current.dismiss();
      });
      
      expect(sonnerToast.dismiss).toHaveBeenCalledWith(undefined);
    });
  });
});
