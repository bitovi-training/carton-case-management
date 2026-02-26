import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import { Alert } from '@/components/obra/Alert';
import { X, PartyPopper, Trash2 } from 'lucide-react';
import { Button } from '@/components/obra/Button';

export interface Toast {
  id: string;
  type: 'success' | 'error';
  title: string;
  message: string;
  onUndo?: () => void;
}

interface ToastContextValue {
  showToast: (toast: Omit<Toast, 'id'>) => void;
  dismissToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

const MAX_TOASTS = 3;
const AUTO_DISMISS_MS = 10000;

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [timers, setTimers] = useState<Map<string, NodeJS.Timeout>>(new Map());

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
    setTimers((prev) => {
      const timer = prev.get(id);
      if (timer) {
        clearTimeout(timer);
        const newTimers = new Map(prev);
        newTimers.delete(id);
        return newTimers;
      }
      return prev;
    });
  }, []);

  const showToast = useCallback((toast: Omit<Toast, 'id'>) => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    const newToast: Toast = { ...toast, id };

    setToasts((prev) => {
      const updated = [...prev, newToast];
      if (updated.length > MAX_TOASTS) {
        const removed = updated.shift();
        if (removed) {
          const timer = timers.get(removed.id);
          if (timer) {
            clearTimeout(timer);
          }
        }
      }
      return updated;
    });

    const timer = setTimeout(() => {
      dismissToast(id);
    }, AUTO_DISMISS_MS);

    setTimers((prev) => new Map(prev).set(id, timer));
  }, [dismissToast, timers]);

  return (
    <ToastContext.Provider value={{ showToast, dismissToast }}>
      {children}
      <div className="fixed bottom-0 left-0 right-0 z-50 flex flex-col items-center gap-3 p-4 pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className="w-full max-w-md pointer-events-auto animate-in slide-in-from-bottom-5"
          >
            <Alert
              type={toast.type === 'success' ? 'Neutral' : 'Error'}
              icon={
                toast.type === 'success' ? (
                  <PartyPopper className="h-5 w-5" />
                ) : (
                  <Trash2 className="h-5 w-5 text-destructive" />
                )
              }
              showIcon
              description={toast.message}
              showLine2
              action={
                <div className="flex gap-2">
                  {toast.onUndo && (
                    <Button
                      variant="ghost"
                      size="mini"
                      onClick={() => {
                        toast.onUndo?.();
                        dismissToast(toast.id);
                      }}
                    >
                      Undo
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    size="mini"
                    onClick={() => dismissToast(toast.id)}
                  >
                    <X className="h-4 w-4 mr-1" />
                    Dismiss
                  </Button>
                </div>
              }
              showButton
            >
              {toast.title}
            </Alert>
          </div>
        ))}
      </div>
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
