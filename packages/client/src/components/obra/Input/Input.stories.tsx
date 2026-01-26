import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { Input } from './Input';
import { Search, X, Mail, Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';

const meta: Meta<typeof Input> = {
  component: Input,
  title: 'Obra/Input',
  tags: ['autodocs'],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/MQUbIrlfuM8qnr9XZ7jc82/Obra-shadcn-ui--Carton-?node-id=16-1738&m=dev',
    },
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['mini', 'small', 'regular', 'large'],
    },
    roundness: {
      control: 'select',
      options: ['default', 'round'],
    },
    error: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    placeholder: 'Enter text...',
  },
};

export const SizeMini: Story = {
  name: 'Size: Mini',
  args: {
    size: 'mini',
    placeholder: 'Mini input',
  },
};

export const SizeSmall: Story = {
  name: 'Size: Small',
  args: {
    size: 'small',
    placeholder: 'Small input',
  },
};

export const SizeRegular: Story = {
  name: 'Size: Regular',
  args: {
    size: 'regular',
    placeholder: 'Regular input',
  },
};

export const SizeLarge: Story = {
  name: 'Size: Large',
  args: {
    size: 'large',
    placeholder: 'Large input',
  },
};

export const RoundnessDefault: Story = {
  name: 'Roundness: Default',
  args: {
    roundness: 'default',
    placeholder: 'Default roundness',
  },
};

export const RoundnessRound: Story = {
  name: 'Roundness: Round',
  args: {
    roundness: 'round',
    placeholder: 'Fully rounded',
  },
};

export const StateEmpty: Story = {
  name: 'State: Empty',
  args: {},
};

export const StatePlaceholder: Story = {
  name: 'State: Placeholder',
  args: {
    placeholder: 'Enter your email...',
  },
};

export const StateValue: Story = {
  name: 'State: Value',
  args: {
    value: 'user@example.com',
    readOnly: true,
  },
};

export const StateError: Story = {
  name: 'State: Error',
  args: {
    error: true,
    placeholder: 'Invalid input',
  },
};

export const StateErrorValue: Story = {
  name: 'State: Error with Value',
  args: {
    error: true,
    value: 'invalid@',
  },
};

export const StateDisabled: Story = {
  name: 'State: Disabled',
  args: {
    disabled: true,
    placeholder: 'Cannot edit',
  },
};

export const StateDisabledValue: Story = {
  name: 'State: Disabled with Value',
  args: {
    disabled: true,
    value: 'Read-only value',
  },
};

export const WithLeftDecoration: Story = {
  name: 'With Left Decoration',
  args: {
    leftDecoration: <Search className="h-4 w-4 text-muted-foreground" />,
    placeholder: 'Search...',
  },
};

export const WithRightDecoration: Story = {
  name: 'With Right Decoration',
  args: {
    rightDecoration: (
      <button type="button" className="text-muted-foreground hover:text-foreground">
        <X className="h-4 w-4" />
      </button>
    ),
    placeholder: 'Type to search...',
  },
};

export const WithBothDecorations: Story = {
  name: 'With Both Decorations',
  args: {
    leftDecoration: <Mail className="h-4 w-4 text-muted-foreground" />,
    rightDecoration: (
      <button type="button" className="text-muted-foreground hover:text-foreground">
        <X className="h-4 w-4" />
      </button>
    ),
    placeholder: 'Enter email...',
  },
};

export const SmallRoundWithIcon: Story = {
  name: 'Small + Round + Icon',
  args: {
    size: 'small',
    roundness: 'round',
    leftDecoration: <Search className="h-3 w-3 text-muted-foreground" />,
    placeholder: 'Search...',
  },
};

export const LargeRoundError: Story = {
  name: 'Large + Round + Error',
  args: {
    size: 'large',
    roundness: 'round',
    error: true,
    placeholder: 'Invalid input',
  },
};

export const MiniDefaultDisabled: Story = {
  name: 'Mini + Default + Disabled',
  args: {
    size: 'mini',
    roundness: 'default',
    disabled: true,
    value: 'Read-only',
  },
};

export const SearchInput: Story = {
  name: 'Example: Search Input',
  args: {
    size: 'regular',
    roundness: 'round',
    leftDecoration: <Search className="h-4 w-4 text-muted-foreground" />,
    placeholder: 'Search cases...',
  },
};

export const EmailInput: Story = {
  name: 'Example: Email Input',
  args: {
    type: 'email',
    leftDecoration: <Mail className="h-4 w-4 text-muted-foreground" />,
    placeholder: 'your.email@example.com',
  },
};



export const AllSizes: Story = {
  name: 'Comparison: All Sizes',
  render: () => (
    <div className="flex flex-col gap-4">
      <Input size="mini" placeholder="Mini" />
      <Input size="small" placeholder="Small" />
      <Input size="regular" placeholder="Regular" />
      <Input size="large" placeholder="Large" />
    </div>
  ),
};

export const AllSizesRound: Story = {
  name: 'Comparison: All Sizes Round',
  render: () => (
    <div className="flex flex-col gap-4">
      <Input size="mini" roundness="round" placeholder="Mini Round" />
      <Input size="small" roundness="round" placeholder="Small Round" />
      <Input size="regular" roundness="round" placeholder="Regular Round" />
      <Input size="large" roundness="round" placeholder="Large Round" />
    </div>
  ),
};

export const AllStates: Story = {
  name: 'Comparison: All States',
  render: () => (
    <div className="flex flex-col gap-4">
      <Input placeholder="Empty/Placeholder" />
      <Input value="With Value" readOnly />
      <Input placeholder="Error state" error />
      <Input value="Error with value" error readOnly />
      <Input placeholder="Disabled" disabled />
      <Input value="Disabled with value" disabled />
    </div>
  ),
};
