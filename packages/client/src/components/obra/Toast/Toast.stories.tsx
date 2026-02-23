import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../Button';
import { Toaster, toast } from './Toast';

const meta: Meta<typeof Toaster> = {
  component: Toaster,
  title: 'Obra/Toast',
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div>
        <Story />
        <div className="flex flex-col gap-4 p-8">
          <h3 className="text-lg font-semibold">Click buttons to show toasts:</h3>
          <div className="flex flex-wrap gap-4">
            <Button
              variant="outline"
              onClick={() =>
                toast.success('Success!', 'A new claim has been created.')
              }
            >
              Show Success Toast
            </Button>
            <Button
              variant="outline"
              onClick={() =>
                toast.error(
                  'Deleted',
                  '"Fraud Investigation" case has been successfully deleted.'
                )
              }
            >
              Show Delete Toast
            </Button>
            <Button
              variant="outline"
              onClick={() => toast.info('Information', 'This is an info message.')}
            >
              Show Info Toast
            </Button>
            <Button
              variant="outline"
              onClick={() => toast.success('Simple Success')}
            >
              Success (No Description)
            </Button>
            <Button
              variant="outline"
              onClick={() => toast.error('Simple Error')}
            >
              Error (No Description)
            </Button>
          </div>
        </div>
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Toaster>;

export const Default: Story = {
  args: {
    position: 'bottom-center',
    duration: 5000,
  },
};

export const TopCenter: Story = {
  args: {
    position: 'top-center',
    duration: 5000,
  },
};

export const BottomRight: Story = {
  args: {
    position: 'bottom-right',
    duration: 5000,
  },
};
