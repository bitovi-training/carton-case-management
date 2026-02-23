import type { Meta, StoryObj } from '@storybook/react';
import { CheckCircle2, Trash2, AlertTriangle } from 'lucide-react';
import { Toast } from './Toast';
import { ToastProvider, useToast } from './ToastContext';
import { Toaster } from './Toaster';

const meta: Meta<typeof Toast> = {
  component: Toast,
  title: 'Obra/Toast',
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="flex min-h-[200px] items-center justify-center p-8">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Toast>;

export const Success: Story = {
  args: {
    variant: 'success',
    title: 'Success!',
    description: 'A new claim has been created.',
  },
};

export const Destructive: Story = {
  args: {
    variant: 'destructive',
    title: 'Deleted',
    description: '"Insurance Claim Dispute" case has been successfully deleted.',
  },
};

export const SuccessWithCustomIcon: Story = {
  args: {
    variant: 'success',
    title: 'Success!',
    description: 'Operation completed successfully.',
    icon: <CheckCircle2 className="h-5 w-5 text-green-600" />,
  },
};

export const DestructiveWithCustomIcon: Story = {
  args: {
    variant: 'destructive',
    title: 'Error',
    description: 'Something went wrong. Please try again.',
    icon: <AlertTriangle className="h-5 w-5 text-red-600" />,
  },
};

// Interactive example with ToastProvider
function ToastDemo() {
  const { addToast } = useToast();

  return (
    <div className="flex flex-col gap-4">
      <button
        onClick={() =>
          addToast({
            variant: 'success',
            title: 'Success!',
            description: 'A new claim has been created.',
          })
        }
        className="rounded-md border border-border bg-white px-4 py-2 text-sm font-medium hover:bg-accent"
      >
        Show Success Toast
      </button>
      <button
        onClick={() =>
          addToast({
            variant: 'destructive',
            title: 'Deleted',
            description: '"Test Case" has been successfully deleted.',
          })
        }
        className="rounded-md border border-border bg-white px-4 py-2 text-sm font-medium hover:bg-accent"
      >
        Show Delete Toast
      </button>
    </div>
  );
}

export const Interactive: Story = {
  render: () => (
    <ToastProvider>
      <ToastDemo />
      <Toaster />
    </ToastProvider>
  ),
};

export const MobileView: Story = {
  args: {
    variant: 'success',
    title: 'Success!',
    description: 'A new claim has been created.',
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};
