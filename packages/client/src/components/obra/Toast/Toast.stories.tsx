import type { Meta, StoryObj } from '@storybook/react';
import { Toast, toast } from './index';
import { Button } from '../Button';

const meta: Meta<typeof Toast> = {
  component: Toast,
  title: 'Obra/Toast',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof Toast>;

export const Default: Story = {
  render: () => (
    <div className="flex flex-col gap-4 p-8">
      <Toast />
      <Button onClick={() => toast('Event has been created')}>
        Show Toast
      </Button>
    </div>
  ),
};

export const Success: Story = {
  render: () => (
    <div className="flex flex-col gap-4 p-8">
      <Toast />
      <Button onClick={() => toast.success('Successfully saved!')}>
        Show Success Toast
      </Button>
    </div>
  ),
};

export const Error: Story = {
  render: () => (
    <div className="flex flex-col gap-4 p-8">
      <Toast />
      <Button onClick={() => toast.error('Error! Something went wrong')}>
        Show Error Toast
      </Button>
    </div>
  ),
};

export const Warning: Story = {
  render: () => (
    <div className="flex flex-col gap-4 p-8">
      <Toast />
      <Button onClick={() => toast.warning('Warning: Please review your changes')}>
        Show Warning Toast
      </Button>
    </div>
  ),
};

export const Info: Story = {
  render: () => (
    <div className="flex flex-col gap-4 p-8">
      <Toast />
      <Button onClick={() => toast.info('New updates available')}>
        Show Info Toast
      </Button>
    </div>
  ),
};

export const WithDescription: Story = {
  render: () => (
    <div className="flex flex-col gap-4 p-8">
      <Toast />
      <Button
        onClick={() =>
          toast.success('Successfully saved!', {
            description: 'Your changes have been saved to the database.',
          })
        }
      >
        Show Toast with Description
      </Button>
    </div>
  ),
};

export const MultipleToasts: Story = {
  render: () => (
    <div className="flex flex-col gap-4 p-8">
      <Toast />
      <div className="flex gap-2">
        <Button onClick={() => toast.success('First toast')}>Toast 1</Button>
        <Button onClick={() => toast.error('Second toast')}>Toast 2</Button>
        <Button onClick={() => toast.info('Third toast')}>Toast 3</Button>
      </div>
    </div>
  ),
};

export const CustomDuration: Story = {
  render: () => (
    <div className="flex flex-col gap-4 p-8">
      <Toast duration={10000} />
      <Button onClick={() => toast('This toast will stay for 10 seconds')}>
        Show Long Duration Toast
      </Button>
    </div>
  ),
};

export const BottomPosition: Story = {
  render: () => (
    <div className="flex flex-col gap-4 p-8">
      <Toast position="bottom-center" />
      <Button onClick={() => toast('Toast at bottom center')}>
        Show Bottom Toast
      </Button>
    </div>
  ),
};

export const NoCloseButton: Story = {
  render: () => (
    <div className="flex flex-col gap-4 p-8">
      <Toast closeButton={false} />
      <Button onClick={() => toast('This toast has no close button')}>
        Show Toast Without Close Button
      </Button>
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4 p-8">
      <Toast />
      <div className="flex flex-col gap-2">
        <Button onClick={() => toast('Default toast message')}>
          Default
        </Button>
        <Button onClick={() => toast.success('Operation completed successfully')}>
          Success
        </Button>
        <Button onClick={() => toast.error('An error occurred')}>
          Error
        </Button>
        <Button onClick={() => toast.warning('Please be cautious')}>
          Warning
        </Button>
        <Button onClick={() => toast.info('Here is some information')}>
          Info
        </Button>
      </div>
    </div>
  ),
};
