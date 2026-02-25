import { createContext, useContext, useState, useCallback, ReactNode, useEffect } from 'react';
import { Alert } from '@/components/obra/Alert';
import { Button } from '@/components/obra/Button';
import { CheckCircle2, AlertCircle } from 'lucide-react';

interface Toast {
  id: string;
  type: 'success' | 'error';
  title: string;
  description: string;
}

interface ToastContextValue {
  showToast: (options: Omit<Toast, 'id'>) => void;
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
}

export function ToastProvider({ children }: ToastProviderProps) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((options: Omit<Toast, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newToast: Toast = { ...options, id };
    
    setToasts((prev) => [...prev, newToast]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 5000);
  }, []);

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 z-50 flex flex-col gap-2 p-4 lg:bottom-4 pointer-events-none">
        {toasts.map((toast) => (
          <div key={toast.id} className="pointer-events-auto">
            <Alert
              type={toast.type === 'error' ? 'Error' : 'Neutral'}
              icon={
                toast.type === 'success' ? (
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                ) : (
                  <AlertCircle className="h-5 w-5 text-red-600" />
                )
              }
              showIcon
              description={toast.description}
              showLine2
              action={
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => dismissToast(toast.id)}
                >
                  Dismiss
                </Button>
              }
              showButton
              className="min-w-[350px] max-w-[500px]"
            >
              {toast.title}
            </Alert>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
