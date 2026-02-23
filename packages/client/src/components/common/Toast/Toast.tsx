import { Toaster as Sonner, toast as sonnerToast } from 'sonner';
import { CheckCircle2, XCircle, Info, AlertTriangle } from 'lucide-react';
import type { ToastOptions } from './types';

/**
 * Toast component using Sonner library
 * Provides success, error, info, and warning toast notifications
 */
export function Toaster() {
  return (
    <Sonner
      position="top-right"
      expand={false}
      richColors
      closeButton
      toastOptions={{
        className: 'toast-custom',
        style: {
          borderRadius: '8px',
          padding: '16px',
          gap: '12px',
        },
      }}
    />
  );
}

/**
 * Show a success toast notification
 */
export function showSuccess(message: string, options?: ToastOptions) {
  sonnerToast.success(message, {
    description: options?.description,
    duration: options?.duration ?? 5000,
    icon: <CheckCircle2 className="h-5 w-5" />,
    action: options?.action ? {
      label: options.action.label,
      onClick: options.action.onClick,
    } : undefined,
  });
}

/**
 * Show an error toast notification
 */
export function showError(message: string, options?: ToastOptions) {
  sonnerToast.error(message, {
    description: options?.description,
    duration: options?.duration ?? 5000,
    icon: <XCircle className="h-5 w-5" />,
    action: options?.action ? {
      label: options.action.label,
      onClick: options.action.onClick,
    } : undefined,
  });
}

/**
 * Show an info toast notification
 */
export function showInfo(message: string, options?: ToastOptions) {
  sonnerToast.info(message, {
    description: options?.description,
    duration: options?.duration ?? 5000,
    icon: <Info className="h-5 w-5" />,
    action: options?.action ? {
      label: options.action.label,
      onClick: options.action.onClick,
    } : undefined,
  });
}

/**
 * Show a warning toast notification
 */
export function showWarning(message: string, options?: ToastOptions) {
  sonnerToast.warning(message, {
    description: options?.description,
    duration: options?.duration ?? 5000,
    icon: <AlertTriangle className="h-5 w-5" />,
    action: options?.action ? {
      label: options.action.label,
      onClick: options.action.onClick,
    } : undefined,
  });
}

/**
 * Generic toast function that accepts a type
 */
export function showToast(message: string, options?: ToastOptions) {
  const type = options?.type ?? 'info';
  
  switch (type) {
    case 'success':
      showSuccess(message, options);
      break;
    case 'error':
      showError(message, options);
      break;
    case 'warning':
      showWarning(message, options);
      break;
    case 'info':
    default:
      showInfo(message, options);
      break;
  }
}
