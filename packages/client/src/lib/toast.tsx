import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { Alert } from '@/components/obra/Alert';
import { CheckCircle2, AlertCircle, AlertTriangle, Info, X } from 'lucide-react';
import { Button } from '@/components/obra/Button';
import { cn } from './utils';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface Toast {
  id: string;
  type: ToastType;
  message: string;
  description?: string;
  duration?: number;
}

interface ToastContextValue {
  toasts: Toast[];
  showToast: (toast: Omit<Toast, 'id'>) => void;
  dismissToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}

interface ToastProviderProps {
  children: ReactNode;
  defaultDuration?: number;
}

export function ToastProvider({ children, defaultDuration = 5000 }: ToastProviderProps) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((toast: Omit<Toast, 'id'>) => {
    const id = Math.random().toString(36).substring(7);
    const newToast: Toast = { ...toast, id };
    
    setToasts((prev) => [...prev, newToast]);

    // Auto-dismiss after duration
    const duration = toast.duration ?? defaultDuration;
    if (duration > 0) {
      setTimeout(() => {
        dismissToast(id);
      }, duration);
    }
  }, [defaultDuration]);

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, showToast, dismissToast }}>
      {children}
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
    </ToastContext.Provider>
  );
}

interface ToastContainerProps {
  toasts: Toast[];
  onDismiss: (id: string) => void;
}

function ToastContainer({ toasts, onDismiss }: ToastContainerProps) {
  if (toasts.length === 0) return null;

  return (
    <div 
      className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 flex flex-col gap-2 w-full max-w-md px-4"
      aria-live="polite"
      aria-atomic="false"
    >
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onDismiss={onDismiss} />
      ))}
    </div>
  );
}

interface ToastItemProps {
  toast: Toast;
  onDismiss: (id: string) => void;
}

function ToastItem({ toast, onDismiss }: ToastItemProps) {
  const { id, type, message, description } = toast;

  const typeConfig = {
    success: {
      icon: <CheckCircle2 className="h-4 w-4" />,
      alertType: 'Neutral' as const,
      iconColor: 'text-green-600',
    },
    error: {
      icon: <AlertCircle className="h-4 w-4" />,
      alertType: 'Error' as const,
      iconColor: 'text-destructive',
    },
    warning: {
      icon: <AlertTriangle className="h-4 w-4" />,
      alertType: 'Neutral' as const,
      iconColor: 'text-yellow-600',
    },
    info: {
      icon: <Info className="h-4 w-4" />,
      alertType: 'Neutral' as const,
      iconColor: 'text-blue-600',
    },
  };

  const config = typeConfig[type];

  return (
    <div
      className="animate-in slide-in-from-bottom-5 duration-300 data-[state=closed]:animate-out data-[state=closed]:slide-out-to-bottom-5"
      role="status"
      aria-live="polite"
    >
      <Alert
        type={config.alertType}
        icon={<span className={config.iconColor}>{config.icon}</span>}
        showIcon={true}
        description={description}
        action={
          <Button
            variant="ghost"
            size="small"
            onClick={() => onDismiss(id)}
            className="h-8 w-8 p-0"
            aria-label="Dismiss notification"
          >
            <X className="h-4 w-4" />
          </Button>
        }
        className={cn(
          'shadow-lg',
          type === 'success' && 'border-green-200',
          type === 'warning' && 'border-yellow-200',
          type === 'info' && 'border-blue-200'
        )}
      >
        {message}
      </Alert>
    </div>
  );
}
