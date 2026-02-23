import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import { PartyPopper, Trash2 } from 'lucide-react';
import { Alert } from '@/components/obra/Alert';
import { Button } from '@/components/obra/Button';

export type ToastType = 'success' | 'error';

export interface Toast {
  id: string;
  type: ToastType;
  title: string;
  description: string;
}

interface ToastContextValue {
  showToast: (toast: Omit<Toast, 'id'>) => void;
  hideToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((toast: Omit<Toast, 'id'>) => {
    const id = crypto.randomUUID();
    setToasts((prev) => [...prev, { ...toast, id }]);
  }, []);

  const hideToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  // Only show the most recent toast
  const currentToast = toasts[toasts.length - 1];

  return (
    <ToastContext.Provider value={{ showToast, hideToast }}>
      {children}
      {currentToast && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 w-full max-w-md px-4">
          <Alert
            type={currentToast.type === 'success' ? 'Neutral' : 'Error'}
            icon={
              currentToast.type === 'success' ? (
                <PartyPopper className="h-5 w-5" />
              ) : (
                <Trash2 className="h-5 w-5" />
              )
            }
            showIcon
            description={currentToast.description}
            showLine2
            action={
              <Button
                variant="outline"
                size="regular"
                onClick={() => hideToast(currentToast.id)}
              >
                Dismiss
              </Button>
            }
          >
            {currentToast.title}
          </Alert>
        </div>
      )}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}
