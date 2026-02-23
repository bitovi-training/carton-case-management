import { useToast } from './ToastContext';
import { Toast } from './Toast';

export function Toaster() {
  const { toasts, removeToast } = useToast();

  if (toasts.length === 0) {
    return null;
  }

  return (
    <div
      className="fixed bottom-4 left-1/2 z-50 flex -translate-x-1/2 flex-col gap-2"
      aria-live="polite"
      aria-relevant="additions removals"
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="animate-in slide-in-from-bottom-4 fade-in duration-300"
        >
          <Toast
            variant={toast.variant}
            title={toast.title}
            description={toast.description}
            icon={toast.icon}
            onDismiss={() => removeToast(toast.id)}
          />
        </div>
      ))}
    </div>
  );
}
