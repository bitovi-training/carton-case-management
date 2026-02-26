import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import { Alert } from '@/components/obra/Alert';
import { PartyPopper, Trash } from 'lucide-react';
import { Button } from '@/components/obra/Button';

interface Toast {
  id: string;
  type: 'success' | 'error';
  title: string;
  message: string;
}

interface ToastContextValue {
  showToast: (params: Omit<Toast, 'id'>) => void;
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((params: Omit<Toast, 'id'>) => {
    const id = Math.random().toString(36).substring(7);
    setToasts((prev) => [...prev, { ...params, id }]);
  }, []);

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex flex-col gap-2 w-full max-w-md px-4">
        {toasts.map((toast) => (
          <Alert
            key={toast.id}
            type={toast.type === 'success' ? 'Neutral' : 'Error'}
            icon={
              toast.type === 'success' ? (
                <PartyPopper className="h-5 w-5" />
              ) : (
                <Trash className="h-5 w-5" />
              )
            }
            showIcon
            description={toast.message}
            showLine2
            action={
              <Button
                variant="outline"
                size="small"
                onClick={() => dismissToast(toast.id)}
              >
                Dismiss
              </Button>
            }
            showButton
          >
            {toast.title}
          </Alert>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }
  return context;
}
