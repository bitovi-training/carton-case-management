import { createContext, useContext, useState, useCallback, ReactNode, useEffect } from 'react';
import { Alert } from '@/components/obra/Alert';
import { Button } from '@/components/obra/Button';
import { CheckCircle2, XCircle } from 'lucide-react';

interface Toast {
  id: string;
  type: 'success' | 'error';
  title: string;
  message: string;
}

interface ToastContextValue {
  showToast: (toast: Omit<Toast, 'id'>) => void;
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
  const [toast, setToast] = useState<Toast | null>(null);

  const showToast = useCallback((newToast: Omit<Toast, 'id'>) => {
    const id = Math.random().toString(36).substring(7);
    setToast({ ...newToast, id });
  }, []);

  const dismissToast = useCallback(() => {
    setToast(null);
  }, []);

  // Auto-dismiss after 4 seconds
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        dismissToast();
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [toast, dismissToast]);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast && (
        <div 
          className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-md lg:bottom-8"
          role="status"
          aria-live="polite"
          aria-atomic="true"
        >
          <Alert
            type={toast.type === 'error' ? 'Error' : 'Neutral'}
            icon={toast.type === 'success' ? <CheckCircle2 className="h-5 w-5 text-green-600" /> : <XCircle className="h-5 w-5" />}
            showIcon
            description={toast.message}
            showLine2
            action={
              <Button 
                variant="outline" 
                size="small"
                onClick={dismissToast}
              >
                Dismiss
              </Button>
            }
            showButton
          >
            {toast.title}
          </Alert>
        </div>
      )}
    </ToastContext.Provider>
  );
}
