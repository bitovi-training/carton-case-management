import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { MultiSelect } from './MultiSelect';

const meta = {
  title: 'Common/MultiSelect',
  component: MultiSelect,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof MultiSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

const customerOptions = [
  { value: 'sarah-johnson', label: 'Sarah Johnson' },
  { value: 'michael-brown', label: 'Michael Brown' },
  { value: 'emily-davis', label: 'Emily Davis' },
  { value: 'robert-wilson', label: 'Robert Wilson' },
];

const statusOptions = [
  { value: 'todo', label: 'To Do' },
  { value: 'in-progress', label: 'In Progress' },
  { value: 'completed', label: 'Completed' },
  { value: 'closed', label: 'Closed' },
];

const priorityOptions = [
  { value: 'low', label: 'LOW' },
  { value: 'medium', label: 'MEDIUM' },
  { value: 'high', label: 'HIGH' },
  { value: 'urgent', label: 'URGENT' },
];

function MultiSelectWrapper(props: React.ComponentProps<typeof MultiSelect>) {
  const [value, setValue] = useState<string[]>(props.value || []);
  
  return <MultiSelect {...props} value={value} onChange={setValue} />;
}

export const NoSelection: Story = {
  args: {
    label: 'Customer',
    options: customerOptions,
    value: [],
    onChange: () => {},
  },
  render: (args) => (
    <div className="w-[342px]">
      <MultiSelectWrapper {...args} />
    </div>
  ),
};

export const SingleSelection: Story = {
  args: {
    label: 'Status',
    options: statusOptions,
    value: ['todo'],
    onChange: () => {},
  },
  render: (args) => (
    <div className="w-[342px]">
      <MultiSelectWrapper {...args} />
    </div>
  ),
};

export const MultipleSelections: Story = {
  args: {
    label: 'Priority',
    options: priorityOptions,
    value: ['medium', 'high', 'urgent'],
    onChange: () => {},
  },
  render: (args) => (
    <div className="w-[342px]">
      <MultiSelectWrapper {...args} />
    </div>
  ),
};

export const Interactive: Story = {
  args: {
    label: 'Customer',
    options: customerOptions,
    value: [],
    onChange: () => {},
  },
  render: () => (
    <div className="w-[342px] space-y-4">
      <MultiSelectWrapper
        label="Customer"
        options={customerOptions}
        value={[]}
        onChange={() => {}}
      />
      <MultiSelectWrapper
        label="Status"
        options={statusOptions}
        value={[]}
        onChange={() => {}}
      />
      <MultiSelectWrapper
        label="Priority"
        options={priorityOptions}
        value={[]}
        onChange={() => {}}
      />
    </div>
  ),
};

export const AllCustomersSelected: Story = {
  args: {
    label: 'Customer',
    options: customerOptions,
    value: customerOptions.map(opt => opt.value),
    onChange: () => {},
  },
  render: (args) => (
    <div className="w-[342px]">
      <MultiSelectWrapper {...args} />
    </div>
  ),
};
