import type { Meta, StoryObj } from '@storybook/react';
import { Toaster, toast } from './';
import { Button } from '@/components/obra/Button';

const meta: Meta<typeof Toaster> = {
  component: Toaster,
  title: 'Components/Toaster',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof Toaster>;

export const Default: Story = {
  render: () => (
    <div className="p-8 space-y-4">
      <Toaster />
      <div className="space-y-2">
        <Button onClick={() => toast.success('Operation completed successfully!')}>
          Show Success Toast
        </Button>
        <Button onClick={() => toast.error('An error occurred. Please try again.')}>
          Show Error Toast
        </Button>
        <Button onClick={() => toast.info('This is an informational message.')}>
          Show Info Toast
        </Button>
        <Button onClick={() => toast.warning('This is a warning message.')}>
          Show Warning Toast
        </Button>
      </div>
    </div>
  ),
};

export const WithDescription: Story = {
  render: () => (
    <div className="p-8 space-y-4">
      <Toaster />
      <div className="space-y-2">
        <Button onClick={() => toast.success('Case Created', {
          description: 'Case #12345 has been successfully created.',
        })}>
          Success with Description
        </Button>
        <Button onClick={() => toast.error('Failed to Save', {
          description: 'Network connection lost. Please check your connection and try again.',
        })}>
          Error with Description
        </Button>
      </div>
    </div>
  ),
};

export const WithAction: Story = {
  render: () => (
    <div className="p-8 space-y-4">
      <Toaster />
      <Button onClick={() => toast.success('Changes saved', {
        action: {
          label: 'Undo',
          onClick: () => toast.info('Undo clicked'),
        },
      })}>
        Toast with Action Button
      </Button>
    </div>
  ),
};

export const CustomDuration: Story = {
  render: () => (
    <div className="p-8 space-y-4">
      <Toaster />
      <div className="space-y-2">
        <Button onClick={() => toast.success('Quick toast (2s)', { duration: 2000 })}>
          Short Duration (2s)
        </Button>
        <Button onClick={() => toast.error('Long toast (10s)', { duration: 10000 })}>
          Long Duration (10s)
        </Button>
        <Button onClick={() => toast.info('Persistent toast', { duration: Infinity })}>
          Persistent (Manual dismiss only)
        </Button>
      </div>
    </div>
  ),
};

export const MultipleToasts: Story = {
  render: () => (
    <div className="p-8 space-y-4">
      <Toaster />
      <Button onClick={() => {
        toast.success('First toast');
        setTimeout(() => toast.info('Second toast'), 500);
        setTimeout(() => toast.warning('Third toast'), 1000);
        setTimeout(() => toast.error('Fourth toast'), 1500);
      }}>
        Trigger Multiple Toasts
      </Button>
    </div>
  ),
};

export const TopRightPosition: Story = {
  render: () => (
    <div className="p-8 space-y-4">
      <Toaster position="top-right" />
      <Button onClick={() => toast.success('Toast appears at top-right')}>
        Show Toast (Top Right)
      </Button>
    </div>
  ),
};

export const BottomCenterPosition: Story = {
  render: () => (
    <div className="p-8 space-y-4">
      <Toaster position="bottom-center" />
      <Button onClick={() => toast.success('Toast appears at bottom-center')}>
        Show Toast (Bottom Center)
      </Button>
    </div>
  ),
};
