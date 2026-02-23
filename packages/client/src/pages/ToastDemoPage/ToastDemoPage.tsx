import { useToast } from '@/lib/toast';

export function ToastDemoPage() {
  const toast = useToast();

  return (
    <div className="p-8 space-y-6 bg-white rounded-lg">
      <h1 className="text-3xl font-bold">Toast Messages Demo</h1>
      <p className="text-gray-600">
        This page demonstrates the toast notification system. Click the buttons below to test different toast types.
      </p>

      <div className="space-y-4">
        <div>
          <h2 className="text-xl font-semibold mb-2">Basic Toasts</h2>
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

        <div>
          <h2 className="text-xl font-semibold mb-2">Toasts with Descriptions</h2>
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

        <div>
          <h2 className="text-xl font-semibold mb-2">Multiple Toasts</h2>
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

        <div>
          <h2 className="text-xl font-semibold mb-2">With Action Button</h2>
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
    </div>
  );
}
