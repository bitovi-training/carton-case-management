import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { Alert } from '@/components/obra/Alert';
import { CheckCircle2, X } from 'lucide-react';

export interface Toast {
  id: string;
  type: 'success' | 'error';
  title: string;
  message: string;
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

let toastIdCounter = 0;

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((toast: Omit<Toast, 'id'>) => {
    const id = `toast-${Date.now()}-${toastIdCounter++}`;
    const newToast = { ...toast, id };
    
    setToasts((prev) => [...prev, newToast]);

    // Auto-dismiss after 5 seconds
    setTimeout(() => {
      dismissToast(id);
    }, 5000);
  }, []);

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, showToast, dismissToast }}>
      {children}
      
      {/* Toast container */}
      <div
        className="fixed z-50 flex flex-col gap-2 pointer-events-none"
        style={{
          bottom: '32px',
          left: '50%',
          transform: 'translateX(-50%)',
          maxWidth: 'calc(100vw - 32px)',
        }}
      >
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className="pointer-events-auto animate-in slide-in-from-bottom-5"
          >
            <Alert
              type={toast.type === 'success' ? 'Neutral' : 'Error'}
              icon={toast.type === 'success' ? <CheckCircle2 className="h-5 w-5" /> : undefined}
              showIcon={true}
              action={
                <button
                  onClick={() => dismissToast(toast.id)}
                  className="px-3 py-1.5 text-sm font-medium text-foreground hover:bg-accent rounded-md transition-colors"
                >
                  Dismiss
                </button>
              }
              showButton={true}
              description={toast.message}
              showLine2={true}
              className="w-full min-w-[320px] max-w-[500px]"
            >
              {toast.title}
            </Alert>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
