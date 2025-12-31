import type { Meta, StoryObj } from '@storybook/react';
import { EditableTitle } from './EditableTitle';
import { fn } from '@storybook/test';

const meta = {
  title: 'Components/EditableTitle',
  component: EditableTitle,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    value: { control: 'text' },
    onSave: { action: 'saved' },
    isLoading: { control: 'boolean' },
    className: { control: 'text' },
    inputClassName: { control: 'text' },
  },
  args: {
    onSave: fn(),
  },
} satisfies Meta<typeof EditableTitle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: 'Click to edit this title',
    className: 'text-2xl font-semibold',
    inputClassName: 'text-2xl font-semibold',
  },
};

export const SmallTitle: Story = {
  args: {
    value: 'Small editable title',
    className: 'text-base font-medium',
    inputClassName: 'text-base font-medium',
  },
};

export const LargeTitle: Story = {
  args: {
    value: 'Large Editable Title',
    className: 'text-3xl font-bold',
    inputClassName: 'text-3xl font-bold',
  },
};

export const Loading: Story = {
  args: {
    value: 'Title being saved...',
    className: 'text-2xl font-semibold',
    inputClassName: 'text-2xl font-semibold',
    isLoading: true,
  },
};

export const LongTitle: Story = {
  args: {
    value:
      'This is a very long title that demonstrates how the editable title component handles longer text content',
    className: 'text-xl font-semibold',
    inputClassName: 'text-xl font-semibold',
  },
};
