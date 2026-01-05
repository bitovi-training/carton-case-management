import type { Meta } from '@storybook/react';
import { EditableSelect } from './EditableSelect';
import { useState } from 'react';

const meta = {
  title: 'Components/EditableSelect',
  component: EditableSelect,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof EditableSelect>;

export default meta;

const statusOptions = [
  { value: 'open', label: 'Open' },
  { value: 'in_progress', label: 'In Progress' },
  { value: 'closed', label: 'Closed' },
];

const priorityOptions = [
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' },
  { value: 'urgent', label: 'Urgent' },
];

export const Default = {
  render: function Default() {
    const [value, setValue] = useState('open');
    return (
      <div className="space-y-2">
        <EditableSelect
          value={value}
          options={statusOptions}
          onChange={setValue}
          placeholder="Select status..."
        />
        <div className="text-xs text-gray-500">Current: {value}</div>
      </div>
    );
  },
};

export const AlwaysEditing = {
  render: function AlwaysEditing() {
    const [value, setValue] = useState('medium');
    return (
      <div className="space-y-2">
        <EditableSelect
          value={value}
          options={priorityOptions}
          onChange={setValue}
          alwaysEditing
          placeholder="Select priority..."
          triggerClassName="w-48"
        />
        <div className="text-xs text-gray-500">Current: {value}</div>
      </div>
    );
  },
};

export const WithEmptyValue = {
  render: function WithEmptyValue() {
    const [value, setValue] = useState('');
    return (
      <div className="space-y-2">
        <EditableSelect
          value={value}
          options={statusOptions}
          onChange={setValue}
          allowEmpty
          emptyLabel="None selected"
          placeholder="Select status..."
          alwaysEditing
          triggerClassName="w-48"
        />
        <div className="text-xs text-gray-500">Current: {value || '(empty)'}</div>
      </div>
    );
  },
};

export const Disabled = {
  render: function Disabled() {
    const [value, setValue] = useState('closed');
    return (
      <div className="space-y-2">
        <EditableSelect value={value} options={statusOptions} onChange={setValue} disabled />
        <div className="text-xs text-gray-500">This select is disabled</div>
      </div>
    );
  },
};

export const CustomStyling = {
  render: function CustomStyling() {
    const [value, setValue] = useState('high');
    return (
      <div className="space-y-2">
        <EditableSelect
          value={value}
          options={priorityOptions}
          onChange={setValue}
          displayClassName="font-semibold text-red-600"
          triggerClassName="w-48 font-semibold"
          tooltipText="Click to change priority"
        />
        <div className="text-xs text-gray-500">Current: {value}</div>
      </div>
    );
  },
};

export const LongOptions = {
  render: function LongOptions() {
    const [value, setValue] = useState('option2');
    const longOptions = [
      { value: 'option1', label: 'This is a very long option label that might wrap' },
      { value: 'option2', label: 'Another long option with detailed description' },
      { value: 'option3', label: 'Short label' },
    ];
    return (
      <div className="space-y-2">
        <EditableSelect
          value={value}
          options={longOptions}
          onChange={setValue}
          placeholder="Select an option..."
        />
        <div className="text-xs text-gray-500">Current: {value}</div>
      </div>
    );
  },
};

export const ManyOptions = {
  render: function ManyOptions() {
    const [value, setValue] = useState('item5');
    const manyOptions = Array.from({ length: 20 }, (_, i) => ({
      value: `item${i + 1}`,
      label: `Item ${i + 1}`,
    }));
    return (
      <div className="space-y-2">
        <EditableSelect
          value={value}
          options={manyOptions}
          onChange={setValue}
          placeholder="Select item..."
          alwaysEditing
          triggerClassName="w-48"
        />
        <div className="text-xs text-gray-500">Current: {value}</div>
      </div>
    );
  },
};

export const InContext = {
  render: function InContext() {
    const [value, setValue] = useState('in_progress');
    return (
      <div className="p-4 border rounded">
        <div className="mb-2 text-sm text-gray-600">Status:</div>
        <EditableSelect
          value={value}
          options={statusOptions}
          onChange={setValue}
          displayClassName="text-lg"
          tooltipText="Click to edit status"
        />
      </div>
    );
  },
};
