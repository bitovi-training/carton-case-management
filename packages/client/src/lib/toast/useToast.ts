import { toast as sonnerToast } from 'sonner';
import { createElement } from 'react';
import { CheckCircle2, XCircle, AlertTriangle, Info } from 'lucide-react';
import type { ToastType, ToastOptions } from './types';

const DEFAULT_DURATION = 4000;
const ERROR_DURATION = Infinity;

const TOAST_ICONS = {
  success: CheckCircle2,
  error: XCircle,
  warning: AlertTriangle,
  info: Info,
};

export function useToast() {
  const showToast = (type: ToastType, options: ToastOptions) => {
    const { message, description, duration, action } = options;
    
    const toastDuration = duration ?? (type === 'error' ? ERROR_DURATION : DEFAULT_DURATION);
    
    const Icon = TOAST_ICONS[type];
    
    const toastOptions = {
      description,
      duration: toastDuration,
      icon: createElement(Icon, { className: 'h-5 w-5' }),
      action: action ? {
        label: action.label,
        onClick: action.onClick,
      } : undefined,
    };

    switch (type) {
      case 'success':
        return sonnerToast.success(message, toastOptions);
      case 'error':
        return sonnerToast.error(message, toastOptions);
      case 'warning':
        return sonnerToast.warning(message, toastOptions);
      case 'info':
        return sonnerToast.info(message, toastOptions);
    }
  };

  return {
    success: (options: ToastOptions) => showToast('success', options),
    error: (options: ToastOptions) => showToast('error', options),
    warning: (options: ToastOptions) => showToast('warning', options),
    info: (options: ToastOptions) => showToast('info', options),
    dismiss: (toastId?: string | number) => sonnerToast.dismiss(toastId),
  };
}
