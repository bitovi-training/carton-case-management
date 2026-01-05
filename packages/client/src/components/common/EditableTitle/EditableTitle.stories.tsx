import type { Meta } from '@storybook/react';
import { EditableTitle } from './EditableTitle';
import { useState } from 'react';

const meta = {
  title: 'Components/EditableTitle',
  component: EditableTitle,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof EditableTitle>;

export default meta;

export const Default = {
  render: function Default() {
    const [value, setValue] = useState('Click to edit this title');
    const [isLoading, setIsLoading] = useState(false);

    const handleSave = async (newValue: string) => {
      setIsLoading(true);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setValue(newValue);
      setIsLoading(false);
    };

    return (
      <div className="space-y-2">
        <EditableTitle
          value={value}
          onSave={handleSave}
          isLoading={isLoading}
          className="text-2xl font-semibold"
          inputClassName="text-2xl font-semibold"
        />
        <div className="text-xs text-gray-500">Current: {value}</div>
      </div>
    );
  },
};

export const SmallTitle = {
  render: function SmallTitle() {
    const [value, setValue] = useState('Small editable title');
    const [isLoading, setIsLoading] = useState(false);

    const handleSave = async (newValue: string) => {
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 500));
      setValue(newValue);
      setIsLoading(false);
    };

    return (
      <div className="space-y-2">
        <EditableTitle
          value={value}
          onSave={handleSave}
          isLoading={isLoading}
          className="text-base font-medium"
          inputClassName="text-base font-medium"
        />
        <div className="text-xs text-gray-500">Current: {value}</div>
      </div>
    );
  },
};

export const LargeTitle = {
  render: function LargeTitle() {
    const [value, setValue] = useState('Large Editable Title');
    const [isLoading, setIsLoading] = useState(false);

    const handleSave = async (newValue: string) => {
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setValue(newValue);
      setIsLoading(false);
    };

    return (
      <div className="space-y-2">
        <EditableTitle
          value={value}
          onSave={handleSave}
          isLoading={isLoading}
          className="text-3xl font-bold"
          inputClassName="text-3xl font-bold"
        />
        <div className="text-xs text-gray-500">Current: {value}</div>
      </div>
    );
  },
};

export const Loading = {
  render: function Loading() {
    const [value, setValue] = useState('Title being saved...');

    return (
      <div className="space-y-2">
        <EditableTitle
          value={value}
          onSave={setValue}
          isLoading={true}
          className="text-2xl font-semibold"
          inputClassName="text-2xl font-semibold"
        />
        <div className="text-xs text-gray-500">This title is in loading state</div>
      </div>
    );
  },
};

export const LongTitle = {
  render: function LongTitle() {
    const [value, setValue] = useState(
      'This is a very long title that demonstrates how the editable title component handles longer text content'
    );
    const [isLoading, setIsLoading] = useState(false);

    const handleSave = async (newValue: string) => {
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setValue(newValue);
      setIsLoading(false);
    };

    return (
      <div className="space-y-2 max-w-2xl">
        <EditableTitle
          value={value}
          onSave={handleSave}
          isLoading={isLoading}
          className="text-xl font-semibold"
          inputClassName="text-xl font-semibold"
        />
        <div className="text-xs text-gray-500">Current length: {value.length} characters</div>
      </div>
    );
  },
};
