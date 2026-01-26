import type { Meta, StoryObj } from '@storybook/react';
import { Textarea } from './Textarea';

const meta: Meta<typeof Textarea> = {
  component: Textarea,
  title: 'Obra/Textarea',
  tags: ['autodocs'],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/MQUbIrlfuM8qnr9XZ7jc82/Obra-shadcn-ui--Carton-?node-id=16-1745&m=dev',
    },
  },
  decorators: [
    (Story) => (
      <div className="p-8">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Textarea>;

export const Default: Story = {
  args: {},
};

export const RoundnessDefault: Story = {
  args: {
    roundness: 'default',
  },
  name: 'Roundness: Default',
};

export const RoundnessRound: Story = {
  args: {
    roundness: 'round',
  },
  name: 'Roundness: Round',
};

export const WithPlaceholder: Story = {
  args: {
    placeholder: 'Type your message here.',
  },
  name: 'State: Placeholder',
};

export const WithPlaceholderRound: Story = {
  args: {
    placeholder: 'Type your message here.',
    roundness: 'round',
  },
  name: 'State: Placeholder (Round)',
};


export const WithValue: Story = {
  args: {
    defaultValue: 'Value',
  },
  name: 'State: Value',
};

export const WithValueRound: Story = {
  args: {
    defaultValue: 'Value',
    roundness: 'round',
  },
  name: 'State: Value (Round)',
};

export const Error: Story = {
  args: {
    defaultValue: 'Value',
    error: true,
  },
  name: 'State: Error',
};

export const ErrorRound: Story = {
  args: {
    defaultValue: 'Value',
    error: true,
    roundness: 'round',
  },
  name: 'State: Error (Round)',
};

export const Disabled: Story = {
  args: {
    defaultValue: 'Value',
    disabled: true,
  },
  name: 'State: Disabled',
};

export const DisabledRound: Story = {
  args: {
    defaultValue: 'Value',
    disabled: true,
    roundness: 'round',
  },
  name: 'State: Disabled (Round)',
};

export const Resizable: Story = {
  args: {
    placeholder: 'This textarea can be resized vertically',
    showResizable: true,
  },
  name: 'Resizable',
};

export const NonResizable: Story = {
  args: {
    placeholder: 'This textarea cannot be resized',
    showResizable: false,
  },
  name: 'Non-Resizable',
};

export const ErrorWithPlaceholder: Story = {
  args: {
    placeholder: 'Type your message here.',
    error: true,
  },
  name: 'Error with Placeholder',
};

export const RoundErrorNonResizable: Story = {
  args: {
    defaultValue: 'Value',
    error: true,
    roundness: 'round',
    showResizable: false,
  },
  name: 'Round + Error + Non-Resizable',
};

export const Interactive: Story = {
  args: {
    placeholder: 'Type your message here.',
    roundness: 'default',
  },
  name: 'Interactive Example',
};

export const AllStatesComparison: Story = {
  render: () => (
    <div className="space-y-8">
      <h2 className="text-lg font-semibold mb-4">All States Comparison</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm font-medium mb-2">State=Empty, Roundness=Default</p>
          <Textarea roundness="default" className="w-[320px]" />
        </div>
        <div>
          <p className="text-sm font-medium mb-2">State=Empty, Roundness=Round</p>
          <Textarea roundness="round" className="w-[320px]" />
        </div>

        <div>
          <p className="text-sm font-medium mb-2">State=Placeholder, Roundness=Default</p>
          <Textarea 
            roundness="default" 
            placeholder="Type your message here."
            className="w-[320px]"
          />
        </div>
        <div>
          <p className="text-sm font-medium mb-2">State=Placeholder, Roundness=Round</p>
          <Textarea 
            roundness="round" 
            placeholder="Type your message here."
            className="w-[320px]"
          />
        </div>

        <div>
          <p className="text-sm font-medium mb-2">State=Value, Roundness=Default</p>
          <Textarea 
            roundness="default" 
            defaultValue="Value"
            className="w-[320px]"
          />
        </div>
        <div>
          <p className="text-sm font-medium mb-2">State=Value, Roundness=Round</p>
          <Textarea 
            roundness="round" 
            defaultValue="Value"
            className="w-[320px]"
          />
        </div>

        <div>
          <p className="text-sm font-medium mb-2">State=Focus, Roundness=Default</p>
          <Textarea 
            roundness="default" 
            defaultValue="Value"
            className="w-[320px] !shadow-[0_0_0_3px_#cbd5e1]"
          />
        </div>
        <div>
          <p className="text-sm font-medium mb-2">State=Focus, Roundness=Round</p>
          <Textarea 
            roundness="round" 
            defaultValue="Value"
            className="w-[320px] !shadow-[0_0_0_3px_#cbd5e1]"
          />
        </div>

        <div>
          <p className="text-sm font-medium mb-2">State=Error, Roundness=Default</p>
          <Textarea 
            roundness="default" 
            defaultValue="Value"
            error
            className="w-[320px]"
          />
        </div>
        <div>
          <p className="text-sm font-medium mb-2">State=Error, Roundness=Round</p>
          <Textarea 
            roundness="round" 
            defaultValue="Value"
            error
            className="w-[320px]"
          />
        </div>

        <div>
          <p className="text-sm font-medium mb-2">State=Error Focus, Roundness=Default</p>
          <Textarea 
            roundness="default" 
            defaultValue="Value"
            error
            className="w-[320px] !shadow-[0_0_0_3px_#fca5a5]"
          />
        </div>
        <div>
          <p className="text-sm font-medium mb-2">State=Error Focus, Roundness=Round</p>
          <Textarea 
            roundness="round" 
            defaultValue="Value"
            error
            className="w-[320px] !shadow-[0_0_0_3px_#fca5a5]"
          />
        </div>

        <div>
          <p className="text-sm font-medium mb-2">State=Disabled, Roundness=Default</p>
          <Textarea 
            roundness="default" 
            defaultValue="Value"
            disabled
            className="w-[320px]"
          />
        </div>
        <div>
          <p className="text-sm font-medium mb-2">State=Disabled, Roundness=Round</p>
          <Textarea 
            roundness="round" 
            defaultValue="Value"
            disabled
            className="w-[320px]"
          />
        </div>
      </div>
      
      <div className="mt-4 p-4 bg-blue-50 rounded">
        <p className="text-sm">
          <strong>Note:</strong> The Focus and Error Focus states show the visual appearance. 
          Click on Empty/Placeholder/Value textareas to see the actual focus behavior.
        </p>
      </div>
    </div>
  ),
  name: '🎨 All States Grid (Figma Layout)',
  parameters: {
    layout: 'padded',
  },
};

