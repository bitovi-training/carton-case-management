import type { Meta, StoryObj } from '@storybook/react';
import { useToast } from './useToast';
import { ToastProvider } from './ToastProvider';

function ToastDemo() {
  const toast = useToast();

  return (
    <div className="p-8 space-y-4">
      <h2 className="text-2xl font-bold mb-4">Toast Messages Demo</h2>
      
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Basic Toasts</h3>
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => toast.success({ message: 'Success! Operation completed.' })}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Success Toast
          </button>
          
          <button
            onClick={() => toast.error({ message: 'Error! Something went wrong.' })}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Error Toast
          </button>
          
          <button
            onClick={() => toast.warning({ message: 'Warning! Please review.' })}
            className="px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700"
          >
            Warning Toast
          </button>
          
          <button
            onClick={() => toast.info({ message: 'Info: Here is some information.' })}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Info Toast
          </button>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Toasts with Descriptions</h3>
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => toast.success({ 
              message: 'Case created successfully',
              description: 'Case #12345 has been created and assigned.'
            })}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Success with Description
          </button>
          
          <button
            onClick={() => toast.error({ 
              message: 'Failed to save changes',
              description: 'The server returned an error. Please try again.'
            })}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Error with Description
          </button>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Custom Duration</h3>
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => toast.success({ 
              message: 'Quick toast (2s)',
              duration: 2000
            })}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Quick Toast (2s)
          </button>
          
          <button
            onClick={() => toast.info({ 
              message: 'Long toast (10s)',
              duration: 10000
            })}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Long Toast (10s)
          </button>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-semibold">With Action Button</h3>
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => toast.success({ 
              message: 'Case deleted',
              description: 'The case has been removed.',
              action: {
                label: 'Undo',
                onClick: () => toast.info({ message: 'Undo clicked!' })
              }
            })}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Toast with Action
          </button>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Multiple Toasts</h3>
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => {
              toast.success({ message: 'First toast' });
              setTimeout(() => toast.info({ message: 'Second toast' }), 500);
              setTimeout(() => toast.warning({ message: 'Third toast' }), 1000);
            }}
            className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
          >
            Stack Multiple Toasts
          </button>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Dismiss</h3>
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => toast.dismiss()}
            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
          >
            Dismiss All Toasts
          </button>
        </div>
      </div>
    </div>
  );
}

const meta: Meta<typeof ToastDemo> = {
  title: 'Toast/ToastDemo',
  component: ToastDemo,
  decorators: [
    (Story) => (
      <>
        <ToastProvider />
        <Story />
      </>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ToastDemo>;

export const Demo: Story = {};
