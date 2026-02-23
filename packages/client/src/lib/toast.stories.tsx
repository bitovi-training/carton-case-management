import type { Meta, StoryObj } from '@storybook/react';
import { ToastProvider, useToast } from './toast';
import { Button } from '@/components/obra/Button';

// Demo component for Storybook
function ToastDemo() {
  const { showToast } = useToast();

  return (
    <div className="flex flex-col gap-4 p-8">
      <h2 className="text-2xl font-bold mb-4">Toast Notifications Demo</h2>
      
      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-semibold">Basic Toasts</h3>
        <div className="flex flex-wrap gap-2">
          <Button
            variant="primary"
            onClick={() => showToast({ type: 'success', message: 'Operation completed successfully!' })}
          >
            Show Success Toast
          </Button>
          
          <Button
            variant="destructive"
            onClick={() => showToast({ type: 'error', message: 'An error occurred!' })}
          >
            Show Error Toast
          </Button>
          
          <Button
            variant="secondary"
            onClick={() => showToast({ type: 'warning', message: 'Warning: Check your input' })}
          >
            Show Warning Toast
          </Button>
          
          <Button
            variant="outline"
            onClick={() => showToast({ type: 'info', message: 'Information: New feature available' })}
          >
            Show Info Toast
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-2 mt-4">
        <h3 className="text-lg font-semibold">Toasts with Descriptions</h3>
        <div className="flex flex-wrap gap-2">
          <Button
            variant="primary"
            onClick={() => 
              showToast({ 
                type: 'success', 
                message: 'Case created successfully',
                description: 'You can now view and manage your new case.'
              })
            }
          >
            Success with Description
          </Button>
          
          <Button
            variant="destructive"
            onClick={() => 
              showToast({ 
                type: 'error', 
                message: 'Failed to save changes',
                description: 'Please check your internet connection and try again.'
              })
            }
          >
            Error with Description
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-2 mt-4">
        <h3 className="text-lg font-semibold">Custom Duration</h3>
        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            onClick={() => 
              showToast({ 
                type: 'info', 
                message: 'Quick toast (2 seconds)',
                duration: 2000
              })
            }
          >
            Short Duration (2s)
          </Button>
          
          <Button
            variant="outline"
            onClick={() => 
              showToast({ 
                type: 'warning', 
                message: 'Long toast (10 seconds)',
                duration: 10000
              })
            }
          >
            Long Duration (10s)
          </Button>

          <Button
            variant="outline"
            onClick={() => 
              showToast({ 
                type: 'info', 
                message: 'No auto-dismiss',
                duration: 0
              })
            }
          >
            No Auto-Dismiss
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-2 mt-4">
        <h3 className="text-lg font-semibold">Multiple Toasts</h3>
        <div className="flex flex-wrap gap-2">
          <Button
            variant="secondary"
            onClick={() => {
              showToast({ type: 'info', message: 'First notification' });
              setTimeout(() => showToast({ type: 'success', message: 'Second notification' }), 200);
              setTimeout(() => showToast({ type: 'warning', message: 'Third notification' }), 400);
              setTimeout(() => showToast({ type: 'error', message: 'Fourth notification' }), 600);
            }}
          >
            Show Multiple Toasts
          </Button>
        </div>
      </div>

      <div className="mt-8 p-4 bg-gray-100 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">Usage Example</h3>
        <pre className="text-sm bg-white p-3 rounded overflow-x-auto">
{`import { useToast } from '@/lib/toast';

function MyComponent() {
  const { showToast } = useToast();
  
  const handleSave = () => {
    try {
      // Your save logic
      showToast({
        type: 'success',
        message: 'Saved successfully',
        description: 'Your changes have been saved.'
      });
    } catch (error) {
      showToast({
        type: 'error',
        message: 'Save failed',
        description: error.message
      });
    }
  };
  
  return <button onClick={handleSave}>Save</button>;
}`}
        </pre>
      </div>
    </div>
  );
}

const meta: Meta<typeof ToastDemo> = {
  component: ToastDemo,
  title: 'Common/Toast',
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <ToastProvider>
        <Story />
      </ToastProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ToastDemo>;

export const Interactive: Story = {};

export const SuccessExample: Story = {
  render: () => {
    const ToastExample = () => {
      const { showToast } = useToast();
      
      return (
        <div className="p-8">
          <Button
            variant="primary"
            onClick={() => showToast({ 
              type: 'success', 
              message: 'Case created successfully',
              description: 'Case #12345 has been added to your dashboard.'
            })}
          >
            Trigger Success Toast
          </Button>
        </div>
      );
    };
    
    return (
      <ToastProvider>
        <ToastExample />
      </ToastProvider>
    );
  },
};

export const ErrorExample: Story = {
  render: () => {
    const ToastExample = () => {
      const { showToast } = useToast();
      
      return (
        <div className="p-8">
          <Button
            variant="destructive"
            onClick={() => showToast({ 
              type: 'error', 
              message: 'Failed to delete case',
              description: 'Network error. Please check your connection.'
            })}
          >
            Trigger Error Toast
          </Button>
        </div>
      );
    };
    
    return (
      <ToastProvider>
        <ToastExample />
      </ToastProvider>
    );
  },
};

export const WarningExample: Story = {
  render: () => {
    const ToastExample = () => {
      const { showToast } = useToast();
      
      return (
        <div className="p-8">
          <Button
            variant="secondary"
            onClick={() => showToast({ 
              type: 'warning', 
              message: 'Unsaved changes',
              description: 'You have unsaved changes that will be lost.'
            })}
          >
            Trigger Warning Toast
          </Button>
        </div>
      );
    };
    
    return (
      <ToastProvider>
        <ToastExample />
      </ToastProvider>
    );
  },
};

export const InfoExample: Story = {
  render: () => {
    const ToastExample = () => {
      const { showToast } = useToast();
      
      return (
        <div className="p-8">
          <Button
            variant="outline"
            onClick={() => showToast({ 
              type: 'info', 
              message: 'New feature available',
              description: 'Check out the new filtering options in the sidebar.'
            })}
          >
            Trigger Info Toast
          </Button>
        </div>
      );
    };
    
    return (
      <ToastProvider>
        <ToastExample />
      </ToastProvider>
    );
  },
};
