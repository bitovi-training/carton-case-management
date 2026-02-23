import { Toaster as SonnerToaster, toast as sonnerToast } from 'sonner';
import { CheckCircle2, Trash2, Info } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { ToastProps, ToasterProps } from './types';

export function Toaster({ position = 'bottom-center', duration = 5000 }: ToasterProps) {
  return (
    <SonnerToaster
      position={position}
      duration={duration}
      toastOptions={{
        unstyled: true,
        classNames: {
          toast: cn(
            'flex w-full items-start gap-3 rounded-lg border border-border bg-card p-4 shadow-lg',
            'data-[type=success]:border-l-4 data-[type=success]:border-l-emerald-500',
            'data-[type=error]:border-l-4 data-[type=error]:border-l-destructive'
          ),
          title: 'text-sm font-semibold leading-[21px] tracking-[0.07px] text-foreground',
          description: 'text-sm font-normal leading-[21px] tracking-[0.07px] text-muted-foreground',
          actionButton: cn(
            'rounded-md border border-input bg-background px-3 py-1.5 text-sm font-medium',
            'hover:bg-accent hover:text-accent-foreground',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
          ),
          closeButton: cn(
            'rounded-md border border-input bg-background px-3 py-1.5 text-sm font-medium',
            'hover:bg-accent hover:text-accent-foreground',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
            'ml-auto'
          ),
        },
      }}
    />
  );
}

export function showToast({ variant = 'success', title, message, icon, duration }: ToastProps) {
  const defaultIcons = {
    success: <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-500" />,
    error: <Trash2 className="h-5 w-5 shrink-0 text-destructive" />,
    info: <Info className="h-5 w-5 shrink-0 text-primary" />,
  };

  const toastIcon = icon ?? defaultIcons[variant];

  sonnerToast.custom((id) => (
    <div className="flex items-start gap-3 flex-1" data-type={variant}>
      {toastIcon}
      <div className="flex flex-col gap-0.5 flex-1">
        <div className="text-sm font-semibold leading-[21px] tracking-[0.07px]">{title}</div>
        {message && (
          <div className="text-sm font-normal leading-[21px] tracking-[0.07px] text-muted-foreground">
            {message}
          </div>
        )}
      </div>
    </div>
  ), {
    duration,
    dismissible: true,
    closeButton: true,
  });
}

export const toast = {
  success: (title: string, message?: string, duration?: number) =>
    showToast({ variant: 'success', title, message, duration }),
  error: (title: string, message?: string, duration?: number) =>
    showToast({ variant: 'error', title, message, duration }),
  info: (title: string, message?: string, duration?: number) =>
    showToast({ variant: 'info', title, message, duration }),
  custom: showToast,
};
