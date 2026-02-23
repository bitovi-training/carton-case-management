import { useToast } from '@/lib/toast';
import { Button } from '@/components/obra/Button';

export function ToastDemo() {
  const { showToast } = useToast();

  return (
    <div className="flex flex-col gap-4 p-8">
      <h2 className="text-2xl font-bold">Toast Notifications Demo</h2>
      
      <div className="flex flex-wrap gap-4">
        <Button
          onClick={() =>
            showToast({
              title: 'Success!',
              description: 'Your action was completed successfully.',
              type: 'success',
            })
          }
        >
          Show Success Toast
        </Button>

        <Button
          variant="destructive"
          onClick={() =>
            showToast({
              title: 'Error occurred',
              description: 'Something went wrong. Please try again.',
              type: 'error',
            })
          }
        >
          Show Error Toast
        </Button>

        <Button
          variant="outline"
          onClick={() =>
            showToast({
              title: 'Warning',
              description: 'Please review your changes before proceeding.',
              type: 'warning',
            })
          }
        >
          Show Warning Toast
        </Button>

        <Button
          variant="secondary"
          onClick={() =>
            showToast({
              title: 'Information',
              description: 'Here is some useful information for you.',
              type: 'info',
            })
          }
        >
          Show Info Toast
        </Button>

        <Button
          variant="outline"
          onClick={() =>
            showToast({
              title: 'Interaction Behavior',
              description: 'Hi Maria, log in with your IAQ account/receive notice of whether with driver info of a work case',
              type: 'warning',
              duration: 8000,
            })
          }
        >
          Show Figma Example
        </Button>
      </div>

      <div className="mt-4">
        <p className="text-sm text-muted-foreground">
          Click the buttons above to test different toast notification types.
          Toasts will auto-dismiss after 5 seconds (or 8 seconds for the Figma example).
        </p>
      </div>
    </div>
  );
}
