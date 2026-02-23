import type { Meta, StoryObj } from '@storybook/react';
import { Toaster, showSuccess, showError, showInfo, showWarning } from './Toast';

const meta: Meta<typeof Toaster> = {
  component: Toaster,
  title: 'Common/Toast',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Toast notification system supporting success, error, info, and warning messages with auto-dismiss and manual close capabilities.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Toaster>;

export const Success: Story = {
  render: () => (
    <div>
      <Toaster />
      <div className="space-y-4">
        <button
          onClick={() => showSuccess('Operation completed successfully')}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Show Success Toast
        </button>
        <p className="text-sm text-gray-600">
          Click the button to see a success toast notification
        </p>
      </div>
    </div>
  ),
};

export const SuccessWithDescription: Story = {
  render: () => (
    <div>
      <Toaster />
      <div className="space-y-4">
        <button
          onClick={() =>
            showSuccess('Case created', {
              description: 'The case has been created successfully and assigned.',
            })
          }
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Show Success with Description
        </button>
        <p className="text-sm text-gray-600">
          Success toast with additional description text
        </p>
      </div>
    </div>
  ),
};

export const Error: Story = {
  render: () => (
    <div>
      <Toaster />
      <div className="space-y-4">
        <button
          onClick={() => showError('Failed to save changes')}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Show Error Toast
        </button>
        <p className="text-sm text-gray-600">
          Click the button to see an error toast notification
        </p>
      </div>
    </div>
  ),
};

export const ErrorWithDescription: Story = {
  render: () => (
    <div>
      <Toaster />
      <div className="space-y-4">
        <button
          onClick={() =>
            showError('Network error', {
              description: 'Unable to connect to the server. Please check your internet connection.',
            })
          }
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Show Error with Description
        </button>
        <p className="text-sm text-gray-600">
          Error toast with detailed error message
        </p>
      </div>
    </div>
  ),
};

export const Info: Story = {
  render: () => (
    <div>
      <Toaster />
      <div className="space-y-4">
        <button
          onClick={() => showInfo('Information message')}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Show Info Toast
        </button>
        <p className="text-sm text-gray-600">
          Click the button to see an info toast notification
        </p>
      </div>
    </div>
  ),
};

export const InfoWithDescription: Story = {
  render: () => (
    <div>
      <Toaster />
      <div className="space-y-4">
        <button
          onClick={() =>
            showInfo('New feature available', {
              description: 'Check out the new dashboard analytics in the reports section.',
            })
          }
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Show Info with Description
        </button>
        <p className="text-sm text-gray-600">
          Info toast with additional context
        </p>
      </div>
    </div>
  ),
};

export const Warning: Story = {
  render: () => (
    <div>
      <Toaster />
      <div className="space-y-4">
        <button
          onClick={() => showWarning('Please review your input')}
          className="px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700"
        >
          Show Warning Toast
        </button>
        <p className="text-sm text-gray-600">
          Click the button to see a warning toast notification
        </p>
      </div>
    </div>
  ),
};

export const WarningWithDescription: Story = {
  render: () => (
    <div>
      <Toaster />
      <div className="space-y-4">
        <button
          onClick={() =>
            showWarning('Unsaved changes', {
              description: 'You have unsaved changes that will be lost if you leave this page.',
            })
          }
          className="px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700"
        >
          Show Warning with Description
        </button>
        <p className="text-sm text-gray-600">
          Warning toast with detailed warning message
        </p>
      </div>
    </div>
  ),
};

export const WithAction: Story = {
  render: () => (
    <div>
      <Toaster />
      <div className="space-y-4">
        <button
          onClick={() =>
            showSuccess('Case deleted', {
              description: 'The case has been deleted from the system.',
              action: {
                label: 'Undo',
                onClick: () => alert('Undo clicked!'),
              },
            })
          }
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Show Toast with Action
        </button>
        <p className="text-sm text-gray-600">
          Toast with an action button that can trigger a callback
        </p>
      </div>
    </div>
  ),
};

export const CustomDuration: Story = {
  render: () => (
    <div>
      <Toaster />
      <div className="space-y-4">
        <button
          onClick={() =>
            showInfo('This message will dismiss quickly', {
              duration: 2000,
            })
          }
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Show Toast (2s duration)
        </button>
        <p className="text-sm text-gray-600">
          Toast that auto-dismisses after 2 seconds instead of default 5 seconds
        </p>
      </div>
    </div>
  ),
};

export const MultipleToasts: Story = {
  render: () => (
    <div>
      <Toaster />
      <div className="space-y-4">
        <button
          onClick={() => {
            showSuccess('First toast');
            setTimeout(() => showInfo('Second toast'), 200);
            setTimeout(() => showWarning('Third toast'), 400);
            setTimeout(() => showError('Fourth toast'), 600);
          }}
          className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
        >
          Show Multiple Toasts
        </button>
        <p className="text-sm text-gray-600">
          Demonstrates toast stacking with multiple notifications
        </p>
      </div>
    </div>
  ),
};
