import { useToast } from '@/lib/toast';
import { Alert } from '@/components/obra/Alert';
import { Button } from '@/components/obra/Button';

export function ToastContainer() {
  const { toasts, hideToast } = useToast();

  if (toasts.length === 0) {
    return null;
  }

  // Show only the most recent toast
  const currentToast = toasts[toasts.length - 1];

  return (
    <div className="fixed bottom-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
      <div className="pointer-events-auto w-full max-w-md">
        <Alert
          type={currentToast.type}
          showIcon
          icon={currentToast.icon}
          showButton
          action={
            <Button
              variant="outline"
              size="sm"
              onClick={() => hideToast(currentToast.id)}
            >
              Dismiss
            </Button>
          }
          description={currentToast.description}
          showLine2
        >
          {currentToast.title}
        </Alert>
      </div>
    </div>
  );
}
